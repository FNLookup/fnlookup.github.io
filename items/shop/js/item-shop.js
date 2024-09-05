shopBasic = false;
jamTracks = undefined;
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

    document.getElementById("label-center").innerText = hours + "h " +
        minutes + "m " + seconds + "s";
    if (distance < 0) {
        clearInterval(x);
        var secondsUntilRefresh = 10;
        document.title = "Item shop refreshed!";
        document.getElementById("item-timer").innerHTML = 'ITEM SHOP - ' + "Refresh: 10s";
        var y = setInterval(function() {
            secondsUntilRefresh -= 1;
            if (secondsUntilRefresh <= 0) {
                document.location.reload();
            }
            document.getElementById("item-timer").innerHTML = 'ITEM SHOP - ' + "Refresh: " + secondsUntilRefresh + "s";
        }, 1000);
    }

}, 500);

function initShop() {
    let jamTrackURL = 'https://raw.githubusercontent.com/FNLookup/data/main/festival/jam_tracks.json'
    fetch(jamTrackURL).then(jts => jts.json()).then(jts => {
        jamTracks = jts;
        createItems();
    }).catch(e => {
        console.log('Could not fetch Jam Tracks: '+e);
        jamTracks = {tracks:[]}
        createItems();
    })
}

function createItems() {
    let requestData = getRequestData('shop?renderData=true');
    fetch(requestData.url, requestData.data).then(response => response.json()).then(response => {

        categories_final = { "categories": [] };

        let data = response
        for (let item of data['shop']) {
            let category = item["section"]['category'];
            let group_name = item['section']['name'];
            let section_name = item['section']['name'];
            let section_id = item['section']['id'];
            let item_details = {
                'name': item['displayName'],
                'id': item['mainId'],
                "priority": item["priority"],
                "tileSize": item["tileSize"],
                "width": 0,
                "height": 0
            };

            if (section_name === null) {
                section_name = 'Unknown_Category_Section_THIS IS USED AS FALLBACK'
            }

            if (category === null) {
                category = section_name;
            }

            // Check if category exists, if not add it
            let category_exists = false;
            for (let cat of categories_final["categories"]) {
                if (cat["name"] === category) {
                    category_exists = true;
                    break;
                }
            }

            if (!category_exists) {
                categories_final["categories"].push({ "name": category, "groups": [] });
            }

            // Find the category and add group if not exists
            for (let cat of categories_final["categories"]) {
                if (cat["name"] === category) {
                    let group_exists = false;
                    for (let grp of cat["groups"]) {
                        if (grp["name"] === group_name) {
                            group_exists = true;
                            break;
                        }
                    }

                    if (!group_exists) {
                        cat["groups"].push({ "name": group_name, "sections": [] });
                    }
                    break;
                }
            }

            // Find the group and add section if not exists
            for (let cat of categories_final["categories"]) {
                if (cat["name"] === category) {
                    for (let grp of cat["groups"]) {
                        if (grp["name"] === group_name) {
                            let section_exists = false;
                            for (let sec of grp["sections"]) {
                                if (sec["id"] === section_id) {
                                    section_exists = true;
                                    break;
                                }
                            }

                            if (!section_exists) {
                                grp["sections"].push({ "id": section_id, "name": section_name, "items": [] });
                            }
                            break;
                        }
                    }
                    break;
                }
            }

            // Add item details to the section
            for (let cat of categories_final["categories"]) {
                if (cat["name"] === category) {
                    for (let grp of cat["groups"]) {
                        if (grp["name"] === group_name) {
                            for (let sec of grp["sections"]) {
                                if (sec["id"] === section_id) {
                                    sec["items"].push(item_details);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }

        // Adjusting width and height for each item
        for (let category of categories_final["categories"]) {
            for (let group of category['groups']) {
                for (let section of group['sections']) {
                    let items = section['items'];
                    let count = items.length;
                    for (let item of items) {
                        let tileSize = item['tileSize'];
                        if (tileSize.startsWith("Size_2")) {
                            count += 1;
                        } else if (tileSize.startsWith("Size_3") || tileSize === "TripleWide") {
                            count += 2;
                        } else if (tileSize.startsWith("Size_4")) {
                            count += 3;
                        } else if (tileSize.startsWith("Size_5")) {
                            count += 4;
                        }
                    }
                    section['count'] = count
                    for (let item of items) {
                        let tileSize = item['tileSize'];
                        // the place where tilesizes are created
                        if (tileSize === "Size_1_x_1") {
                            //console.log(count, item['name']);
                            item['width'] = count in [4, 2] ? 0.2 : 0.25;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_1_x_2" || tileSize === "Normal") {
                            item['width'] = count in [4, 2] ? 0.2 : 0.25;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_2_x_1") { //Two by one.
                            item['width'] = count === 2 ? 0.5 : count > 4 ? 0.4 : 0.5;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_2_x_2") {
                            item['width'] = count === 2 ? 0.5 : count > 4 ? 0.4 : 0.5;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_3_x_1") { // THREE BY ONE?!!?!?
                            item['width'] = count in [4, 2] ? 0.6 : 0.75;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_3_x_2" || tileSize === "TripleWide") {
                            item['width'] = count === 2 ? 0.75 : count > 3 ? 0.6 : 0.6;
                            item['height'] = 1.0;
                        } else if (tileSize === "Size_4_x_1") { // FO URRR?!??
                            item['width'] = count === 4 ? 1.0 : count > 4 ? 0.8 : 0.8;
                            item['height'] = 1.0;
                        } else if (tileSize === 'Size_5_x_2') { // Fortnite ISTG.
                            item['width'] = 0.5;
                            item['height'] = 1.0;
                        } else { // THE SHOP BROKE???
                            item['width'] = 0.2;
                            item['height'] = 1.0;
                            console.log('[TZ] Unknown tileSize ' + tileSize + ' for item ' + item.name);
                        }
                    }
                }
            }
        }

        //console.log(categories_final)

        let shopContainer = document.getElementById('main')
        let theJamTracksHaveBeenSkipped = false;

        let labelRight = document.getElementById('label-right')
        labelRight.onclick = () => {
            document.getElementById('dropdown-menu-sections').classList.toggle('hidden-dropdown')
        }

        for (category of categories_final.categories) {
            shopContainer.innerHTML += `<h1 style="text-transform: uppercase;" class="header-text-sequel header-text-italic">${category.name}</h1>`

            let classContainer = gne('div')
            classContainer.classList.add('filter-class-container')

            // console.log(category)
            classContainer.innerHTML += '<h2 class="filter-class-name" style="text-align: right;">' + category.name.toUpperCase() + '</h2>'

            let groupContainer = gne('div')
            groupContainer.classList.add('flex', 'flex-wrap')
            groupContainer.style.justifyContent = 'right'

            classContainer.append(groupContainer)
            document.getElementById('dropdown-menu-sections').append(classContainer)

            for (group of category.groups) {
                groupContainer.innerHTML += '<a class="filter-class-object fortnite-button-border pointer" href="#Group_' + group.name + '">' + group.name + '</a>'

                shopContainer.innerHTML += `<h2 style="text-transform: uppercase; scroll-margin-top: 10rem;" class="header-text-sequel header-text-italic" id="Group_${group.name}">${group.name}</h2>`

                for (section of group.sections) {
                    let sectionHeight = 425;

                    //console.log(section.id)
                    if (section.id.includes('JamTracks')) {
                        if (!theJamTracksHaveBeenSkipped) {
                            shopContainer.innerHTML += '<br><a href="/festival/" class="fortnite-button fortnite-button-border">Go to Jam Tracks</a>'
                            theJamTracksHaveBeenSkipped = true;
                        }
                        continue;
                    }

                    shopContainer.innerHTML += `<div class="shop-section-section-container" style="display: flex; flex-direction: column; align-content: flex-start; flex-wrap: wrap; height: ${sectionHeight}px;" id="Section_${section.id}" count="${section.count}"></div>`
                }
            }
        }

        /*
        if (response.customBackground !== null) {
            let p = document.getElementsByClassName("season-video")[0]
            p.innerHTML = '';

            let img = gne('img');
            img.classList.add('fn-season-video');
            img.id = 'fn-video';
            img.src = response.customBackground;
            p.append(img);
        }*/

        for (let i = 0; i < response.shop.length; i++) {
            let item = response.shop[i];
            makeShopCard(item);
        }

        // for (const obj of registeredSections) {
        //     var item_count = document.createElement('a');
        //     item_count.innerHTML = document.getElementsByName(obj)[0].children.length + ' items';
        //     item_count.classList.add('items-count');

        //     document.getElementById('title_' + obj).append(item_count);
        // }
        // let requestData = getRequestData('crew');
        // fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
        //     let crew = r.currentCrew;

        //     let images = [];
        //     let crewItems = crew.rewards;

        //     for (let reward of crewItems) {
        //         images.push({
        //             background: reward.item.images.icon
        //         })
        //     }

        //     makeShopCard({
        //         section: {
        //             name: crew.descriptions.title,
        //             landingPriority: 0
        //         },
        //         rarity: {
        //             id: 'exotic'
        //         },
        //         mainType: 'bundle',
        //         displayName: crew.descriptions.title,
        //         price: {
        //             finalPrice: '$ 11.99',
        //             regularPrice: '$ 11.99'
        //         },
        //         ignoreVbuck: true,
        //         displayType: getFormatDate(new Date(crew.date)),
        //         banner: {
        //             name: crew.descriptions.vbucksTitle,
        //             intensity: 'Low'
        //         },
        //         ignoreClicks: true,
        //         displayAssets: images,
        //         backgroundColors: [
        //             '#' + crew.colors.C, '#' + crew.colors.B, '#' + crew.colors.A
        //         ],
        //         href: 'crew-pack.html'
        //     }, registeredSections);

        // }).catch(err => {
        //     console.error(err);
        // })
    })
}

function hexToRgba(hexstr, alpha = 1) {
    const hex = hexstr.replace('#','');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function makeShopCard(item) {
    var shop_items = document.getElementById("shop-container");

    // const section_name = item.section.name + '_' + item.section.landingPriority;
    // var section_c;
    // if (!registeredSections.includes(section_name)) {
    //     var section_title = document.createElement('h1');
    //     section_title.innerHTML = item.section.name;
    //     section_title.classList.add('flex-center');
    //     section_title.classList.add('shop-section-title');
    //     section_title.id = 'title_' + section_name;

    //     var section_container = document.createElement('div');
    //     section_container.classList.add("shop-items-display");
    //     section_container.setAttribute('name', section_name)

    //     shop_items.append(section_title);
    //     shop_items.append(section_container);

    //     registeredSections.push(section_name);
    //     section_c = section_container;
    // } else {
    //     section_c = document.getElementsByName(section_name)[0];
    // }

    if (item.section.id.includes('JamTracks')) return;

    let section_c = document.getElementById('Section_' + item.section.id)

    let item_props = {}

    for (category of categories_final.categories) {
        for (group of category.groups) {
            for (sec of group.sections) {
                //console.log('section ', sec)
                for (itemsec of sec.items) {
                    //console.log(itemsec.id === item.mainId, itemsec.id, item.mainId)
                    if (itemsec.id == item.mainId) {
                        item_props = itemsec
                            //console.log('found')
                    }
                }
            }
        }
    }

    //console.log(item_props)

    let parent = document.createElement('a');
    parent.setAttribute('tile-size', item.tileSize);
    parent.classList.add('item-card-parent');
    parent.classList.add('fn-border-style');

    parent.style.width = item_props.width * 100 + '%'
    parent.style.height = item_props.height * 100 + '%'
    parent.style.padding = '0.65rem'
        //parent.style.width = '220px'

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.classList.add("fortnite-button-border");

    obj.setAttribute('data-rarity', item.rarity.id.toLowerCase());
    obj.setAttribute('data-type', item.mainType);

    var hold = document.createElement("div");
    hold.classList.add("item-info");
    if (item.colors.textBackgroundColor !== null) {
        hold.style.setProperty('--text-background-color', hexToRgba(item.colors.textBackgroundColor, 0))
        hold.style.setProperty('--text-background-color-a', hexToRgba(item.colors.textBackgroundColor, 0.65))
    }

    var title = document.createElement('a');
    title.innerHTML = item.displayName;
    title.classList.add("item-title");

    var price = document.createElement('a');
    var vbuck = document.createElement('img');
    vbuck.src = '/assets/images/vbucks.png';
    vbuck.classList.add("vbuck-icon");

    if (item.ignoreVbuck === undefined) {
        price.appendChild(vbuck);
    }

    let vbt = document.createElement('a');
    vbt.classList.add("item-price-vbp");

    let normalPrice = item.price.regularPrice;
    let finalPrice = item.price.finalPrice;

    vbuck.title = finalPrice + '/' + normalPrice;

    price.append(vbt);

    if (typeof(normalPrice) !== "string" && typeof(finalPrice) !== "string") {
        if (finalPrice < normalPrice) {
            let bip = document.createElement('a');
            bip.classList.add("item-price-bip");

            bip.innerHTML = normalPrice;
            price.append(bip);
        }
    }

    vbt.innerHTML = finalPrice;

    price.classList.add('item-price');

    hold.appendChild(title);

    let type = document.createElement('p');
    type.classList.add("item-type");

    let itype = item.displayType
    if (item.mainId.startsWith('SID')) {
        itype = 'Jam Track'

        viewTrack = jamTracks.tracks.find(track => track.item_id.toLowerCase().split(":")[1] == item.mainId.toLowerCase())
        if (viewTrack != undefined) {
            title.innerHTML = viewTrack.title;
            itype = viewTrack.artist;
        } else {
            title.innerHTML = 'Unknown Jam Track';
            itype = 'Jam Track';
        }
    }

    type.innerHTML = itype;
    hold.appendChild(type);

    hold.appendChild(price);
    hold.setAttribute('data-rarity', item.rarity.id.toLowerCase());

    //marqueeCheck(title);

    obj.appendChild(hold);

    let ic = document.createElement('div');
    ic.classList.add("item-image");

    let images = [];
    let currentImage = 0;

    let displayAssets = item.displayAssets.filter(da => da.primaryMode !== 'Juno');
    // console.log(displayAssets)

    let prefix = '?width=350'
    if (item_props.width > 0.2) prefix = '?width=400'

    for (let displayAsset of displayAssets) {
        var img_obj = document.createElement("img");
        img_obj.loading = 'lazy'
        var img_src;

        if (displayAsset.url !== null)
            img_src = displayAsset.url + prefix;
        if (displayAsset.background !== null)
            img_src = displayAsset.background + prefix;
        if (item.colors !== undefined && item.colors.color1 !== undefined) {
            img_src = displayAsset.url + prefix;
        }

        img_obj.src = img_src;
        img_obj.setAttribute("title", item.displayName + ' for ' + item.price.finalPrice + ' V-Bucks');
        img_obj.setAttribute('otype', item.mainType);
        img_obj.classList.add("shop-picture");

        if (displayAsset.renderData != null) {
            if (displayAsset.renderData.ZoomImage_Percent != undefined) {
                let zoom = Math.abs(displayAsset.renderData.ZoomImage_Percent) / 100;
                img_obj.classList.add('override-styles');
                img_obj.style.setProperty('--floor-scale', 1 + zoom);
            }

            if (displayAsset.renderData.OffsetImage_Y != undefined) {
                img_obj.classList.add('override-styles');
                // console.log(displayAsset.renderData.OffsetImage_Y + '' + item.displayName);
                img_obj.style.setProperty('--y-off', displayAsset.renderData.OffsetImage_Y + 'px');
            }
        }

        images.push(img_obj);
        ic.appendChild(img_obj);

        if (displayAssets.indexOf(displayAsset) == 0) {
            img_obj.classList.add('first-image', 'current-showcase-style');
            img_obj.setAttribute('Wideness', item_props.width)
        } else continue;
        if (displayAssets.indexOf(displayAsset) == displayAssets.length - 1) img_obj.classList.add('last-image');
    }
    obj.append(ic);

    let cycleSecs = 5

    // if (item.displayAssets.length > 1) {
    //     setInterval(function() {
    //         // console.log(images.length)

    //         let lastImage = currentImage;

    //         currentImage++;
    //         if (currentImage > images.length - 1) currentImage = 0;

    //         for (let image of images) {
    //             let index = images.indexOf(image)
    //             if (images.length >= 2) {
    //                 if (index !== currentImage) image.classList.remove('current-showcase-style');
    //             } else {
    //                 if (index !== currentImage - 1 &&
    //                     index != currentImage) image.classList.remove('current-showcase-style');

    //                 image.classList.add('go-away-instantly');
    //                 images[currentImage].classList.remove('go-away-instantly');
    //             }

    //             //images[i].classList.remove('current-showcase-style')
    //         }

    //         images[currentImage].classList.add('current-showcase-style');
    //     }, (cycleSecs * 1000));
    // }

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

    if (item.colors !== undefined) {
        let colArray = [];
        if (item.colors.color1 != undefined) colArray.push(hexToRgba(item.colors.color1));
        if (item.colors.color2 != undefined) colArray.push(hexToRgba(item.colors.color2));
        if (item.colors.color3 != undefined) colArray.push(hexToRgba(item.colors.color3));

        let stStr = 'linear-gradient(to bottom, ' + colArray.join(', ') + ')'
        obj.style.background = stStr
    }

    section_c.append(parent);
}