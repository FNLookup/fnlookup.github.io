function loadSong() {
    let params = new URLSearchParams(window.location.search);
    let firstKey = params.keys().next().value;

    async function extractFilesFromZip(data) {
        let zipUrl = data.zip;
        let response = await fetch('https://raw.githubusercontent.com/FNLookup/encore/main/' + zipUrl);
        let size = response.headers.get('Content-Length');
        let zipData = await response.arrayBuffer();

        let jszip = new JSZip();
        let zip = await jszip.loadAsync(zipData);
        let root = data.isRootFirstDir ? '' : data.root + '/'

        console.log(zip)

        let infoFile = zip.file(root + 'info.json');
        let infoContent = await infoFile.async('text');
        let info = JSON.parse(infoContent)
        console.log(info)

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

        let songArtist = document.createElement('h2')
        songArtist.innerText = info.artist

        let songDiffs = document.createElement('song-diffs')
        for (let diff of Object.keys(info.diff)) {
            icon = ''

            if (diff == 'ds') icon = 'drums.webp'
            if (diff == 'ba') icon = 'bass.webp'
            if (diff == 'vl') icon = 'voices.webp'
            if (diff == 'gr') icon = 'guitar.webp'

            let imageIcon = document.createElement('img')
            imageIcon.classList.add('instrument-icon-encore')

            imageIcon.src = '/assets/icons/' + icon

            let diffQtt = document.createElement('a')
            diffQtt.innerText = `${info.diff[diff] + 1}/7`

            songDiffs.append(imageIcon, diffQtt)
        }

        trackDetails.append(songTitle, songArtist, songDiffs)
        encoreTrack.append(trackDetails)

        document.getElementById('song').appendChild(encoreTrack);

        let midiFileData = await zip.file(root + info.midi).async('uint8array');
        let midi = new Midi(midiFileData);

        function trackAnalysis(trackName, minPitch, maxPitch) {
            let trackIndex = midi.tracks.indexOf(midi.tracks.find(track => {
                return track.name == trackName
            }))
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
            'Vocals': 'PART VOCALS',
            'Guitar': 'PART GUITAR'
        }

        let difficulties = {
            'E': [60, 64],
            'N': [72, 75],
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

            for (let diff of Object.keys(difficulties)) {
                let trackNotesTotal = trackAnalysis(tracks[track], difficulties[diff][0], difficulties[diff][1])
                if (trackNotesTotal == 0)
                    continue
                let item = Object.keys(difficulties).indexOf(diff)

                let shouldAddDash = item < 3

                diffAnalysis.innerText += `${diff}: ${trackNotesTotal} ${shouldAddDash ? '- ' : ''}` 
            }

            trackAnalysisTable.append(trackAnalysisName)
        }

        let downloadButton = document.createElement('a')
        downloadButton.classList.add('fortnite-button', 'fortnite-button-border', 'no-link', 'encore-download')
        downloadButton.innerText = 'Download'

        let mbsize = size / 1024 / 1024
        let mbs = mbsize.toFixed(2)

        downloadButton.title = 'Size: ' + mbs + ' MB'

        downloadButton.href = 'https://raw.githubusercontent.com/FNLookup/encore/main/' + zipUrl

        trackDetails.append(trackAnalysisTable)

        trackDetails.append(downloadButton)
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