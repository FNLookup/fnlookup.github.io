function toTimeStr(secs) {
    return `${Math.floor(secs / 60)}:${(secs % 60) > 9 ? '' : '0'}${secs % 60}`
}

async function extractFilesFromZip(data) {
    let loading = document.createElement('p')
    loading.innerText = 'Downloading ' + data.id + ', please wait...'
    document.getElementById('songs').append(loading)

    let imageUrl = 'https://raw.githubusercontent.com/FNLookup/encore/main/covers/'+data.id +'/'+data.art;

    let encoreTrack = document.createElement('a')
    encoreTrack.classList.add('encore-track', 'flex-media', 'fortnite-button-border')
    encoreTrack.href = '/encore/view/?' + data.id

    let imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.classList.add('art')

    let imgElement2 = document.createElement('img');
    imgElement2.src = imageUrl;
    imgElement2.classList.add('art-ghost')

    encoreTrack.append(imgElement, imgElement2)

    let trackDetails = document.createElement('track-details')
    let songTitle = document.createElement('h1')
    songTitle.innerText = data.title

    let songArtist = document.createElement('h3')
    let piss = ` - ${data.album != undefined ? data.album + ' - ': ''}${toTimeStr(data['secs'])}`
    songArtist.innerText = data.artist + piss

    //console.log(piss)

    let songDiffs = document.createElement('song-diffs')
    for (let diff of Object.keys(data.diffs)) {
        icon = ''

        if (diff == 'ds' || diff == 'drums' || diff == 'plastic_drums') icon = 'drums.webp'
        if (diff == 'ba' || diff == 'bass' || diff == 'plastic_bass') icon = 'bass.webp'
        if (diff == 'vl' || diff == 'vocals' || diff == 'plastic_vocals' || diff == 'pitched_vocals') icon = 'voices.webp'
        if (diff == 'gr' || diff == 'guitar' || diff == 'plastic_guitar') icon = 'guitar.webp'

        let imageIcon = document.createElement('img')
        imageIcon.classList.add('instrument-icon-encore')

        imageIcon.src = '/assets/icons/' + icon

        let diffQtt = document.createElement('a')
        diffQtt.innerText = `${data.diffs[diff] + 1}/7`

        songDiffs.append(imageIcon, diffQtt)
    }

    trackDetails.append(songTitle, songArtist, songDiffs)
    encoreTrack.append(trackDetails)

    document.getElementById('songs').appendChild(encoreTrack);

    loading.remove()
}

function loadSongs() {
    let keyword = new URLSearchParams(window.location.search).get('keyword')
    document.getElementById('resultsfor').innerText = 'Results for ' + keyword

    songs = fetch('https://raw.githubusercontent.com/FNLookup/encore/main/encore.json').then(r => r.json()).then(r => {
        let totalresults = 0
        for (let song of r.songs) {
            //console.log(song)
    
            if (song.title.toLowerCase().includes(keyword)) {
                totalresults++
                extractFilesFromZip(song)
            }
        }

        if (totalresults < 1) document.getElementById('resultsfor').innerText = 'Your search did not have any results.'
    }).catch(err => {
        console.error(err)
    })
}