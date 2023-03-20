function searchPlayer() {
    let content = document.getElementById('content');
    var uID = document.getElementById('player-id');

    clearChildren(content);

    let reqUrl = 'https://fortniteapi.io/v1/stats?account=' + uID.value

    fetch(reqUrl, {
        headers: 'string' === typeof keyFNAPIIo ? {
            "Authorization": keyFNAPIIo
        } : {}
    }).then(res => res.json()).then(res => {
        content.innerHTML += '<h1 id="user-name">' + res.name + '</h1><h1 class="shop-section-title">Level History</h1><hr>'
        let cardContainerHTML = ''
        for (let levelHistory of res.accountLevelHistory) {
            cardContainerHTML += '<div class="account-season-level-card"><img src="https://fortnite.gg/img/seasons/' + levelHistory.season + '.jpg" alt="Season ' + levelHistory.season + '"><div class="account-level-card-details"><h3>Season ' + levelHistory.season + '</h3><div class="progress-bar-bg"><div class="progress-bar" style="width: ' + levelHistory.process_pct + '%;"><a class="percentage">Level ' + levelHistory.level + '</a></div></div></div></div>'
        }

        content.innerHTML += '<div id="level-history" class="account-level-history">' + cardContainerHTML + '</div>'
        
        content.innerHTML += '<h1 class="shop-section-title">Battle Pass</h1><hr> <div class="progress-bar-bg"><div class="progress-bar" style="width: ' + res.account.process_pct + '%;"><a class="percentage">Level ' + res.account.level + '</a></div></div>';

        content.innerHTML += '<h1 class="shop-section-title">Account Stats</h1><hr>'

        let statCategories = [
            {name: 'Global Stats', stats: res.global_stats},
            (res.per_input.keyboardmouse ? {name: 'Keyboard & Mouse Stats', stats: res.per_input.keyboardmouse} : undefined),
            (res.per_input.gamepad ? {name: 'Gamepad', stats: res.per_input.gamepad} : undefined),
            (res.per_input.touch ? {name: 'Touch', stats: res.per_input.touch} : undefined)
        ]

        for (let category of statCategories) {
            if (!category) return;

            let globalStats = category.stats
            let things = Object.getOwnPropertyNames(globalStats)

            let globalBox = gne('div');
            globalBox.classList.add('stats-content', 'stats-box');
            let globalTitle = gne('h2');
            globalTitle.innerHTML = category.name;
            globalTitle.classList.add('shop-section-title');
            let globalBoxContent = gne('div')
            globalBoxContent.classList.add('stats-content');

            globalBox.append(globalTitle,globalBoxContent)

            content.appendChild(globalBox)

            for (let thing of things) {
                let thingsSequelThings = category.stats[thing]
                let thingsSequel = Object.getOwnPropertyNames(thingsSequelThings)

                let box = gne('div')

                let title = document.createElement('h3');
                title.innerHTML = getLabel(thing);
                title.classList.add('links');
                title.classList.add('pointer');

                let sa = document.createElement('i');
                sa.classList.add('arrow');
                sa.classList.add('sideways');

                let tab_contents = document.createElement('div');
                tab_contents.classList.add('stats-content', 'stats-items');
                tab_contents.classList.add('hidden');

                title.appendChild(sa);

                title.addEventListener('click', function() {
                    sa.classList.toggle('sideways');
                    tab_contents.classList.toggle('hidden');
                });

                box.append(title, tab_contents)
                globalBoxContent.append(box)

                for (let thingy of thingsSequel) {
                    let value = thingsSequelThings[thingy];

                    if (thingy === 'lastmodified') {
                        value = getUnixTimestampDate(value);
                    }

                    let label = getLabel(thingy);

                    let containera = document.createElement('div');
                    containera.classList.add('stat-item');

                    let code = document.createElement('p');
                    code.innerHTML = label;
                    code.classList.add('stat-item-title');

                    let conx = document.createElement('p');
                    conx.innerHTML = value;
                    conx.classList.add('stat-item-content');

                    containera.appendChild(code);
                    containera.appendChild(conx);

                    tab_contents.appendChild(containera);
                }
            }

            if (globalBoxContent.children.length == 0) {
                globalBoxContent.innerHTML = '<img src="' + marioDancing + '"><p>There\'s nothing to see here. Maybe invite this player to join the game?</p>';
            }
        }
    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        content.append(eText);
    })
}

function getLabel(value) {
    labels = {
        'duo': 'Duos',
        'squad': 'Squads',
        'trio': 'Trios',
        'solo': 'Solo',
        'placetop1': 'Wins',
        'kd': 'K/D',
        'winrate': 'Win %',
        'placetop3': 'Top 3',
        'placetop5': 'Top 5',
        'placetop6': 'Top 6',
        'placetop10': 'Top 10',
        'placetop12': 'Top 12',
        'placetop25': 'Top 25',
        'kills': 'Kills',
        'matchesplayed': 'Matches Played',
        'minutesplayed': 'Minutes Played',
        'score': 'Score',
        'playersoutlived': 'Players Outlived',
        'lastmodified': 'Last Modified'
    }

    return labels[value];
}

function lookupPlayer() {
    let containers = document.getElementById('content-players');
    var uName = document.getElementById('player-name').value;

    let reqUrl = 'https://fortniteapi.io/v2/lookup/advanced?username=' + uName

    fetch(reqUrl, {
        headers: 'string' === typeof keyFNAPIIo ? {
            "Authorization": keyFNAPIIo
        } : {}
    }).then(res => res.json()).then(res => {

        clearChildren(containers);

        let boxes = gne('div')
        boxes.classList.add('stats-content');

        let uID = document.getElementById('player-id');

        for (let match of res.matches) {
            let hrefThing = gne('a')
            hrefThing.href = '#player-stats'
            hrefThing.innerHTML = '<h3 class="looked-up-account"><i class="account-type-icon" acctype="' + match.matches[0].platform + '"></i>' + match.matches[0].value + '</h3>';

            boxes.append(hrefThing);

            hrefThing.onclick = () => {
               uID.value = match.accountId;
               searchPlayer(); 
            }
        }

        containers.append(boxes);
        
    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        content.append(eText);
    })
}