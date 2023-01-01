function getcompetitive() {
    fetch(geturllang('https://fortniteapi.io/v1/events/list?region=NAE', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r => r.json()).then(r => {
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
    
        for (let i = r.events.length - 19; i < r.events.length; i++) {
            let event = r.events[i];

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
                region.textContent = event.region;
                name.textContent = event.name_line1 + ' ' + event.name_line2;
                desc.textContent = event.long_description;
                shortDesc.textContent = event.short_description;
                times.innerHTML = getFormatDate(new Date(event.beginTime)) + ' - ' + getFormatDate(new Date(event.endTime));
                platforms.innerHTML = 'This event is available for players that use the following devices:<br>' + event.platforms.join(', ');

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
                        scoring.innerHTML = 'Please wait...<br><img src="' + localStorage.marioDancing + '" alt="Mario">';

                        fetch('https://fortniteapi.io/v1/events/window?windowId=' + twindow.windowId, {
                            headers: {'Authorization': localStorage.keyFNAPIIo}
                        }).then(r => r.json()).then(r => {
                            clearChildren(scoring)
                            
                            let session = r.session

                            scoring.innerHTML += '<h1>' + session.region + '</h1>'
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