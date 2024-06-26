function loadSong() {
    let params = new URLSearchParams(window.location.search);
    let firstKey = params.keys().next().value;

    function toTimeStr(secs) {
        return `${Math.floor(secs / 60)}:${(secs % 60) > 9 ? '' : '0'}${secs % 60}`
    }

    async function extractFilesFromZip(data) {
        let loading = document.createElement('p')
        loading.innerText = 'Downloading ' + data.zip + ', please wait...'
        document.getElementById('song').append(loading)

        let zipUrl = data.zip;
        let response = await fetch('https://raw.githubusercontent.com/Encore-Developers/songs/main/' + zipUrl);
        let size = response.headers.get('Content-Length');
        let zipData = await response.arrayBuffer();

        let jszip = new JSZip();
        let zip = await jszip.loadAsync(zipData);
        let root = data.isRootFirstDir ? '' : data.root + '/'

        //console.log(zip)

        let infoFile = zip.file(root + 'info.json');
        let infoContent = await infoFile.async('text');
        let info = JSON.parse(infoContent)
        //console.log(info)

        // Extract the .ogg file
        //let audioFile = zip.file('my-audio.ogg');

        let imageFile = zip.file(root + info.art);
        //console.log(imageFile)

        let imageBlob = await imageFile.async('blob');
        let imageUrl = URL.createObjectURL(imageBlob);

        let encoreTrack = document.createElement('a')
        encoreTrack.classList.add('encore-track-view', 'flex-media')

        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('art', 'd-50-media')

        encoreTrack.append(imgElement)

        let trackDetails = document.createElement('track-details')
        let songTitle = document.createElement('h1')
        songTitle.innerText = info.title
        document.title = info.title + ' (Encore) - FNLookup'

        let songArtist = document.createElement('h2')
        let piss = ` - ${info.album != undefined ? info.album + ' - ': ''}${toTimeStr(data['secs'])}`
        songArtist.innerText = info.artist + piss

        let songCharter = document.createElement('h3')
        let charterstr = 'Charters: Unknown'
        if (info.charters != undefined) {
            charterstr = 'Charters: ' + info.charters.join(', ')
        }
        songCharter.innerText = charterstr

        let songGenre = document.createElement('h3')
        let genrestr = 'Genres: Unknown'
        if (info.genres != undefined) {
            genrestr = 'Genres: ' + info.genres.join(', ') + ' - ' + info.release_year
        }

        songGenre.innerText = genrestr

        let songDiffs = document.createElement('song-diffs')
        for (let diff of Object.keys(info.diff)) {
            icon = ''

            if (diff == 'ds' || diff == 'drums' || diff == 'plastic_drums') icon = 'drums.webp'
            if (diff == 'ba' || diff == 'bass' || diff == 'plastic_bass') icon = 'bass.webp'
            if (diff == 'vl' || diff == 'vocals' || diff == 'plastic_vocals') icon = 'voices.webp'
            if (diff == 'gr' || diff == 'guitar' || diff == 'plastic_guitar') icon = 'guitar.webp'

            let imageIcon = document.createElement('img')
            imageIcon.classList.add('instrument-icon-encore')

            imageIcon.src = '/assets/icons/' + icon

            let diffQtt = document.createElement('a')
            diffQtt.innerText = `${info.diff[diff] + 1}/7`

            songDiffs.append(imageIcon, diffQtt)
        }

        trackDetails.append(songTitle, songArtist, songCharter, songGenre, songDiffs)
        encoreTrack.append(trackDetails)

        document.getElementById('song').appendChild(encoreTrack);

        let midiFileData = await zip.file(root + info.midi).async('uint8array');
        let midi = new Midi(midiFileData);

        function trackAnalysis(trackName, minPitch, maxPitch) {
            let trackIndex = midi.tracks.indexOf(midi.tracks.find(track => {
                return track.name == trackName
            }))
            if (trackIndex < 0) return 0
            let track = midi.tracks[trackIndex];
            let noteCount = 0;
            for (let note of track.notes) {
                if (note.midi >= minPitch && note.midi <= maxPitch) {
                    noteCount++;
                }
            }

            return noteCount
        }

        let tracks = {
            'Drums': 'PART DRUMS',
            'Bass': 'PART BASS',
            'Guitar': 'PART GUITAR',
            'Vocals': 'PART VOCALS',
            'Pro Drums': 'PLASTIC DRUMS',
            'Pro Bass': 'PLASTIC BASS',
            'Pro Guitar': 'PLASTIC GUITAR'
        }

        let difficulties = {
            'E': [60, 64],
            'M': [72, 75],
            'H': [84, 87],
            'X': [96, 100]
        }

        let trackAnalysisTable = document.createElement('track-midi-notes')

        for (let track of Object.keys(tracks)) {
            let trackAnalysisName = document.createElement('track-name')
            trackAnalysisName.innerText = track

            let trackNotes = document.createElement('div')
            let diffAnalysis = document.createElement('a')
            trackNotes.append(diffAnalysis)

            trackAnalysisName.append(trackNotes)

            totalNotesForTrack = 0

            for (let diff of Object.keys(difficulties)) {
                let trackNotesTotal = trackAnalysis(tracks[track], difficulties[diff][0], difficulties[diff][1])
                totalNotesForTrack += trackNotesTotal
                if (trackNotesTotal < 1) continue
                let item = Object.keys(difficulties).indexOf(diff)

                let shouldAddDash = item < 3

                diffAnalysis.innerText += `${diff}: ${trackNotesTotal} ${shouldAddDash ? '- ' : ''}` 
            }

            if (totalNotesForTrack > 0) trackAnalysisTable.append(trackAnalysisName)
        }

        let downloadButton = document.createElement('a')
        downloadButton.classList.add('fortnite-button', 'fortnite-button-border', 'no-link', 'encore-download')
        downloadButton.innerText = 'Download'

        let mbsize = size / 1024 / 1024
        let mbs = mbsize.toFixed(2)

        downloadButton.title = 'Size: ' + mbs + ' MB'

        downloadButton.href = 'https://raw.githubusercontent.com/Encore-Developers/songs/main/' + zipUrl

        trackDetails.append(trackAnalysisTable)

        trackDetails.append(downloadButton)

        loading.remove()
    }

    fetch('https://raw.githubusercontent.com/FNLookup/encore/main/encore.json').then(r => r.json()).then(r => {
        for (let song of r.songs) {
            //console.log(song)

            if (firstKey == song.id) {
                //console.log('found song')
                extractFilesFromZip(song)
            }
        }
    }).catch(err => {
        console.error(err)
    })
}