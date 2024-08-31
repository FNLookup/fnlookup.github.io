let _jam_tracks_URL = 'https://raw.githubusercontent.com/FNLookup/data/main/festival/jam_tracks.json'
canFetch = true
allEntries = []
entryOffset = 0;
perPage = 25;

function loadViewer() {
    let params = new URLSearchParams(window.location.search);
    let firstKey = params.keys().next().value;
    //console.log(firstKey);
    let _placeholder_songID = firstKey

    // check params

    fetch(_jam_tracks_URL).then(r=>r.json()).then(r=> {
        viewTrack = r.tracks.find(track => track.id == _placeholder_songID)
        if (viewTrack == undefined)
            viewTrack = r.tracks.find(track => track.item_id.toLowerCase().split(":")[1] == _placeholder_songID.toLowerCase())

        let songInfoSection = document.getElementById('section-song-info')

        let albumImage = gne('a')
        //albumImage.src = viewTrack.album_image
        albumImage.classList.add('festival-album-art')
        albumImage.style = 'overflow: hidden;'
        albumImage.innerHTML = '<img style="width: 100%; display:block;" src="' + viewTrack.album_image + '">';

        if (viewTrack.isrc.length > 0) {
            fetch('https://fnlookup-apiv2.vercel.app/api?isrc=' + viewTrack.isrc).then(L=>L.json()).then(L=> {
                //console.log('SPOTIFY: ' + L.link);
                albumImage.href = L.link;
                albumImage.classList.add('fortnite-button-border');
            }).catch(err => {
                console.error(err)
            })
        }

        let songInfo = gne('div')
        songInfo.classList.add('festival-song-data')

        let songTop = gne('p')
        let secsWith0 = (viewTrack.duration % 60);
        if (secsWith0 < 10) secsWith0 = '0' + secsWith0
        songTop.textContent = viewTrack.year + ' • ' + Math.floor(viewTrack.duration / 60) + ':' + secsWith0

        let songName = gne('h2')
        songName.textContent = viewTrack.title

        let songBottom = gne('p')
        songBottom.textContent = viewTrack.artist + (viewTrack.album.length > 0 ? ' • ' + viewTrack.album : "")

        let songKey = gne('p')
        songKey.textContent = viewTrack.key + ' ' + viewTrack.scale

        let songBpm = gne('p')
        songBpm.textContent = viewTrack.bpm + ' BPM'

        let songESRB = gne('img')
        songESRB.src = 'https://www.globalratings.com/images/ESRB_' + viewTrack.rating + '_68.png'
        //songESRB.title = 'ISRC: ' + (viewTrack.isrc.length > 0 ? viewTrack.isrc : "None")

        let genres = gne('p')
        if (viewTrack.genres.length > 0) {
            genres.innerText = 'Genres: ' + viewTrack.genres.join(', ')
        }

        songInfo.append(songTop, songName, songBottom, songKey, songBpm, songESRB, genres)
        songInfoSection.append(albumImage, songInfo)

        let songDifficulties = document.getElementById('section-song-diffs')
        
        for (let diff of [
            {asset: 'voices', bname: 'vocals'},
            {asset: 'guitar', bname: 'guitar'},
            {asset: 'drums', bname: 'drums'},
            {asset: 'bass', bname: 'bass'},
            {asset: 'bass', bname: 'plastic_bass'},
            {asset: 'drums', bname: 'plastic_drums'},
            {asset: 'guitar', bname: 'plastic_guitar'},
        ]) {
            let ho = gne('div')
            ho.classList.add('festival-difficulty-item')

            let altho = gne('div')
            altho.classList.add('flex')

            let diffIcon = gne('img')
            diffIcon.src = '/assets/icons/' + diff.asset + '.webp'

            diffIcon.classList.add('festival-diff-icon')

            let diffNum = gne('a')

            let diffInt = viewTrack.difficulties[diff.bname]

            let _sqNoFill = '▱'.repeat(6 - diffInt);
            let _sqFill = '▰'.repeat(diffInt + 1)
            let _finalBar = _sqFill + _sqNoFill

            diffNum.textContent += _finalBar

            let bname = diff.bname.replace('plastic_', 'pro ');
            let strings = bname.split(' ');

            for (let string of strings) {
                strings[strings.indexOf(string)] = string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
            }

            let engName = strings.join(' ')

            let trackLabel = gne('a')
            trackLabel.classList.add('festival-difficulty-level')
            trackLabel.innerText = engName

            altho.append(diffIcon, diffNum)
            ho.append(altho, trackLabel)

            songDifficulties.append(ho)

            ///////////////////
        }

        let leaderBoardEntries = document.getElementById('leaderboard-entries')

        _pages = [0, 1, 2, 3, 4]

        _instruments = [
            'Solo_Guitar', // 0
            'Solo_Bass', // 1
            'Solo_Vocals', // 2
            'Solo_Drums', // 3
            'Solo_PeripheralGuitar', // 4
            'Solo_PeripheralBass' // 5
        ]

        async function fetchLeaderboardData(instrumentStr) {
            allEntries = [];
            entryOffset = 0;
            leaderBoardEntries.innerHTML = '<h2 id="loading">Loading...</h2>'
            for (let page of _pages) {
                let _users = {}
                try {
                    response = await fetch('https://raw.githubusercontent.com/FNLookup/festival-leaderboards/main/leaderboards/season5/' + viewTrack.id + '/' + instrumentStr + '_' + page + '.json')
                    let data = await response.json()

                    for (let entry of data.entries) {
                        //console.log(entry)
        
                        let entryContainer = gne('div')
                        entryContainer.classList.add('festival-leaderboard-entry-parent', 'fortnite-button-border')
                        
                        let entryFirstInfo = gne('div')
                        entryFirstInfo.classList.add('flex', 'festival-leaderboard-entry')
        
                        let position = gne('a')
                        position.classList.add('festival-entry-position')
                        position.innerText = '#'+entry.rank
        
                        let name = gne('a')
                        name.classList.add('festival-entry-name')
                        name.innerText = entry.userName
    
                        let score = gne('a')
                        score.classList.add('festival-entry-score')
                        score.innerText = entry.best_run.score
    
                        let acc = gne('a')
                        acc.classList.add('festival-entry-accuracy')

                        let _acc = gne('a')
                        acc.append(_acc)
                        _acc.innerText = entry.best_run.accuracy + '%'
    
                        if (entry.best_run.accuracy == 100) {
                            _acc.classList.add('festival-entry-flawless')
                        }
    
                        let totalstars = entry.best_run.stars
                        if (totalstars >= 6) totalstars = 5
    
                        let stars = gne('a')
                        stars.classList.add('festival-entry-stars')

                        for (let i = 0; i<totalstars; i++) {
                            let icon = gne('img')
                            icon.src = '/assets/icons/star_' + (entry.best_run.stars >= 6 ? 'gold' : 'normal') + '.png'
                            stars.append(icon)
                        }

                        //stars.innerText = totalstars
        
                        entryFirstInfo.append(position, name, score, acc, stars)

                        let entryRemainingInfo = gne('div')
                        entryRemainingInfo.classList.add('hidden', 'festival-entry-sessions-data')

                        for (let session of entry.sessions.reverse()) {
                            let sessionStuff = gne('div')

                            entryRemainingInfo.append(sessionStuff)
                            
                            let sessionInfo = gne('h3')
                            sessionInfo.classList.add('header-text-bold')

                            sessionInfo.innerText = '#' + (entry.sessions.indexOf(session) + 1) + ' - ' + getFormatDate(new Date(session.time * 1000), true) + ' - ' + session.stats.players.length + ' player(s)'

                            let sessionPlayers = gne('div')
                            sessionPlayers.classList.add('flex')

                            for (let player of session.stats.players) {
                                let instrumentInfo = gne('p')
                                instrumentInfo.classList.add('festival-player-instrument-info')
                                instrumentInfo.innerHTML = '<img src="/assets/icons/' + ['guitar', 'bass', 'voices', 'drums', 'guitar', 'bass'][player.instrument] + '.webp">'
                                instrumentInfo.innerHTML += ['Guitar', 'Bass', 'Vocals', 'Drums', 'Pro Guitar', 'Pro Bass'][player.instrument] + ' - ' +
                                    ['Easy', 'Medium', 'Hard', 'Expert'][player.difficulty]

                                let playerInfo = gne('div')
                                playerInfo.classList.add('festival-session-player')

                                if (player.is_valid_entry) {
                                    playerInfo.classList.add('is-player')
                                }

                                let __score = gne('p')
                                __score.innerText = 'Score: ' + player.score + ' - '
            
                                let __acc = gne('p')
                                let ___acc = gne('a')
                                ___acc.innerText = player.accuracy + '%'
                                __acc.append(___acc)
                                if (player.accuracy == 100) {
                                    ___acc.innerText += ' FLAWLESS'
                                    ___acc.classList.add('festival-entry-flawless')
                                }

                                __score.append(___acc)
            
                                let totalstars = player.stars
                                if (totalstars >= 6) totalstars = 5
            
                                let __stars = gne('a')
                                //__stars.innerText = totalstars

                                for (let i = 0; i<totalstars; i++) {
                                    let icon = gne('img')
                                    icon.src = '/assets/icons/star_' + (player.stars >= 6 ? 'gold' : 'normal') + '.png'
                                    __stars.append(icon)
                                }

                                playerInfo.append(instrumentInfo, __score, __acc, __stars)

                                sessionPlayers.append(playerInfo)
                            }

                            sessionInfo.append(sessionPlayers)

                            let sessionBandScore = session.stats.band
                            sessionStuff.append(sessionInfo)
                        }

                        entryFirstInfo.onclick = function() {
                            entryRemainingInfo.classList.toggle('hidden')
                        }

                        entryContainer.append(entryFirstInfo, entryRemainingInfo)
        
                        allEntries.push(entryContainer)
                    }
                } catch(e) {
                    console.error(e)
                }
            }

            if (document.getElementById("loading") != undefined) document.getElementById("loading").remove();

            generateItems(allEntries.slice(0, perPage))
        }
        
        fetch('https://api.github.com/repos/FNLookup/festival-leaderboards/commits?path=leaderboards/season5/' + viewTrack.id + '/').then(r=>r.json()).then(r=> {
            if (r.length > 0) fetchLeaderboardData(_instruments[0])
            else {
                leaderBoardEntries.innerHTML = '<h2>Leaderboard not available</h2>'
                canFetch=false
            } 
        })

        for (let instrument of _instruments) {
            let buttons = document.getElementById('instrument-buttons')

            let newbutton = gne('div')
            newbutton.classList.add('festival-leaderboard-instrument-button', 'fortnite-button-border')
            newbutton.innerHTML += '<img src="/assets/icons/' + ['guitar', 'bass', 'voices', 'drums', 'guitar', 'bass'][_instruments.indexOf(instrument)] + '.webp">'
            newbutton.innerHTML += ['Guitar', 'Bass', 'Vocals', 'Drums', 'Pro Guitar', 'Pro Bass'][_instruments.indexOf(instrument)]

            newbutton.onclick = function () {
                if (!canFetch) return;
                clearChildren(leaderBoardEntries)

                fetchLeaderboardData(instrument)
            }

            buttons.append(newbutton)
        }

        //console.log(viewTrack)
    })

    window.onscroll = handleScroll
}

function getScrollPercent() {
    const winHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    const scrollTop = window.scrollY;
    const trackLength = docHeight - winHeight;
    const percentScrolled = Math.floor((scrollTop / trackLength) * 100);
    return percentScrolled;
}

function generateItems(itemsarg) {
    for (let item of itemsarg)
        document.getElementById('leaderboard-entries').append(item)
    entryOffset += perPage
}

function handleScroll() {
    console.log('scroll')
    const currentScrollPercent = getScrollPercent();
    // console.log(currentScrollPercent)
    if (currentScrollPercent > 90) {
        //console.log('im going crazh', offset)
        const nextItems = allEntries.slice(entryOffset, entryOffset + perPage); // Extract the next 50 items
        generateItems(nextItems);
    }
}