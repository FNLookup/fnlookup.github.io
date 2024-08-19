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

                const jamTrackElement = document.createElement('jam-track');

                const jamShit = document.createElement('a');

                jamShit.classList.add("jam-track-item-card", "fortnite-button-border");
                jamShit.href = 'view/?' + id;

                jamTrackElement.append(jamShit)
              
                // Add image element
                const image = document.createElement("img");
                image.src = album;
                image.alt = songName;
                image.loading = 'lazy';
                jamShit.appendChild(image);
              
                // Add description container
                const description = document.createElement("div");
                description.classList.add("jam-track-description");
              
                // Add song name heading
                const songNameHeading = document.createElement("h2");
                songNameHeading.classList.add("header-text-bold");
                songNameHeading.textContent = songName;
                description.appendChild(songNameHeading);
              
                // Add artist heading
                const artistHeading = document.createElement("h3");
                artistHeading.classList.add("header-text-bold");
                artistHeading.textContent = artist; // Assuming you have the artist variable defined
                description.appendChild(artistHeading);
              
                // Add description container to link
                jamShit.appendChild(description);          

                if (listFeatured.includes(id)) {
                    document.getElementById('featured-entries').append(jamTrackElement)
                }

                document.getElementById('all-entries').innerHTML += `
                    <jam-track>
                        <a class="jam-track-item-card fortnite-button-border" href="view/?${id}">
                            <img src="${album}" alt="Give Me Everything" loading="lazy">
            
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