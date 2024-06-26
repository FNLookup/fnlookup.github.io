function toTimeStr(secs) {
    return `${Math.floor(secs / 60)}:${(secs % 60) > 9 ? '' : '0'}${secs % 60}`
}

async function extractFilesFromZip(data) {
    let zipUrl = data.zip;

    let loading = document.createElement('p')
    loading.innerText = 'Downloading ' + data.id + ', please wait...'
    document.getElementById('songs').append(loading)

    let response = await fetch('https://raw.githubusercontent.com/Encore-Developers/songs/main/' + zipUrl);
    let zipData = await response.arrayBuffer();

    let jszip = new JSZip();
    let zip = await jszip.loadAsync(zipData);
    //console.log(zip)
    let root = data.isRootFirstDir ? '' : data.root + '/'
    //console.log(root)

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
    encoreTrack.classList.add('encore-track', 'flex-media')
    encoreTrack.href = 'view/?' + data.id

    let imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.classList.add('art')

    encoreTrack.append(imgElement)

    let trackDetails = document.createElement('track-details')
    let songTitle = document.createElement('h1')
    songTitle.innerText = info.title

    let songArtist = document.createElement('h3')
    let piss = ` - ${info.album != undefined ? info.album + ' - ': ''}${toTimeStr(data['secs'])}`
    songArtist.innerText = info.artist + piss

    //console.log(piss)

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

    trackDetails.append(songTitle, songArtist, songDiffs)
    encoreTrack.append(trackDetails)

    document.getElementById('songs').appendChild(encoreTrack);

    loading.remove()
}

function loadSongs() {
    songs = fetch('https://raw.githubusercontent.com/FNLookup/encore/main/encore.json').then(r => r.json()).then(r => {
        for (let song of r.songs) {
            //console.log(song)
    
            extractFilesFromZip(song)
        }
    }).catch(err => {
        console.error(err)
    })
}

function searchForSong() {
    let searchKeyword = document.getElementById('iname').value
    document.location.href = '/encore/search/?keyword=' + searchKeyword
}