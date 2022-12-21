function gne(e) {
    return document.createElement(e);
}

function i() {
    //<!--Edit these for future seasons!-->
    
    let videoSrcs = [
        "https://cdn2.unrealengine.com/221132-fnbr-c4s1-overview-gameplay-webheader-8daef2587fae.mp4",
        "https://cdn2.unrealengine.com/221132-fnbr-c4s1-overview-gameplay-webheader-cf439b66d2a9.webm"
    ];

    let vid = document.getElementById("fn-video");
    for (let src of videoSrcs) {
        let i = document.createElement("source");
        i.src = src;

        vid.append(i);
    }

    window.addEventListener("resize", function() {
        let w = document.body.clientWidth;
        vid.style.width = w + 'px';
    });

    let list = document.getElementById("nav-items");

    let nav_items = [
        {
            name: 'Fortnite',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'battle-pass.html',
                    name: 'Battle Pass'
                },
                {
                    href: 'stats.html',
                    name: 'Player Stats',
                },
                {
                    href: 'map.html',
                    name: 'Map'
                },
                {
                    href: 'progress.html',
                    name: 'Season Progress'
                },
                {
                    href: 'news.html',
                    name: 'In-game News'
                },
                {
                    href: 'augments.html',
                    name: 'Reality Augments'
                },
                {
                    href: 'seasons.html',
                    name: 'Seasons'
                },
                {
                    href: 'twitch-drops.html',
                    name: 'Twitch Drops'
                }
            ]
        },
        {
            name: 'Cosmetics',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'new-cosmetics.html',
                    name: 'Newest added',
                },
                {
                    href: 'search.html',
                    name: 'Search'
                }
            ]
        },
        {
            name: 'Item Shop',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'item-shop.html',
                    name: 'Current Item Shop',
                },
                {
                    href: 'predictions.html',
                    name: 'Predictions'
                }
            ]
        },
        {
            name: 'About',
            alone: true,
            href: 'https://github.com/tposejank/fnlookup/blob/main/README.md'
        }
    ]

    for (let nav_option of nav_items) {
        if (nav_option.href !== null && nav_option.alone) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.classList.add('nav-item');
            a.innerHTML = nav_option.name + ' ';
            a.href = nav_option.href;
            li.append(a);

            list.append(li);
        } else {
            let container = document.createElement('div');
            container.classList.add('nav-item');
            
            let a = document.createElement('a');
            a.innerHTML = nav_option.name + ' ';
            container.append(a);

            a.addEventListener('click', function() {
                container.classList.toggle('toggled');
            });

            if (nav_option.hasArrow) {
                let arrow = document.createElement('i');
                arrow.classList.add('arrow');
                container.appendChild(arrow);
            }

            let create_list = document.createElement('ul');
            create_list.classList.add('nav-dropdown-menu');

            container.appendChild(create_list);
            let li = document.createElement('li');
            li.append(container);

            list.append(li);

            for (let item of nav_option.dropdownContent) {
                let item_context = document.createElement('li');
                item_context.classList.add('dropdown-item');

                create_list.appendChild(item_context);

                let context = document.createElement('a');
                if (item.href !== null) {
                    context.href = item.href;
                }
                context.innerHTML = item.name;
                
                item_context.appendChild(context);
            }
        }
    }

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
    fetch(geturllang('https://fortnite-api.com/v2/shop/br', 0)).then(response => response.json()).then(response => {
        sections.push(response.data.daily.entries[0].section.name);
        sections.push(response.data.featured.entries[0].section.name);

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
    fetch(geturllang('https://fortnite-api.com/v2/shop/br', 0)).then(response => response.json()).then(response => {
        var dropdown_list = document.getElementById("shop-section-dropdown");
        var section = dropdown_list.value;

        var section_data;

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
                    let b = document.createElement('div');
                    b.classList.add('item-card-parent');

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

                    let ic = document.createElement('div');
                    ic.classList.add("item-image");

                    var img_obj = document.createElement("img");
                    var img_src;

                    img_obj.src = bundle.image;
                    img_obj.setAttribute("title", bundle.name + ' for ' + section_data.entries[i].finalPrice + ' VBucks');
                    ic.appendChild(img_obj);

                    obj.appendChild(ic);

                    b.append(obj);

                    shop_row.append(b);
                } else {
                    for (let j = 0; j < items.length; j++) {
                        let b = document.createElement('div');
                        b.classList.add('item-card-parent');

                        const item_obj = items[j];

                        var obj = document.createElement("div");
                        obj.classList.add("item-card");
                        obj.setAttribute('data-rarity', item_obj.rarity.value);

                        var hold = document.createElement("div");
                        hold.classList.add("item-info");
    
                        var title = document.createElement('span');
                        title.innerHTML = item_obj.name;
                        title.classList.add("item-title");
    
                        hold.appendChild(title);
                        obj.appendChild(hold);

                        var img_obj = document.createElement("img");
                        var img_src;

                        if (item_obj.images.featured != null)
                            img_src = item_obj.images.featured;
                        else if (item_obj.images.icon != null)
                            img_src = item_obj.images.icon;
                        else if (item_obj.images.smallIcon != null)
                            img_src = item_obj.images.smallIcon;

                        let ic = document.createElement('div');
                        ic.classList.add("item-image");
                        
                        img_obj.src = img_src;
                        img_obj.setAttribute("title", item_obj.name + ' for ' + section_data.entries[i].finalPrice + ' VBucks');
                        ic.appendChild(img_obj);

                        obj.append(ic);

                        obj.addEventListener("click", function() {
                            window.location.href = 'item.html?q=' + item_obj.name.toLowerCase();
                        });

                        b.append(obj);

                        shop_row.append(b);
                    }
                }
            }

            for (let k = 0; k < shop_row.children.length; k++) {
                let child = shop_row.children[k];
                if (k >= 8) {
                    shop_row.removeChild(child);
                }
            }
        }
    })
}

function marqueeCheck(obj) {
    let text = obj.textContent;

    let fullUppercase = text.toUpperCase() == text;

    if (obj.textContent.length >= 20 && !fullUppercase) {
        obj.classList.add('marquee');
    } else if (obj.textContent.length >= 15 && fullUppercase) {
        obj.classList.add('marquee');
    }
}