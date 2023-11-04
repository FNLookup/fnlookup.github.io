function reloadWithRegion() {
    window.location.href = 'tournaments.html?region=' + document.getElementById('region-dropdown').value;
}

function getRegionName(reg) {
    switch (reg) {
        case 'NAE': return 'NA-East';
        case 'NAC': return 'NA-Central';
        case 'NAW': return 'NA-West';
        case 'EU': return 'Europe';
        case 'ME': return 'Middle East';
        case 'OCE': return 'Oceania';
        case 'BR': return 'Brazil';
        case 'ASIA': return 'Asia';
    }
}

function createRegionSelector() {
    let regionDropdown = document.getElementById('region-dropdown');

    for (let region of ['NAE', 'NAC', 'NAW', 'EU', 'ME', 'OCE', 'BR', 'ASIA']) {
        let option = gne('option');
        option.value = region;
        option.innerText = getRegionName(region);

        let params = new URLSearchParams(window.location.search)

        if (params.has('region')) {
            if (region === params.get('region')) {
                option.selected = true;
            }
        } else {
            if (region === 'NAE') {
                option.selected = true;
            }
        }

        regionDropdown.appendChild(option);
    }
}

function getcompetitive() {
    let region = 'NAC';
    let params = new URLSearchParams(window.location.search)

    if (params.has('region')) {
        region = params.get('region');
    }

    document.getElementById('cur-reg').innerHTML = 'Current region: ' + getRegionName(region);
    if (region === 'NAE' || region === 'NAW') { document.getElementById('cur-reg').innerHTML += 'warning this region might have cease and desisted' }

    let requestData = getRequestData('events&region=' + region);
    fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
        let main = document.getElementById('main');

        let region = document.getElementById('region-title');
        let name = document.getElementById('tournament-name');
        let desc = document.getElementById('tournament-desc');
        let shortDesc = document.getElementById('tournament-short-desc');
        let times = document.getElementById('begin-end-times');
        let platforms = document.getElementById('event-platforms');
        let otherDetails = document.getElementById('free-event-details');
        let windows = document.getElementById('tournament-windows');
        let scoring = document.getElementById('tournament-scoring');
    
        for (let event of r.events.slice(-24)) {

            let parent = gne('a')
            parent.href = '#tournament-details';

            let eventbox = gne('div');
            eventbox.classList.add('event-poster', 'pointer');

            let posterimgh = gne('div');
            posterimgh.classList.add('event-img');
            let poster = gne('img');
            poster.src = event.poster;

            posterimgh.appendChild(poster);
            eventbox.append(posterimgh);

            let textholder = gne('div');
            textholder.classList.add('event-text');

            let line1 = gne('p');
            line1.classList.add('event-text-line1');
            line1.innerHTML = event.name_line1;
            let line2 = gne('p');
            line2.classList.add('event-text-line2');
            line2.innerHTML = event.name_line2;

            textholder.append(line1,line2);
            eventbox.append(textholder);

            eventbox.addEventListener('click', function() {
                name.textContent = event.name_line1 + ' ' + event.name_line2;
                desc.textContent = event.long_description;
                shortDesc.textContent = event.short_description;
                times.innerHTML = getFormatDate(new Date(event.beginTime)) + ' - ' + getFormatDate(new Date(event.endTime));

                let platformStr = [], platformHTML = '';
                for (let pf of event.platforms) {
                    platformStr.push(getAllowedTournamentDevice(pf));
                }
                for (let fpf of platformStr) {
                    platformHTML += '<li>' + fpf + '</li>';
                }

                platforms.innerHTML = 'This event is available for players that use the following devices:<ul class="classified">' + platformHTML + '</ul>';

                clearChildren(otherDetails);
                if (event.cumulative)
                    otherDetails.innerHTML += '<a class="item-type-label">Cumulative</a>'
                
                otherDetails.innerHTML += '<a>' + event.schedule + '</a>'

                clearChildren(windows);
                clearChildren(scoring);
                for (let twindow of event.windows) {
                    let element = gne('div');
                    element.classList.add('tournament-window', 'pointer');

                    let date1 = gne('p');
                    date1.innerHTML = getFormatDate(new Date(twindow.beginTime))
                    let date2 = gne('p')
                    date2.innerHTML = getFormatDate(new Date(twindow.endTime))
                    element.append(date1, date2)
                    windows.append(element);

                    element.onclick = function() {
                        clearChildren(scoring);
                        scoring.innerHTML = 'Please wait...<br><img src="' + marioDancing + '" alt="Mario">';

                        let requestData = getRequestData('window&windowId=' + twindow.windowId);
                        fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
                            console.log(r);

                            clearChildren(scoring)
                            let session = r.session

                            scoring.innerHTML += '<h1>Max. matches: ' + session.matchCap + '</h1>'
                            if (session.finished) {
                                scoring.innerHTML += '<h1>FINISHED</h1>'
                            }

                            for (rule of session.rules.scoring) {

                                scoring.innerHTML += '<h1>POINTS<h1><h2>' + rule.trackedStat + ' (' + rule.matchRule + ')</h2>'
                                let ruleBox = gne('div')
                                ruleBox.classList.add('tournament-rules')
                                scoring.append(ruleBox)

                                for (tier of rule.rewardTiers) {

                                    let holder = gne('div')
                                    holder.classList.add('tournament-rule')

                                    holder.innerHTML += '<h3>Condition: ' + tier.keyValue + '</h3>'
                                    holder.innerHTML += '<h3>Points: ' + tier.pointsEarned + '</h3>'

                                    if (tier.multiplicative) {
                                        holder.innerHTML += '<h3>Multiplicative</h3>'
                                    }
                                    ruleBox.appendChild(holder)
                                }
                            }

                            if (session.rules.tie !== null) {
                                
                                scoring.innerHTML += '<h1>TIE<h1>'
                                let ruleBox = gne('div')
                                ruleBox.classList.add('tournament-rules')
                                scoring.append(ruleBox)

                                for (rule of session.rules.tie.components) {
                                    let holder = gne('div')
                                    holder.classList.add('tournament-rule')

                                    holder.innerHTML += '<h3>Stat: ' + rule.trackedStat + '</h3>'
                                    holder.innerHTML += '<h3>Bits: ' + rule.bits + '</h3>'
                                    if (rule.multiplier != null) {
                                        holder.innerHTML += '<h3>Multiplier: ' + rule.multiplier + '</h3>'
                                    }
                                    ruleBox.appendChild(holder)
                                }
                            }

                            if (session.payout.length > 0) {
                                for (payout of session.payout) {
                                    scoring.innerHTML += '<h1>PAYOUT: ' + payout.scoringType + '<h1>'
                                    if (payout.scoreId != null) {
                                        scoring.innerHTML += '<h1>ID: ' + payout.scoreId + '<h1>'
                                    }
                                    let ruleBox = gne('div')
                                    ruleBox.classList.add('tournament-rules')
                                    scoring.append(ruleBox)
    
                                    for (version of payout.ranks) {
                                        let holder = gne('div')
                                        holder.classList.add('tournament-rule')
    
                                        holder.innerHTML += '<h3>Threshold: ' + version.threshold + '</h3>'

                                        for (cashier of version.payouts) {
                                            holder.innerHTML += '<h3>' + cashier.rewardType + '</h3>'
                                            holder.innerHTML += '<h3>' + cashier.rewardMode + '</h3>'
                                            holder.innerHTML += '<h3>' + cashier.value + ' ' + cashier.quantity + '</h3>'
                                        }
                                        
                                        ruleBox.appendChild(holder)
                                    }
                                }
                            }
                        })
                    }
                }
            })

            parent.append(eventbox);
            main.appendChild(parent);
        }
    })
}