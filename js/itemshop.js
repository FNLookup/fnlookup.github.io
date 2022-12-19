shopBasic = false;

// Set the date we're counting down to
var today = new Date();
var countDownDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1, 0, 0, 0).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time in utc

    var now_local = new Date();
    var now = new Date(now_local.getUTCFullYear(), now_local.getUTCMonth(), now_local.getUTCDate(), now_local.getUTCHours(), now_local.getUTCMinutes(), now_local.getUTCSeconds());

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (!shopBasic) {
        document.getElementById("item-timer").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s";

        // If the count down is finished, write some text
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

function createItems() {
    fetch("https://fortnite-api.com/v2/shop/br").then(response=>response.json()).then(response=>{
        if (response.status !== 200) {
            let eTitle = document.createElement('h1');
            let eText = document.createElement('h2');
            let error = response.status + ': ' + response.error;
            console.log(error);
            eTitle.innerHTML = 'Error: ' + response.status;
            eText.innerHTML = response.error;
            document.getElementsByClassName('content')[0].append(eTitle);
            document.getElementsByClassName('content')[0].append(eText);

            return;
        }

        sections = [
            {
                data: [response.data.daily, response.data.featured, response.data.specialFeatured]
            }
        ]

        var shop_items = document.getElementById("shop-container");
    
        
        for (let h = 0; h < sections.length; h++) {
            var sec_datas = sections[h].data;

            var registeredSections = [];
            var sections = [];

            for (let data of sec_datas) {
                for (let i = 0; i < data.entries.length; i++) {
                    console.log(data.entries[i]);
    
                    const items = data.entries[i].items;
                    const bundle  = data.entries[i].bundle;
    
                    if (bundle !== null) {
                        const item_obj = items[0];
                        const section_name = data.entries[i].section.name;
                        var section_c;
                        if (!registeredSections.includes(section_name)) {
                            var section_title = document.createElement('h1');
                            section_title.innerHTML = section_name;
                            section_title.classList.add('flex-center');
                            section_title.classList.add('shop-section-title');
                            section_title.id = 'title_' + section_name;
    
                            var section_container = document.createElement('div');
                            section_container.classList.add("shop-items-display");
                            section_container.setAttribute('name', section_name);
    
                            shop_items.append(section_title);
                            shop_items.append(section_container);
    
                            registeredSections.push(section_name);
                            section_c = section_container;
                        } else {
                            section_c = document.getElementsByName(section_name)[0];
                        }

                        let parent = document.createElement('div');
                        parent.classList.add('item-card-parent');
    
                        var obj = document.createElement("div");
                        obj.classList.add("item-card");
                        obj.setAttribute('data-rarity', item_obj.rarity.value);
                        
                        var hold = document.createElement("div");
                        hold.classList.add("item-info");
    
                        var title = document.createElement('span');
                        title.innerHTML = bundle.name;
                        title.classList.add("item-title");
    
                        var price = document.createElement('a');
                        var vbuck = document.createElement('img');
                        vbuck.src = response.data.vbuckIcon;
                        vbuck.classList.add("vbuck-icon");

                        let vbt = document.createElement('a');
                        vbt.classList.add("item-price-vbp");

                        let normalPrice = data.entries[i].regularPrice;
                        let finalPrice = data.entries[i].finalPrice;

                        vbuck.title = finalPrice +'/'+ normalPrice;

                        if (finalPrice < normalPrice) {
                            let bip = document.createElement('a');
                            bip.classList.add("item-price-bip");

                            bip.innerHTML = normalPrice;
                            price.append(bip);
                        }

                        vbt.innerHTML = finalPrice;

                        price.append(vbt);
    
                        price.appendChild(vbuck);
                        price.classList.add('item-price');
    
                        hold.appendChild(title);

                        let type = document.createElement('a');
                        type.classList.add("item-type");
                        type.innerHTML = bundle.info;
                        hold.appendChild(type);

                        hold.appendChild(price);
                        hold.setAttribute('data-rarity', item_obj.rarity.value);
    
                        marqueeCheck(title);
    
                        obj.appendChild(hold);

                        if (data.entries[i].banner !== null) {
                            let banner_object = document.createElement('i');
                            banner_object.classList.add('item-banner');
                            banner_object.innerHTML = data.entries[i].banner.value;
                            banner_object.setAttribute('intensity', data.entries[i].banner.intensity);
                            parent.appendChild(banner_object);
                        }
                        
                        let ic = document.createElement('div');
                        ic.classList.add("item-image");

                        var img_obj = document.createElement("img");
                        var img_src;
    
                        img_src = bundle.image;
    
                        if (data.entries[i].newDisplayAsset != null) {
                            if (data.entries[i].newDisplayAsset.materialInstances != null) {
                                img_src = data.entries[i].newDisplayAsset.materialInstances[0].images.Background;
                            }
                        }
    
                        img_obj.src = img_src;
                        
                        img_obj.setAttribute("title", bundle.name + ' for ' + data.entries[i].finalPrice + ' VBucks');
                        ic.appendChild(img_obj);
                        obj.append(ic);

                        parent.append(obj);
    
                        section_c.append(parent);
                    } else {
                        let firstItem = items[0];

                        for (let j = 0; j < items.length; j++) {
                            const item_obj = items[j];
    
                            const section_name = data.entries[i].section.name;
                            var section_c;
                            if (!registeredSections.includes(section_name)) {
                                var section_title = document.createElement('h1');
                                section_title.innerHTML = section_name;
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

                            let parent = document.createElement('div');
                            parent.classList.add('item-card-parent');
    
                            var obj = document.createElement("div");
                            obj.classList.add("item-card");
                            obj.setAttribute('data-rarity', item_obj.rarity.value);
    
                            var hold = document.createElement("div");
                            hold.classList.add("item-info");
    
                            var title = document.createElement('a');
                            title.innerHTML = item_obj.name;
                            title.classList.add("item-title");
    
                            var price = document.createElement('a');
                            var vbuck = document.createElement('img');
                            vbuck.src = response.data.vbuckIcon;
                            vbuck.classList.add("vbuck-icon");
    
                            let vbt = document.createElement('a');
                            vbt.classList.add("item-price-vbp");

                            let normalPrice = data.entries[i].regularPrice;
                            let finalPrice = data.entries[i].finalPrice;

                            vbuck.title = finalPrice +'/'+ normalPrice;

                            if (finalPrice < normalPrice) {
                                let bip = document.createElement('a');
                                bip.classList.add("item-price-bip");

                                bip.innerHTML = normalPrice;
                                price.append(bip);
                            }

                            vbt.innerHTML = finalPrice;

                            price.append(vbt);
                            price.appendChild(vbuck);
                            price.classList.add('item-price');
    
                            hold.appendChild(title);

                            let type = document.createElement('a');
                            type.classList.add("item-type");
                            type.innerHTML = item_obj.type.displayValue;
                            hold.appendChild(type);

                            hold.appendChild(price);
                            hold.setAttribute('data-rarity', item_obj.rarity.value);
    
                            marqueeCheck(title);
    
                            obj.appendChild(hold);

                            let ic = document.createElement('div');
                            ic.classList.add("item-image");
    
                            var img_obj = document.createElement("img");
                            var img_src;
    
                            if (item_obj.images.featured != null)
                                img_src = item_obj.images.featured;
                            else if (item_obj.images.icon != null)
                                img_src = item_obj.images.icon;
                            else if (item_obj.images.smallIcon != null)
                                img_src = item_obj.images.smallIcon;
    
                            if (j < 1) {
                                if (data.entries[i].newDisplayAsset != null) {
                                    if (data.entries[i].newDisplayAsset.materialInstances != null) {
                                        img_src = data.entries[i].newDisplayAsset.materialInstances[0].images.Background;
                                    }
                                }

                                if (data.entries[i].banner !== null) {
                                    let banner_object = document.createElement('i');
                                    banner_object.classList.add('item-banner');
                                    banner_object.innerHTML = data.entries[i].banner.value;
                                    banner_object.setAttribute('intensity', data.entries[i].banner.intensity);
                                    parent.appendChild(banner_object);
                                }
                            } else {
                                price.innerHTML = 'From ' + firstItem.name;
                                marqueeCheck(price);
                            }
    
                            img_obj.src = img_src;
                            img_obj.setAttribute("title", item_obj.name + ' for ' + data.entries[i].finalPrice + ' VBucks');
                            img_obj.setAttribute('otype', item_obj.type.value);

                            ic.appendChild(img_obj);
                            obj.append(ic);
    
                            obj.addEventListener("click", function() {
                                window.location.href = 'item.html?q=' + item_obj.name.toLowerCase();
                            });

                            parent.appendChild(obj);
    
                            section_c.append(parent);
                        }
                    }
                }
            }

            for (const obj of registeredSections) {
                var item_count = document.createElement('a');
                item_count.innerHTML = document.getElementsByName(obj)[0].children.length + ' items';
                item_count.classList.add('items-count');

                document.getElementById('title_' + obj).append(item_count);
            }
        }
    })
}