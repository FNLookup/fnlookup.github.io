function searchPlayer() {
    var uName = document.getElementById('player-name');
    var uID = document.getElementById('player-id');

    let content = document.getElementById('content');

    let psn = document.getElementById('acc-psn');
    let xbl = document.getElementById('acc-xbl');
    let epic = document.getElementById('acc-epic');

    let season = document.getElementById('ts-season');
    let lifetime = document.getElementById('ts-lifetime');

    var timeWindow = '';

    if (lifetime.checked)
        timeWindow = 'lifetime';
    if (season.checked)
        timeWindow = 'season';
    
    var reqURL = '';
    if (uName.value.length > 0) {
        let accountType = '';

        if (epic.checked)
            accountType = 'epic';
        if (xbl.checked)
            accountType = 'xbl';
        if (psn.checked)
            accountType = 'psn';

        reqURL = 'https://fortnite-api.com/v2/stats/br/v2?name=' + uName.value + '&accountType=' + accountType + '&timeWindow=' + timeWindow;
    } else if (uID.value.length > 0) {
        reqURL = 'https://fortnite-api.com/v2/stats/br/v2/' + uID.value + '?timeWindow=' + timeWindow;
    } else {
        let error = 'No user name or ID provided';
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        content.append(eText);

        return;
    }

    fetch(reqURL, {
        headers: 'string' === typeof localStorage.keyFNAPI ? {
            "Authorization": localStorage.keyFNAPI
        } : {}
    }).then(res => res.json()).then(res => {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

        if (res.status !== 200) {
            let eTitle = document.createElement('h1');
            let eText = document.createElement('h2');
            let error = res.status + ': ' + res.error;
            console.log(error);
            eTitle.innerHTML = 'Error: ' + res.status;
            eText.innerHTML = res.error;
            content.append(eTitle);
            content.append(eText);

            return;
        }

        console.log(res);

        let data = res.data;

        content.append(document.createElement('hr'));

        let account = document.createElement('h1');
        account.innerHTML = data.account.name;
        let aID = document.createElement('p');
        aID.innerHTML = data.account.id;

        content.append(account);
        content.append(aID);

        content.append(document.createElement('hr'));

        if (data.battlePass !== null) {
            let bp = document.createElement('h2');
            bp.innerHTML = 'Battle Pass';
    
            let progressbg = document.createElement('div');
            progressbg.classList.add('progress-bar-bg');
            
            let progressbar = document.createElement('div');
            progressbar.classList.add('progress-bar');
            progressbar.style.width = data.battlePass.progress + '%';
    
            let level = document.createElement('a');
            level.classList.add('percentage');
            level.innerHTML = 'Level ' + data.battlePass.level;
    
            progressbar.append(level);
            progressbg.append(progressbar);
            content.append(bp);
            content.append(progressbg);

            content.append(document.createElement('hr'));
        }

        // account stuff part

        // stat part

        let stats = data.stats;
        if (stats !== null) {

            let st = document.createElement('h2');
            st.innerHTML = 'Stats';
            content.append(st);

            let template = {
                deaths: 0,
                wins: 0,
                deaths: 0,
                winRate: 0,
                kills: 0,
                killsPerMatch: 0,
                kd: 0,
                killsPerMin: 0,
                lastModified: null,
                matches: 0,
                minutesPlayed: 0,
                playersOutlived: 0,
                score: 0,
                scorePerMatch: 0,
                scorePerMin: 0,
                top3: 0,
                top5: 0,
                top6: 0,
                top10: 0,
                top12: 0,
                top25: 0
            }

            let templatef = {
                overall: template,
                solo: template,
                duo: template,
                squad: template,
                ltm: template
            }

            let statContent = [
                {
                    name: 'All',
                    content: stats.all !== null ? stats.all : templatef
                },
                {
                    name: 'Keyboard & Mouse',
                    content: stats.keyboardMouse !== null ? stats.keyboardMouse : templatef
                },
                {
                    name: 'Controller/Gamepad',
                    content: stats.gamepad !== null ? stats.gamepad : templatef
                },
                {
                    name: 'Mobile',
                    content: stats.touch !== null ? stats.touch : templatef
                }
            ];

            for (let object of statContent) {
                if (object !== null) {
                    let tab = document.createElement('h3');
                    tab.classList.add('stat-type');
                    tab.classList.add('links');
    
                    let arrow = document.createElement('i');
                    arrow.classList.add('arrow');
                    arrow.classList.add('sideways');
    
                    tab.innerHTML = object.name;
                    tab.appendChild(arrow);
                    content.append(tab);
    
                    let tab_contentf = document.createElement('div');
                    tab_contentf.classList.add('stat-box');
                    tab_contentf.classList.add('hidden');

                    tab.addEventListener('click', function() {
                        arrow.classList.toggle('sideways');
                        tab_contentf.classList.toggle('hidden');
                    })

                    content.append(tab_contentf);

                    let stuff = object.content;

                    let context = [
                        {
                            name: 'Overall',
                            content: stuff.overall !== null ? stuff.overall : template
                        },
                        {
                            name: 'Solo',
                            content: stuff.solo !== null ? stuff.solo : template
                        },
                        {
                            name: 'Duos',
                            content: stuff.duo !== null ? stuff.duo : template
                        },
                        {
                            name: 'Squads',
                            content: stuff.squad !== null ? stuff.squad : template
                        },
                        {
                            name: 'LTM',
                            content: stuff.ltm !== null ? stuff.ltm : template
                        }
                    ]
    
                    for (let stats of context) {
                        let title = document.createElement('h3');
                        title.innerHTML = stats.name;
                        title.classList.add('links');
                        title.classList.add('pointer');

                        let sa = document.createElement('i');
                        sa.classList.add('arrow');
                        sa.classList.add('sideways');

                        let tab_contents = document.createElement('div');
                        tab_contents.classList.add('stat-box');
                        tab_contents.classList.add('hidden');

                        title.appendChild(sa);

                        title.addEventListener('click', function() {
                            sa.classList.toggle('sideways');
                            tab_contents.classList.toggle('hidden');
                        });

                        tab_contentf.append(title);
                        tab_contentf.append(tab_contents);

                        let stuff2 = stats.content;

                        let lastUpdate = stuff2.lastModified !== null ? stuff2.lastModified : null;
                        let generate = [
                            {
                                name: 'Score',
                                section: [
                                    {
                                        name: 'Score',
                                        content: stuff2.score !== null ? stuff2.score : 0
                                    },
                                    {
                                        name: 'Score/Min',
                                        content: stuff2.scorePerMin !== null ? stuff2.scorePerMin : 0
                                    },
                                    {
                                        name: 'Score/Match',
                                        content: stuff2.scorePerMatch !== null ? stuff2.scorePerMatch : 0
                                    }
                                ]
                            },
                            {
                                name: 'Matches',
                                section: [
                                    {
                                        name: 'Total',
                                        content: stuff2.matches !== null ? stuff2.matches : 0
                                    },
                                    {
                                        name: 'Won',
                                        content: stuff2.wins !== null ? stuff2.wins : 0
                                    },
                                    {
                                        name: 'Lost',
                                        content: stuff2.deaths !== null ? stuff2.deaths : 0
                                    },
                                    {
                                        name: 'Win Rate',
                                        content: stuff2.winRate !== null ? stuff2.winRate + '%' : 0 + '%'
                                    },
                                    {
                                        name: 'Minutes',
                                        content: stuff2.minutesPlayed !== null ? stuff2.minutesPlayed : 0
                                    },
                                    {
                                        name: 'Players Outlived',
                                        content: stuff2.playersOutlived !== null ? stuff2.playersOutlived : 0
                                    },
                                    {
                                        name: 'Kills',
                                        content: stuff2.kills !== null ? stuff2.kills : 0
                                    },
                                    {
                                        name: 'Kills/Match',
                                        content: stuff2.killsPerMatch !== null ? stuff2.killsPerMatch : 0
                                    },
                                    {
                                        name: 'Kills/Min',
                                        content: stuff2.killsPerMin !== null ? stuff2.killsPerMin : 0
                                    },
                                    {
                                        name: 'K/D',
                                        content: stuff2.kd !== null ? stuff2.kd : 0
                                    }
                                ]
                            },
                            {
                                name: 'Tops',
                                section: [
                                    {
                                        name: 'Top 3',
                                        content: stuff2.top3 !== null ? stuff2.top3 : 0
                                    },
                                    {
                                        name: 'Top 5',
                                        content: stuff2.top5 !== null ? stuff2.top5 : 0
                                    },
                                    {
                                        name: 'Top 6',
                                        content: stuff2.top6 !== null ? stuff2.top6 : 0
                                    },
                                    {
                                        name: 'Top 10',
                                        content: stuff2.top10 !== null ? stuff2.top10 : 0
                                    },
                                    {
                                        name: 'Top 12',
                                        content: stuff2.top12 !== null ? stuff2.top12 : 0
                                    },
                                    {
                                        name: 'Top 25',
                                        content: stuff2.top25 !== null ? stuff2.top25 : 0
                                    }
                                ]
                            }
                        ]

                        for (let datas of generate) {
                            let title = document.createElement('h3');
                            title.innerHTML = datas.name;
                            title.classList.add('links');
                            title.classList.add('pointer');
    
                            let saa = document.createElement('i');
                            saa.classList.add('arrow');
                            saa.classList.add('sideways');

                            title.append(saa);

                            let holder = document.createElement('div');
                            holder.classList.add('stat-box');
                            holder.classList.add('hidden');

                            title.addEventListener('click', function() {
                                saa.classList.toggle('sideways');
                                holder.classList.toggle('hidden');
                            });

                            let container = document.createElement('div');
                            container.classList.add('stats-items');

                            holder.append(container);

                            for (let sections of datas.section) {
                                let containera = document.createElement('div');
                                containera.classList.add('stat-item');

                                let code = document.createElement('p');
                                code.innerHTML = sections.name;
                                code.classList.add('stat-item-title');

                                let conx = document.createElement('p');
                                conx.innerHTML = sections.content;
                                conx.classList.add('stat-item-content');

                                containera.appendChild(code);
                                containera.appendChild(conx);

                                container.append(containera);
                            }

                            tab_contents.append(title);
                            tab_contents.append(holder);
                        }

                        if (lastUpdate !== null) {
                            let laU = document.createElement('h4');
                            laU.innerHTML = 'Last modified: ' + getFormatDate(new Date(lastUpdate.split('T')[0]));
                            laU.innerHTML += ' ' + lastUpdate.split('T')[1].split('Z')[0] + ' (UTC)';
                            tab_contents.append(laU);
                        }
                    }
                }
            }

        }

    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        content.append(eText);
    })
}