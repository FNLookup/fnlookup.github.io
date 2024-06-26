function toTimeStr(secs) {
    return `${Math.floor(secs / 60)}:${(secs % 60) > 9 ? '' : '0'}${secs % 60}`
}

async function extractFilesFromZip(data, rurl) {
    //let zipUrl = data.zip;

    let loading = document.createElement('p')
    loading.innerText = 'Downloading ' + data.id + ', please wait...'
    document.getElementById('songs').append(loading)

    let imageUrl = 'https://raw.githubusercontent.com/FNLookup/encore/main/covers/'+data.id +'/'+data.art;
    let encoreTrack = document.createElement('a')
    encoreTrack.classList.add('encore-track', 'flex-media')
    let leftSection = document.createElement('div')
    leftSection.classList.add('left-section');

    let trackDetails = document.createElement('div')
    trackDetails.classList.add('track-details')
    let songTitle = document.createElement('h1')
    songTitle.innerText = data.title

    let songArtist = document.createElement('h2')
    songArtist.innerText = data.artist

    let songAlbum = document.createElement('h3')
    songAlbum.innerText = `${data.album != undefined ? data.album + ' - ' : ''}${toTimeStr(data.secs)}`

    let songCharters = document.createElement('h3')
    songCharters.innerText = `Charters: ${data.charters.length > 0 ? data.charters.join(', ') : 'Unknown'}`

    //console.log(piss)

    let songDiffs = document.createElement('a')
    songDiffs.classList.add('song-diffs');
    for (let diff of Object.keys(data.diffs)) 
    {
        let diffContainer = document.createElement('div')
        diffContainer.classList.add('diff')
        
        icon = ''

        if (diff == 'ds' || diff == 'drums') icon = 'drums.webp'
        if (diff == 'ba' || diff == 'bass') icon = 'bass.webp'
        if (diff == 'vl' || diff == 'vocals') icon = 'voices.webp'
        if (diff == 'gr' || diff == 'guitar') icon = 'guitar.webp'
        if (diff == 'plastic_drums') icon = 'pro-drums.png'
        if (diff == 'plastic_bass') icon = 'pro-bass.png'
        if (diff == 'plastic_guitar') icon = 'pro-guitar.png'
        if (diff == 'plastic_vocals' || diff=='pitched_vocals') icon = 'THEvoicesARELOUDER.png'

        let imageIcon = document.createElement('img')
        imageIcon.classList.add('instrument-icon-encore')
        imageIcon.src = '/assets/icons/' + icon

        diffContainer.append(imageIcon)

        let diffBarsContainer = document.createElement('div')
        diffBarsContainer.classList.add('diffbars')

        let difficultyOfChart = data.diffs[diff] +1;

        for (let i = 0; i<difficultyOfChart; i++) {
            let diffThing = document.createElement('div')
            diffThing.classList.add('diffbar')
            diffBarsContainer.append(diffThing);
        }

        for (let i = 0; i<7-difficultyOfChart; i++) {
            let diffThing = document.createElement('div')
            diffThing.classList.add('diffbar', 'empty')
            diffBarsContainer.append(diffThing);
        }

        diffContainer.append(diffBarsContainer)

        songDiffs.append(diffContainer)
    }

    trackDetails.append(songTitle, songArtist, songAlbum, songCharters)
    leftSection.append(trackDetails)
    encoreTrack.append(leftSection)

    let rightSection = document.createElement('div')
    rightSection.classList.add('right-section');

    let imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.classList.add('art')

    let imgElement2 = document.createElement('img');
    imgElement2.src = imageUrl;
    imgElement2.classList.add('art-ghost')

    let songDiffsView = document.createElement('a');
    songDiffsView.classList.add('fortnite-button', 'fortnite-button-border', 'no-link', 'encore-override-fortnite-button', 'diffs-view', 'track-btn')
    songDiffsView.innerText = 'View more'
    songDiffsView.href = 'view/?' + data.id

    let songDiffsPopup = document.createElement('div')
    songDiffsPopup.classList.add('song-diffs-popup')
    songDiffsView.append(songDiffsPopup);

    let downloadSong = document.createElement('a');
    downloadSong.classList.add('fortnite-button', 'fortnite-button-border', 'no-link', 'encore-override-fortnite-button', 'track-btn')
    downloadSong.innerText = 'Download'
    downloadSong.href = rurl + data.zip

    songDiffsPopup.append(songDiffs);

    rightSection.append(imgElement, songDiffsView, downloadSong)

    encoreTrack.append(rightSection, imgElement2);

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
                extractFilesFromZip(song, r.RAW_path)
            }
        }

        if (totalresults < 1) document.getElementById('resultsfor').innerText = 'Your search did not have any results.'
    }).catch(err => {
        console.error(err)
    })
}