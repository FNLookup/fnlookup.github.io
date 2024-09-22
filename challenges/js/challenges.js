function getchs() {
    let toggler = document.getElementById('quest-selector-toggler');
    toggler.onclick = function() {
        document.getElementById('quest-selector-arrow').classList.toggle('sideways')
        document.getElementById('quest-selector-options').classList.toggle('displaynone')
    }

    params = new URLSearchParams(window.location.search)

    let requestData = getRequestData('challenges&season=current');
    fetch(requestData.url, requestData.data).then(response => response.json()).then(response => {

        for (let bundle of response.bundles) {
            //if (bundle.tag === null) bundle.tag = 'Unknown'
            if (bundle.name === null) bundle.name = 'Unknown'

            let img = document.getElementById('quest-category-image');
            let bg = document.getElementById('quest-current-category');
            let title = document.getElementById('quest-category-title');

            // let questNum = 0;
            // for (let questbundle of bundle.bundles) {
            //     for (let quest of questbundle.quests) {
            //         questNum += 1;
            //     }
            // }

            //<div class="quest-section"><a>SURVIVOR MEDALS <a class="quest-count">3 quests</a></a></div>
            
            //main.appendChild(c);

            /////////////////
            for (let questbundle of bundle.bundles) {
                
                let container = gne('div')
                container.classList.add('quest-section');
                container.innerHTML = `<a>${questbundle.name || 'Unknown'} <a class="quest-count">${questbundle.quests.length} quests</a></a>`;
                document.getElementById('quest-selector-options').append(container);

                container.addEventListener('click', function() {
                    clean();
                    title.innerHTML = questbundle.header || questbundle.name;
                    img.src = bundle.image || '/assets/logo_nobg.png';
    
                    if (questbundle.colors !== null) {
                        console.log(questbundle.colors)
                        let colors = questbundle.colors
                        console.log('a')
                        let colorThing = colors['AccentColor'] + ', ' + colors['Context_BaseColor']
                        console.log(colorThing)
                        console.log('a')
                        let cssThing = 'linear-gradient(to bottom, ' + colorThing + ')'
                        console.log('a')
                        console.log(cssThing)
                        bg.style.background = cssThing;
                        console.log('a')
                        console.log(bg.style.background)
                        console.log(bg)
                    }
    
                    let right = document.getElementById('quests-viewer');

                    let mainBundle = gne('div');

                    let bundleTitle = gne('div');

                    let questBundleTab = gne('p');
                    questBundleTab.classList.add('challenge-bundle');
                    questBundleTab.innerHTML = questbundle.name;

                    bundleTitle.append(questBundleTab);
                    bundleTitle.append(gne('hr'));

                    mainBundle.appendChild(bundleTitle);

                    for (let quest of questbundle.quests) {
                        let questObject = gne('div');
                        questObject.classList.add('challenge');
                        questObject.classList.add('fortnite-button-border');

                        let questInfo = gne('div');
                        questInfo.classList.add('challenge-info');

                        let questName = gne('p');
                        questName.innerHTML = quest.name;
                        questName.classList.add('challenge-name');

                        let questDesc = gne('p');
                        questDesc.innerHTML = quest.description;
                        questDesc.classList.add('challenge-description');

                        let questShortDesc = gne('a');
                        questShortDesc.innerHTML = quest.shortDescription;
                        questShortDesc.classList.add('challenge-description');

                        let questProgress = gne('a');
                        questProgress.innerHTML = ' ' + quest.progressTotal + ' to do';
                        questProgress.classList.add('challenge-description', 'challenge-small-progress');

                        questInfo.append(questName);
                        questInfo.append(questDesc);
                        questInfo.append(questShortDesc);
                        questInfo.append(questProgress);
                        questObject.append(questInfo)

                        if (quest.description == quest.name) questDesc.remove();
                        if (quest.shortDescription == quest.description || quest.shortDescription == quest.name) questShortDesc.remove();
                        // console.log(quest.shortDescription == quest.description || quest.shortDescription == quest.name, quest.shortDescription, quest.description);

                        ////////////// right part of the quest rewards

                        let rewards = quest.reward;

                        if (rewards !== undefined) {
                            let questRewards = gne('div');
                            questRewards.classList.add('challenge-rewards');

                            if (rewards.xp > 0) {
                                let rewardobj = gne('div');
                                rewardobj.classList.add('challenge-reward');

                                let rewardicon = gne('img');
                                rewardicon.src = '/assets/icons/xp.png';
                                rewardicon.classList.add('reward-icon');
                                rewardicon.title = rewards.xp + ' XP';

                                let rewardquantity = gne('p');
                                rewardquantity.classList.add('reward-quantity');
                                rewardquantity.innerHTML = rewards.xp;

                                rewardobj.append(rewardicon, rewardquantity);
                                questRewards.append(rewardobj);
                            }

                            for (let item of rewards.items) {
                                let rewardobj = gne('div');
                                rewardobj.classList.add('challenge-reward');

                                let rewardicon = gne('img');
                                rewardicon.src = item.images.icon + '?width=100';
                                rewardicon.classList.add('reward-icon', 'pointer');
                                rewardicon.title = item.name;
                                rewardicon.addEventListener('click', function() {
                                    openItemByID(item.id)
                                });

                                let rewardname = gne('div');
                                rewardname.classList.add('challenge-reward-data');

                                rewardname.innerHTML = `<h3>${item.name}</h3>`;

                                rewardobj.append(rewardicon);
                                questRewards.append(rewardobj);
                                questRewards.append(rewardname);
                            }

                            questObject.append(questRewards)

                            if (questRewards.children.length == 0) {
                                /*let rewardobj = gne('div');
                                rewardobj.classList.add('challenge-reward');
    
                                let rewardicon = gne('img');
                                rewardicon.src = marioDancing;
                                rewardicon.classList.add('reward-icon');
                                rewardicon.title = 'No Rewards';
    
                                let rewardquantity = gne('p');
                                rewardquantity.classList.add('reward-quantity');
                                rewardquantity.innerHTML = 'No Rewards';
    
                                rewardobj.append(rewardicon, rewardquantity);
                                questRewards.append(rewardobj);
                                */
                                let text = 'No reward';
                                if (questProgress.innerHTML.length > 1) {
                                    text = ' - No reward.'
                                }
                                questProgress.innerHTML += text;
                                questRewards.remove();
                                questInfo.classList.add('no-rewards');
                            }
                        }

                        mainBundle.append(questObject);
                        right.append(mainBundle);
                    }
                });

                if (params?.get('tab') == 'Weekly' && questbundle.id.toString().includes('Week')) container.click()
            }
        }

    }).catch(err => {
        console.error(err);
    })
}

function clean() {
    let right = document.getElementById('quests-viewer');
    while (right.firstChild) right.removeChild(right.firstChild)
}