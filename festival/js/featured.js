function getFeaturedJamTracks() {
    let listFeatured = []

    fetch('https://raw.githubusercontent.com/FNLookup/data/main/nitestats/event_flags.json').then(r=>r.json())
    .then(r => {
        console.log(r)

        let clientEvents = r.channels['client-events'].states[0].activeEvents

        //console.log(clientEvents)

        for (let event of clientEvents) {
            if (event.eventType.startsWith('PilgrimSong.')) {
                listFeatured.push(event.eventType.replace('PilgrimSong.', ''))
            }
        }

        console.log(listFeatured)

        fetch('https://raw.githubusercontent.com/FNLookup/data/main/festival/jam_tracks.json').then(r=>r.json())
        .then(r => {
            for (let jamTrack of r.tracks) {
                let songName = jamTrack.title
                let artist = jamTrack.artist
                let id = jamTrack.id
                let album = jamTrack.album_image

                //console.log(jamTrack)

                if (listFeatured.includes(id)) {
                    document.getElementById('featured-entries').innerHTML += `
                    <jam-track>
                        <a class="jam-track-item-card fortnite-button-border" href="view/?${id}">
                            <img src="${album}" alt="Give Me Everything">
            
                            <div class="jam-track-description">
                                <h2 class="header-text-bold">${songName}</h2>
                                <h3 class="header-text-bold">${artist}</h3>
                            </div>
                        </a>
                    </jam-track>`
                }

                document.getElementById('all-entries').innerHTML += `
                    <jam-track>
                        <a class="jam-track-item-card fortnite-button-border" href="view/?${id}">
                            <img src="${album}" alt="Give Me Everything">
            
                            <div class="jam-track-description">
                                <h2 class="header-text-bold">${songName}</h2>
                                <h3 class="header-text-bold">${artist}</h3>
                            </div>
                        </a>
                    </jam-track>`
            }

        }).catch(error => {
            let eText = document.createElement('h1');
            console.error(error);
            eText.innerHTML = error;
            document.getElementById('content').append(eText);
        });

    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        document.getElementById('content').append(eText);
    });
}