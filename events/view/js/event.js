function viewEvent() {
    if (localStorage.eventRegion === undefined) localStorage.eventRegion = 'NAC'
    let params = new URLSearchParams(window.location.search)
    let eventId = params.get('id')

    let requestData = getRequestData('events&region=' + localStorage.eventRegion);
    fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
        let relevantEvent = r.events.find(event => event.id == eventId);

        console.log(relevantEvent)

        document.getElementById('event-img').src = relevantEvent.poster

        document.getElementById('event-name').textContent = relevantEvent.name_line1 + ' ' + relevantEvent.name_line2;
        document.getElementById('event-desc').textContent = relevantEvent.long_description;
        document.getElementById('event-short-desc').textContent = relevantEvent.short_description;
        document.getElementById('schedule').textContent = relevantEvent.schedule
        document.getElementById('event-times').innerHTML = getFormatDate(new Date(relevantEvent.beginTime)) + ' - ' + getFormatDate(new Date(relevantEvent.endTime));

        for (let plat of relevantEvent.platforms) {
            if (plat !== 'XB1') { // Bro
                document.getElementById('event-platforms').innerHTML += '<img src="' + getDeviceLogo(plat) + '">'
            }
        }

        let canPlayDevice = relevantEvent.platforms.some(element => detectDevice().includes(element));
        if (!canPlayDevice) document.getElementById('event-remarks').innerHTML += '<p style="color: red;" class="header-text-bold">You can\'t play this tournament.</p>'

        if (relevantEvent.cumulative)
            otherDetails.innerHTML += '<a class="item-type-label">Cumulative</a>'

        for (let twindow of relevantEvent.windows) {
            let element = gne('div');
            element.classList.add('tournament-window', 'pointer');

            element.innerHTML = '<div class="tournament-window-idx"><a>#' + relevantEvent.windows.indexOf(twindow) + "</a></div>"

            let windowTimes = gne('div')
            windowTimes.classList.add('tournament-event-window-times')
            element.append(windowTimes)

            let date1 = gne('p');
            date1.innerHTML = getFormatDate(new Date(twindow.beginTime))
            let date2 = gne('p')
            date2.innerHTML = getFormatDate(new Date(twindow.endTime))
            windowTimes.append(date1, date2)
            document.getElementById('event-windows').append(element);

            let scoring = document.getElementById('event-scoring')

            element.onclick = function() {
                scoring.innerHTML = 'Please wait...<br><img src="' + marioDancing + '" alt="Mario">';

                let requestData = getRequestData('window&windowId=' + twindow.windowId);
                fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
                    console.log(r);
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
}