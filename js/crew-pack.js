function getcpackdata() {
    fetch(geturllang('https://fortniteapi.io/v2/crew', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r=>r.json()).then(r=> {
        document.getElementById('crew-pack-image').src = r.currentCrew.images.itemShopTile;

        let iCs = document.getElementById('crew-pack-items');

        let itemDetails = document.getElementById('pack-item-details');

        let image = document.createElement('img');
        image.classList.add('crew-pack-item-image');
        image.src = r.currentCrew.rewards[0].item.images.icon;

        itemDetails.append(image);

        let itemTitle = gne('a');
        itemTitle.classList.add('crew-pack-item-title');
        itemTitle.innerHTML = r.currentCrew.rewards[0].item.name;

        itemDetails.appendChild(itemTitle);

        let description = gne('a');
        description.classList.add('crew-pack-item-description')
        description.innerHTML = r.currentCrew.rewards[0].item.description;

        
        image.addEventListener('click', function() {
            openItem(itemTitle.innerHTML.toLowerCase())
        })

        itemDetails.appendChild(description);

        ///////

        let prices = '';
        for (let priceTag of r.prices) {
            prices += priceTag.paymentCurrencyCode + ': ' + priceTag.paymentCurrencySymbol + ' ' + priceTag.paymentCurrencyAmountNatural + (priceTag !== r.prices[r.prices.length - 1] ? ' - ' : '');
        }

        document.getElementById('crew-pack-price').innerHTML = prices;

        let mobileItems = document.getElementById('items-mobile');

        for (let reward of r.currentCrew.rewards) {
            let c = document.createElement('div');
            c.classList.add('crew-pack-item');

            let img = document.createElement('img');
            img.src = reward.item.images.icon;
            img.title = reward.item.name;

            img.addEventListener('click', function() {
                image.src = reward.item.images.icon;
                itemTitle.innerHTML = reward.item.name;
                description.innerHTML = reward.item.description;
            })

            c.append(img);
            iCs.appendChild(c);

            let item_mobile = gne('div');
            item_mobile.classList.add('crew-item-mobile');

            let iimg = gne('img');
            iimg.src = reward.item.images.icon;
            iimg.title = reward.item.name;
            iimg.classList.add('full-size', 'news-item-image');
            item_mobile.append(iimg);
            let ititle = gne('h2');
            ititle.innerHTML = reward.item.name;
            item_mobile.appendChild(ititle);
            let idesc = gne('a');
            idesc.innerHTML = reward.item.description;
            item_mobile.append(idesc);

            iimg.addEventListener('click', function() {
                openItem(reward.item.name.toLowerCase());
            })

            mobileItems.append(item_mobile)
        }

    }).catch(err => {
        console.error(err);
    })
}