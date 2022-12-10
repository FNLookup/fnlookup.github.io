function i() {
    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('nav-elements').classList.toggle('hidden-media');
    });

    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            doSearch();
        }
    });

    document.getElementById('search-button').addEventListener('click', function() {
        doSearch();
    });
}

function doSearch() {
    var searchQuery = document.getElementById('search-input').value;

    if (searchQuery === '' || searchQuery === null) {
        return;
    }

    window.location.href = 'item.html?q=' + searchQuery;
}

function addToList() {
    var sections = [];
    fetch('https://fortnite-api.com/v2/shop/br').then(response => response.json()).then(response => {
        for (var i = 0; i < response.data.specialFeatured.entries.length; i++) {
            var item = response.data.specialFeatured.entries[i];
            var section = item.section.name;

            if (!sections.includes(section)) 
                sections.push(section);
        }

        for (let sec of sections) {
            var ob = document.createElement('option');
            ob.innerHTML = sec;
            document.getElementById("shop-section-dropdown").append(ob);
        }
    });
}

function secsToDays(secs) {
    return Math.ceil(secs / (1000 * 3600 * 24));
}

function sameDay(a, b) {
    return a.getDay() === b.getDay() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}


function getFormatDate(date) {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    return weekDays[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function dateNow() {
    document.getElementById('date').innerHTML = getFormatDate(new Date());
}

function iS() {
    // This number can modify the results DRASTICALLY
    // Cannot be negative because it will not do anything
    // If very low, it can show item shop items AND
    // Items that have appeared the same number of average days ago
        var fallbackDays = 5;

    fetch('https://fortnite-api.com/v2/cosmetics/br').then(response => response.json()).then(response => {
        for (let i = 0; i < response.data.length; i++) {
            var item = response.data[i];

            if (item.shopHistory != null) {
                if (item.shopHistory.length > 1) {
                    var days = [];

                    for (let h = 0; h < item.shopHistory.length; h++) {

                        if (h > 0) {
                            var l = item.shopHistory[h - 1].split('T')[0];
                            var t = item.shopHistory[h].split('T')[0];

                            var lastDate = new Date(l);
                            var thisDate = new Date(t);

                            let difference = thisDate.getTime() - lastDate.getTime();
                            let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
                            days.push(totalDays);
                        }
                    }

                    var total = 0;
                    var average = 0;
                    for (let object of days) {
                        total += object;
                    }

                    average = Math.floor(total / days.length);
                    
                    var la = item.shopHistory[item.shopHistory.length - 1].split('T')[0];
                    var lastAppearance = new Date(la);
                    var today = new Date();

                    var prevTime = secsToDays(lastAppearance.getTime()) + average;
                    var todayTime = secsToDays(today.getTime()) - fallbackDays;
                    var todayNegTime = secsToDays(today.getTime()) + fallbackDays;

                    var sinceLast = secsToDays(today.getTime() - lastAppearance.getTime())
                    
                    if (prevTime < todayNegTime && prevTime > todayTime &&
                        sameDay(lastAppearance, today) === false) {
                        console.log(item.name + ' (days since last: ' + sinceLast + ', average: ' + average + ')');
                    }
                }
            }
        }
    });

    fetch('https://fortnite-api.com/v2/shop/br').then(response => response.json()).then(response => {
        var dropdown_list = document.getElementById("shop-section-dropdown");
        var section = dropdown_list.value;

        var section_data;

        var shop_row = document.getElementById("item-shop-section");
        while (shop_row.firstChild)
        shop_row.removeChild(shop_row.firstChild);

        if (section === 'Daily')
            section_data = response.data.daily;
        else if (section === 'Featured')
            section_data = response.data.featured;
        else
            section_data = response.data.specialFeatured;

        for (let i = 0; i < section_data.entries.length; i++) {
            const entry = section_data.entries[i];
            if (entry.section.name === section) {
                const items = section_data.entries[i].items;
                const bundle  = section_data.entries[i].bundle;
                
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
                    price.innerHTML += section_data.entries[i].finalPrice;
                    price.classList.add('item-price');

                    hold.appendChild(title);
                    hold.appendChild(price);

                    obj.appendChild(hold);

                    var img_obj = document.createElement("img");
                    var img_src;

                    img_obj.src = bundle.image;
                    img_obj.setAttribute("title", bundle.name + ' for ' + section_data.entries[i].finalPrice + ' VBucks');
                    obj.appendChild(img_obj);

                    shop_row.append(obj);
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
                        price.innerHTML += section_data.entries[i].finalPrice;
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
                        img_obj.setAttribute("title", item_obj.name + ' for ' + section_data.entries[i].finalPrice + ' VBucks');
                        obj.appendChild(img_obj);

                        obj.addEventListener("click", function() {
                            window.location.href = 'item.html?q=' + item_obj.name.toLowerCase();
                        });

                        shop_row.append(obj);
                    }
                }
            }
        }


    });
}