function searchPlayer(ID) {
    let content = document.getElementById('content');
    var uID = ID

    clearChildren(content);

    let requestData = getRequestData('stats&account=' + uID);
    fetch(requestData.url, requestData.data).then(res => res.json()).then(res => {
        thestatsfrfr = document.createElement('div')

        thestatsfrfr.innerHTML += '<h1 class="header-text-bold">Battle Pass</h1><hr> <div class="progress-bar-bg"><div class="progress-bar" style="width: ' + res.account.process_pct + '%;"><a class="percentage">Level ' + res.account.level + '</a></div></div>';

        thestatsfrfr.innerHTML += '<h1 class="header-text-bold">Account Stats</h1><hr>'

        let statCategories = [
            { name: 'Global Stats', stats: res.global_stats },
            { name: 'Keyboard & Mouse Stats', stats: res.per_input.keyboardmouse },
            { name: 'Gamepad', stats: res.per_input.gamepad },
            { name: 'Touch', stats: res.per_input.touch }
        ]

        for (let category of statCategories) {
            if (!category) continue;

            let globalStats = category.stats
            let things = Object.getOwnPropertyNames(globalStats)

            let globalBox = gne('div');
            globalBox.classList.add('stats-content', 'stats-box');
            let globalTitle = gne('h2');
            globalTitle.innerHTML = category.name;
            globalTitle.classList.add('header-text-bold');

            globalBox.append(globalTitle)

            thestatsfrfr.appendChild(globalBox)

            for (let thing of things) {
                let thingsSequelThings = category.stats[thing]
                let thingsSequel = Object.getOwnPropertyNames(thingsSequelThings)

                let box = document.createElement('div')

                let stattitle = document.createElement('h3');
                stattitle.innerHTML = getLabel(thing);
                stattitle.classList.add('links');
                stattitle.classList.add('pointer');
                stattitle.classList.add('header-text-bold')

                let sa = document.createElement('i');
                sa.classList.add('arrow');
                sa.classList.add('sideways');

                let tab_contents = document.createElement('div');
                tab_contents.classList.add('stats-content', 'stats-items');
                tab_contents.classList.add('hidden');

                stattitle.appendChild(sa);

                globalBox.append(box)
                stattitle.onclick = function() {
                    sa.classList.toggle('sideways');
                    tab_contents.classList.toggle('hidden');
                };

                box.appendChild(stattitle)
                box.appendChild(tab_contents)

                for (let thingy of thingsSequel) {
                    let value = thingsSequelThings[thingy];

                    if (thingy === 'lastmodified') {
                        value = getUnixTimestampDate(value);
                    }

                    let label = getLabel(thingy);

                    //console.log(value, label)

                    let containera = document.createElement('div');
                    containera.classList.add('stat-item', 'fortnite-button-border');

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

            if (globalBox.children.length == 0) {
                globalBox.innerHTML = '<img src="' + marioDancing + '"><p>There\'s nothing to see here. Maybe invite this player to join the game?</p>';
            }
        }

        content.append(thestatsfrfr)

        let levelHistoryBullshit = ''
        let cardContainerHTML = ''
        for (let levelHistory of res.accountLevelHistory) {
            cardContainerHTML += '<div class="account-season-level-card"><img src="/assets/images/seasons/' + levelHistory.season + '.jpg" alt="Season ' + levelHistory.season + '"><div class="account-level-card-details"><h3>Season ' + levelHistory.season + '</h3><div class="progress-bar-bg"><div class="progress-bar" style="width: ' + levelHistory.process_pct + '%;"><a class="percentage">Level ' + levelHistory.level + '</a></div></div></div></div>'
        }

        levelHistoryBullshit += '<div id="level-history" class="account-level-history">' + cardContainerHTML + '</div>'

        let lhtBS = document.createElement('h1')
        lhtBS.innerText = 'Level History'
        lhtBS.classList.add('header-text-bold')
        lhtBS.classList.add('links');
        lhtBS.classList.add('pointer');
        let thh = document.createElement('i');
        thh.classList.add('arrow');
        thh.classList.add('sideways');
        lhtBS.append(thh);
        content.append(lhtBS)
        let levelHistoryContainerBS = document.createElement('div')
        levelHistoryContainerBS.innerHTML = levelHistoryBullshit
        levelHistoryContainerBS.classList.add('hidden')
        content.append(levelHistoryContainerBS)
        lhtBS.onclick = function() {
            thh.classList.toggle('sideways');
            levelHistoryContainerBS.classList.toggle('hidden');
        };
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

function loadDefaultStats() {
    document.getElementById('player-name').innerHTML = localStorage.accountName + '<a href="/account/change/" class="no-link fortnite-button fortnite-button-border float-right">NOT YOU?</a>'
    searchPlayer(localStorage.accountId)
}