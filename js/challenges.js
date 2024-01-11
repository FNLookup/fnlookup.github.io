function getchs() {
    let toggler = document.getElementById('quest-selector-toggler');
    toggler.onclick = function(){
        document.getElementById('quest-selector-arrow').classList.toggle('sideways')
        document.getElementById('quest-selector-options').classList.toggle('displaynone')
    }

    let requestData = getRequestData('challenges&season=current');
    fetch(requestData.url, requestData.data).then(response => response.json()).then(response=>{
    
        for (let bundle of response.bundles) {
            if (bundle.tag === null) continue

            let img = document.getElementById('quest-category-image');
            let title = document.getElementById('quest-category-title');

            let questNum = 0;
            for (let questbundle of bundle.bundles) {
                for (let quest of questbundle.quests) {
                    questNum+= 1;
                }
            }

            //<div class="quest-section"><a>SURVIVOR MEDALS <a class="quest-count">3 quests</a></a></div>
            let container = gne('div')
            container.classList.add('quest-section');
            container.innerHTML =  `<a>${bundle.name} <a class="quest-count">${questNum} quests</a></a>`;
            document.getElementById('quest-selector-options').append(container);
            //main.appendChild(c);

            /////////////////
            container.addEventListener('click', function() {
                clean();
                title.innerHTML = bundle.name;
                img.src = bundle.image;

                if (bundle.colorData !== null) {
                    let colorThing = '#' + bundle.colorData.RGB1.substring(3, bundle.colorData.RGB1.length) + ', ' + '#' + bundle.colorData.RGB2.substring(3, bundle.colorData.RGB2.length)
                    let cssThing = 'linear-gradient(to bottom, ' + colorThing + ')';
                    img.style.background = cssThing;
                }

                let right = document.getElementById('quests-viewer');

                for (let questbundle of bundle.bundles) {
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
                        console.log(quest.description == quest.name, quest.description, quest.name);
                        console.log('removed');

                        if (quest.shortDescription == quest.description || quest.shortDescription == quest.name) questShortDesc.remove();
                        console.log(quest.shortDescription == quest.description || quest.shortDescription == quest.name, quest.shortDescription, quest.description);

                        ////////////// right part of the quest rewards

                        let rewards = quest.reward;

                        if (rewards !== undefined) {
                            let questRewards = gne('div');
                            questRewards.classList.add('challenge-rewards');
    
                            if (rewards.xp > 0) {
                                let rewardobj = gne('div');
                                rewardobj.classList.add('challenge-reward');
    
                                let rewardicon = gne('img');
                                rewardicon.src = 'assets/icons/xp.png';
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
                                rewardicon.src = item.images.icon;
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
                    }

                    right.append(mainBundle);
                }
            });
        }

    }).catch(err => {
        console.error(err);
    })
}

function clean() {
    let right = document.getElementById('quests-viewer');
    while(right.firstChild) right.removeChild(right.firstChild)
}