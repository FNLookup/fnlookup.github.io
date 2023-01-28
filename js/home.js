function addToList() {
    sections = [];
    fetch(geturllang("https://fortniteapi.io/v2/shop", 1), {
        headers: { 'Authorization': keyFNAPIIo}
    }).then(shop => shop.json()).then(data => {
        shopItems = data.shop; // save api key requests

        for (let item of data.shop) {
            if (!sections.includes(item.section.name)) {
                sections.push(item.section.name);
            }
        }

        for (let sec of sections) {
            var ob = document.createElement('option');
            ob.innerHTML = sec;
            document.getElementById("shop-section-dropdown").append(ob);

            if (sec == sections[sections.length -1]) iS()
        }
    });
}

function makeCard(item) {
    var shop_row = document.getElementById("item-shop-section");

    let parent = document.createElement('a');
    parent.classList.add('item-card-parent');

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.setAttribute('data-rarity', item.rarity.id.toLowerCase());
    obj.setAttribute('data-type', item.mainType);

    var hold = document.createElement("div");
    hold.classList.add("item-info");

    var title = document.createElement('a');
    title.innerHTML = item.displayName;
    title.classList.add("item-title");

    var price = document.createElement('a');
    var vbuck = document.createElement('img');
    vbuck.src = 'https://media.fortniteapi.io/images/652b99f7863db4ba398c40c326ac15a9/transparent.png';
    vbuck.classList.add("vbuck-icon");

    let vbt = document.createElement('a');
    vbt.classList.add("item-price-vbp");

    let normalPrice = item.price.regularPrice;
    let finalPrice = item.price.finalPrice;

    vbuck.title = finalPrice +'/'+ normalPrice;

    if (typeof(normalPrice) !== "string" && typeof(finalPrice) !== "string") {
        if (finalPrice < normalPrice) {
            let bip = document.createElement('a');
            bip.classList.add("item-price-bip");
    
            bip.innerHTML = normalPrice;
            price.append(bip);
        }
    }

    vbt.innerHTML = finalPrice;

    price.append(vbt);
    
    if (item.ignoreVbuck === undefined) {
        price.appendChild(vbuck);   
    }

    price.classList.add('item-price');

    hold.appendChild(title);

    let type = document.createElement('a');
    type.classList.add("item-type");
    type.innerHTML = item.displayType;
    hold.appendChild(type);

    hold.appendChild(price);
    hold.setAttribute('data-rarity', item.rarity.id.toLowerCase());

    marqueeCheck(title);

    obj.appendChild(hold);

    let ic = document.createElement('div');
    ic.classList.add("item-image");

    let images = [];
    let currentImage = 0;

    for (let i = 0; i < item.displayAssets.length; i++) {
        let displayAsset = item.displayAssets[i];

        var img_obj = document.createElement("img");
        var img_src;

        if (displayAsset.url !== null)
            img_src = displayAsset.url;
        if (displayAsset.background !== null)
            img_src = displayAsset.background;

        img_obj.src = img_src;
        img_obj.setAttribute("title", item.displayName + ' for ' + item.price.finalPrice + ' VBucks');
        img_obj.setAttribute('otype', item.mainType);
        img_obj.classList.add("style-picture");
        
        if (i === 0) img_obj.classList.add('current-style');

        images.push(img_obj);
        ic.appendChild(img_obj);
    }
    obj.append(ic);

    if (item.displayAssets.length > 1) {
        setInterval(function() {
            currentImage ++;
            if (currentImage > images.length - 1) currentImage = 0;

            images[currentImage].classList.add('current-style');
            for (let i = 0; i < images.length; i++) {
                if (i !== currentImage) 
                    images[i].classList.remove('current-style');
            }
        }, 5000);
    }

    if (item.banner !== null) {
        let banner_object = document.createElement('i');
        banner_object.classList.add('item-banner');
        banner_object.innerHTML = item.banner.name;
        banner_object.setAttribute('intensity', item.banner.intensity);
        parent.appendChild(banner_object);
    }

    if (item.ignoreClicks === undefined) {
        parent.href = item.mainId
    }
    if (item.href !== undefined) {
        parent.href = item.href;
    }

    if (item.backgroundColors !== undefined) {
        let colorStr = item.backgroundColors.join(',');

        obj.style.background = 'radial-gradient(' + colorStr + ')';
    }

    parent.appendChild(obj);

    shop_row.append(parent);
}