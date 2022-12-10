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

    // Display the result in the element with id="demo"
    document.getElementById("item-timer").innerHTML = hours + "h " +
        minutes + "m " + seconds + "s";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        var secondsUntilRefresh = 5;
        document.title = "Item shop refreshed!";
        document.getElementById("item-timer").innerHTML = "Auto-refresh: 5s";
        var y = setInterval(function() {
            secondsUntilRefresh -= 1;
            if (secondsUntilRefresh == 0) {
                document.location.reload();
            }
            document.getElementById("item-timer").innerHTML = "Auto-refresh: " + secondsUntilRefresh + "s";
        }, 1000);
    }
}, 1000);

function createItems() {
    fetch("https://fortnite-api.com/v2/shop/br").then(response=>response.json()).then(response=>{
        console.log(response);

        var sections = [
            {
                data: response.data.daily,
                name: 'Daily',
                sorted: false
            },
            {
                data: response.data.featured,
                name: 'Featured',
                sorted: false
            },
            {
                data: response.data.specialFeatured,
                sorted: true
            }
        ]

        var shop_items = document.getElementById("shop-container");
        
        for (let h = 0; h < sections.length; h++) {
            var data = sections[h].data;

            if (sections[h].sorted === false) {
                var section_title = document.createElement('h1');
                section_title.innerHTML = sections[h].name; 
                section_title.classList.add('flex-center');
                section_title.classList.add('shop-section-title');
                section_title.id = 'title_' + sections[h].name;

                var section_container = document.createElement('div');
                section_container.classList.add("shop-items-display");
    
                shop_items.append(section_title);
                shop_items.append(section_container);
                
                for (let i = 0; i < data.entries.length; i++) {
                    const items = data.entries[i].items;
                    const bundle  = data.entries[i].bundle;
                    
                    if (bundle !== null) {
                        const item_obj = items[0];
    
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
    
                        price.appendChild(vbuck);
                        price.innerHTML += data.entries[i].finalPrice;
                        price.classList.add('item-price');
    
                        hold.appendChild(title);
                        hold.appendChild(price);
    
                        obj.appendChild(hold);
    
                        var img_obj = document.createElement("img");
                        var img_src;
    
                        img_obj.src = bundle.image;
                        img_obj.setAttribute("title", bundle.name);
                        obj.appendChild(img_obj);
    
                        section_container.append(obj);
                    } else {
                        for (let j = 0; j < items.length; j++) {
                            const item_obj = items[j];
    
                            var obj = document.createElement("div");
                            obj.classList.add("item-card");
                            obj.setAttribute('data-rarity', item_obj.rarity.value);
    
                            var hold = document.createElement("div");
                            hold.classList.add("item-info");
    
                            var title = document.createElement('span');
                            title.innerHTML = item_obj.name;
                            title.classList.add("item-title");
    
                            var price = document.createElement('a');
                            var vbuck = document.createElement('img');
                            vbuck.src = response.data.vbuckIcon;
                            vbuck.classList.add("vbuck-icon");
    
                            price.appendChild(vbuck);
                            price.innerHTML += data.entries[i].finalPrice;
                            price.classList.add('item-price');
    
                            hold.appendChild(title);
                            hold.appendChild(price);
    
                            obj.appendChild(hold);
    
                            var img_obj = document.createElement("img");
                            var img_src;
    
                            if (item_obj.images.featured != null)
                                img_src = item_obj.images.featured;
                            else if (item_obj.images.icon != null)
                                img_src = item_obj.images.icon;
                            else if (item_obj.images.smallIcon != null)
                                img_src = item_obj.images.smallIcon;
    
                            img_obj.src = img_src;
                            img_obj.setAttribute("title", item_obj.name);
                            obj.appendChild(img_obj);
    
                            section_container.append(obj);
                        }
                    }

                    if (i === data.entries.length - 1) {
                        var item_count = document.createElement('a');
                        item_count.innerHTML = section_container.children.length + ' items';
                        item_count.classList.add('items-count');

                        document.getElementById('title_' + sections[h].name).append(item_count);
                    }
                }
            } else {
                var registeredSections = [];
                var sections = [];

                for (let i = 0; i < data.entries.length; i++) {
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
    
                        price.appendChild(vbuck);
                        price.innerHTML += data.entries[i].finalPrice;
                        price.classList.add('item-price');
    
                        hold.appendChild(title);
                        hold.appendChild(price);
    
                        obj.appendChild(hold);
    
                        var img_obj = document.createElement("img");
                        var img_src;
    
                        img_obj.src = bundle.image;
                        img_obj.setAttribute("title", bundle.name);
                        obj.appendChild(img_obj);
    
                        section_c.append(obj);
                    } else {
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
    
                            var obj = document.createElement("div");
                            obj.classList.add("item-card");
                            obj.setAttribute('data-rarity', item_obj.rarity.value);
    
                            var hold = document.createElement("div");
                            hold.classList.add("item-info");
    
                            var title = document.createElement('span');
                            title.innerHTML = item_obj.name;
                            title.classList.add("item-title");
    
                            var price = document.createElement('a');
                            var vbuck = document.createElement('img');
                            vbuck.src = response.data.vbuckIcon;
                            vbuck.classList.add("vbuck-icon");
    
                            price.appendChild(vbuck);
                            price.innerHTML += data.entries[i].finalPrice;
                            price.classList.add('item-price');
    
                            hold.appendChild(title);
                            hold.appendChild(price);
    
                            obj.appendChild(hold);
    
                            var img_obj = document.createElement("img");
                            var img_src;
    
                            if (item_obj.images.featured != null)
                                img_src = item_obj.images.featured;
                            else if (item_obj.images.icon != null)
                                img_src = item_obj.images.icon;
                            else if (item_obj.images.smallIcon != null)
                                img_src = item_obj.images.smallIcon;
    
                            img_obj.src = img_src;
                            img_obj.setAttribute("title", item_obj.name);
                            obj.appendChild(img_obj);
    
                            section_c.append(obj);
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
        }
    })
}