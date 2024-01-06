shopBasic = false;
let registeredSections = [];
// Set the date we're counting down to
var today = new Date();
var countDownDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 0, 0, 0).getTime();

// Update the count down every 1 second
var x = setInterval(function() {
    var now_local = new Date();
    var now = new Date(now_local.getUTCFullYear(), now_local.getUTCMonth(), now_local.getUTCDate(), now_local.getUTCHours(), now_local.getUTCMinutes(), now_local.getUTCSeconds());
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (!shopBasic) {
        document.getElementById("item-timer").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s";
        if (distance < 0) {
            clearInterval(x);
            var secondsUntilRefresh = 5;
            document.title = "Item shop refreshed!";
            document.getElementById("item-timer").innerHTML = "Refresh: 5s";
            var y = setInterval(function() {
                secondsUntilRefresh -= 1;
                if (secondsUntilRefresh == 0) {
                    document.location.reload();
                }
                document.getElementById("item-timer").innerHTML = "Refresh: " + secondsUntilRefresh + "s";
            }, 1000);
        }
    } else {
        document.getElementById("basic-is-timer").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s";
    }
}, 500);

function constructItemShop() {
    let params = new URLSearchParams(window.location.search);
    if (params.has('date')) {
        let goalDate = params.get('date');
        let listMatching = []
        let requestData = itemFetch('fields=name,id,displayAssets,images,shopHistory,rarity,type,price');
        fetch(requestData.url, requestData.data).then(data => data.json()).then(data => {
            listMatching = data.items.filter(item => item.shopHistory && item.shopHistory.includes(goalDate));

            for (let item of listMatching) {
                makeShopCard({
                    section: {
                        name: 'Item Shop for ' + getFormatDate(new Date(goalDate)),
                        landingPriority: 0
                    },
                    rarity: {
                        id: item.rarity.id
                    },
                    mainId: item.id,
                    mainType: item.type.id,
                    displayName: item.name,
                    price: {
                        finalPrice: item.price,
                        regularPrice: item.price
                    },
                    displayType: item.type.name,
                    displayAssets: item.displayAssets,
                    images: item.images,
                    banner: null
                }, registeredSections);
            }
        });

        return true;
    }

    return false;
}

function createItems() {
    if (constructItemShop()) return;
    
    let requestData = getRequestData('shop');
    fetch(requestData.url, requestData.data).then(response=>response.json()).then(response=>{
    
        if (response.customBackground !== null) {
            let p = document.getElementsByClassName("season-video")[0]
            p.innerHTML = '';

            let img = gne('img');
            img.classList.add('fn-season-video');
            img.id = 'fn-video';
            img.src = response.customBackground;
            p.append(img);
        }

        for (let i = 0; i < response.shop.length; i++) {
            let item = response.shop[i];
            makeShopCard(item, registeredSections);
        }

        for (const obj of registeredSections) {
            var item_count = document.createElement('a');
            item_count.innerHTML = document.getElementsByName(obj)[0].children.length + ' items';
            item_count.classList.add('items-count');

            document.getElementById('title_' + obj).append(item_count);
        }
        let requestData = getRequestData('crew');
        fetch(requestData.url, requestData.data).then(r=>r.json()).then(r=> {
            let crew = r.currentCrew;

            let images = [];
            let crewItems = crew.rewards;

            for (let reward of crewItems) {
                images.push({
                    background: reward.item.images.icon
                })
            }

            makeShopCard({
                section: {
                    name: crew.descriptions.title,
                    landingPriority: 0
                },
                rarity: {
                    id: 'exotic'
                },
                mainType: 'bundle',
                displayName: crew.descriptions.title,
                price: {
                    finalPrice: '$ 11.99',
                    regularPrice: '$ 11.99'
                },
                ignoreVbuck: true,
                displayType: getFormatDate(new Date(crew.date)),
                banner: {
                    name: crew.descriptions.vbucksTitle,
                    intensity: 'Low'
                },
                ignoreClicks: true,
                displayAssets: images,
                backgroundColors: [
                    '#' + crew.colors.C, '#' + crew.colors.B, '#' + crew.colors.A
                ],
                href: 'crew-pack.html'
            }, registeredSections);

        }).catch(err => {
            console.error(err);
        })
    })
}

function makeShopCard(item, registeredSections) {
    var shop_items = document.getElementById("shop-container");

    const section_name = item.section.name + '_' + item.section.landingPriority;
    var section_c;
    if (!registeredSections.includes(section_name)) {
        var section_title = document.createElement('h1');
        section_title.innerHTML = item.section.name;
        section_title.classList.add('flex-center');
        section_title.classList.add('shop-section-title');
        section_title.id = 'title_' + section_name;

        var section_container = document.createElement('div');
        section_container.classList.add("shop-items-display");
        section_container.setAttribute('name', section_name)

        shop_items.append(section_title);
        shop_items.append(section_container);

        registeredSections.push(section_name);
        section_c = section_container;
    } else {
        section_c = document.getElementsByName(section_name)[0];
    }

    let parent = document.createElement('a');
    parent.classList.add('item-card-parent');
    parent.classList.add('fn-border-style');

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

    let type = document.createElement('p');
    type.classList.add("item-type");
    type.innerHTML = item.displayType;
    hold.appendChild(type);

    hold.appendChild(price);
    hold.setAttribute('data-rarity', item.rarity.id.toLowerCase());

    //marqueeCheck(title);

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
        img_obj.setAttribute("title", item.displayName + ' for ' + item.price.finalPrice + ' V-Bucks');
        img_obj.setAttribute('otype', item.mainType);
        img_obj.classList.add("shop-picture");
        
        if (i === 0) img_obj.classList.add('first-image', 'current-showcase-style');
        if (i === item.displayAssets.length - 1) img_obj.classList.add('last-image');

        images.push(img_obj);
        ic.appendChild(img_obj);
    }
    obj.append(ic);

    let cycleSecs = 3

    if (item.displayAssets.length > 1) {
        setInterval(function() {
            let lastImage = currentImage;

            currentImage ++;
            if (currentImage > images.length - 1) currentImage = 0;

            images[currentImage].classList.add('current-showcase-style');
            for (let i = 0; i < images.length; i++) {
                if (images.length == 2) {
                    if (i !== currentImage) images[i].classList.remove('current-showcase-style');
                } else {
                    if (i !== currentImage - 1 && 
                        i != currentImage) images[i].classList.remove('current-showcase-style');

                    if (currentImage == 0) {
                        images[images.length - 2].classList.add('go-away-instantly');
                    }
                    if (currentImage == images.length - 3) {
                        images[images.length - 2].classList.remove('go-away-instantly');
                    }
                }
            }
        }, (cycleSecs * 1000));
    }

    if (item.banner !== null) {
        let banner_object = document.createElement('i');
        banner_object.classList.add('item-banner');
        banner_object.innerHTML = item.banner.name;
        banner_object.setAttribute('intensity', item.banner.intensity);
        parent.appendChild(banner_object);
    }

    if (item.ignoreClicks === undefined) {
        parent.href = getItemLinkByID(item.mainId);
    }
    if (item.href !== undefined) {
        parent.href = item.href;
    }

    if (item.backgroundColors !== undefined) {
        let colorStr = item.backgroundColors.join(',');

        obj.style.background = 'radial-gradient(' + colorStr + ')';
    }

    parent.appendChild(obj);

    section_c.append(parent);
}