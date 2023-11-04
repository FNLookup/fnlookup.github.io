function getcpackdata() {
    let crewID = 0;
    let params = new URLSearchParams(window.location.search);
    if (params.has('crewID')) crewID = params.get('crewID');

    let requestData = getRequestData('crew-history');
    fetch(requestData.url, requestData.data).then(r=>r.json()).then(r=> {
        let crew = r.history[crewID];

        document.getElementById('crew-pack-image').src = crew.images.itemShopTile;

        let iCs = document.getElementById('crew-pack-items');

        let itemDetails = document.getElementById('pack-item-details');

        let image = document.createElement('img');
        image.classList.add('crew-pack-item-image', 'floating');
        image.src = crew.rewards[0].item.images.icon;

        itemDetails.append(image);

        let itemTitle = gne('a');
        itemTitle.classList.add('crew-pack-item-title');
        itemTitle.innerHTML = crew.rewards[0].item.name;

        itemDetails.appendChild(itemTitle);

        let description = gne('a');
        description.classList.add('crew-pack-item-description')
        description.innerHTML = crew.rewards[0].item.description;

        itemDetails.appendChild(description);

        let mobileItems = document.getElementById('items-mobile');

        for (let reward of crew.rewards) {
            if (reward == crew.rewards[0]) {
                image.onclick = function() {
                    openItemByID(reward.item.id);
                }
            }

            let c = document.createElement('div');
            c.classList.add('crew-pack-item');

            let img = document.createElement('img');
            img.src = reward.item.images.icon;
            img.title = reward.item.name;

            img.addEventListener('click', function() {
                image.src = reward.item.images.icon;
                itemTitle.innerHTML = reward.item.name;
                description.innerHTML = reward.item.description;

                image.onclick = function() {
                    openItemByID(reward.item.id);
                }
            })

            c.append(img);
            iCs.appendChild(c);

            let item_mobile = gne('div');
            item_mobile.classList.add('crew-item-mobile');

            let iimg = gne('img');
            iimg.src = reward.item.images.icon;
            iimg.title = reward.item.name;
            iimg.classList.add('full-size', 'news-item-image', 'pointer');
            item_mobile.append(iimg);
            let ititle = gne('h2');
            ititle.innerHTML = reward.item.name;
            item_mobile.appendChild(ititle);
            let idesc = gne('a');
            idesc.innerHTML = reward.item.description;
            item_mobile.append(idesc);

            iimg.addEventListener('click', function() {
                openItemByID(reward.item.id);
            })

            mobileItems.append(item_mobile)
        }

    }).catch(err => {
        console.error(err);
    })
}