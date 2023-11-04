function getchs() {
    let requestData = getRequestData('challenges&season=current');
    fetch(requestData.url, requestData.data).then(response => response.json()).then(response=>{
    
        for (let bundle of response.bundles) {
            if (bundle.tag === null) continue

            let main = document.getElementById('quest-category-picker');

            let c = gne('div');
            c.classList.add('challenge-category');

            let img = gne('img');
            img.src = bundle.image;

            let title = gne('h2');
            title.classList.add('challenge-title');
            title.innerHTML = bundle.name;

            if (bundle.colorData !== null) {
                let colorThing = '#' + bundle.colorData.RGB1.substring(3, bundle.colorData.RGB1.length) + ', ' + '#' + bundle.colorData.RGB2.substring(3, bundle.colorData.RGB2.length)
                let cssThing = 'linear-gradient(to bottom, ' + colorThing + ')';
                img.style.background = cssThing;
            }

            c.append(img);
            c.append(title);
            main.appendChild(c);

            /////////////////
            c.addEventListener('click', function() {
                clean();
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
                        questInfo.classList.add('challenge-info', 'd-80');
    
                        let questName = gne('p');
                        questName.innerHTML = quest.name;
                        questName.classList.add('challenge-name');
    
                        let questDesc = gne('p');
                        questDesc.innerHTML = quest.description;
                        questDesc.classList.add('challenge-description');

                        let questShortDesc = gne('p');
                        questShortDesc.innerHTML = quest.shortDescription;
                        questShortDesc.classList.add('challenge-description');

                        let questProgress = gne('p');
                        questProgress.innerHTML = quest.progressTotal;
                        questProgress.classList.add('challenge-description');
    
                        questInfo.append(questName);
                        questInfo.append(questDesc);
                        questInfo.append(questShortDesc);
                        questInfo.append(questProgress);
                        questObject.append(questInfo)

                        ////////////// right part of the quest rewards

                        let rewards = quest.reward;

                        if (rewards !== undefined) {
                            let questRewards = gne('div');
                            questRewards.classList.add('challenge-rewards', 'd-20');
    
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
    
                                rewardobj.append(rewardicon);
                                questRewards.append(rewardobj);
                            }

                            if (questRewards.children.length == 0) {
                                let rewardobj = gne('div');
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
                            }

                            questObject.append(questRewards)
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