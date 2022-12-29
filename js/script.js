function gne(e) {
    return document.createElement(e);
}

function clearChildren(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
}

function calcDays(v) {
    return v / (1000 * 3600 * 24)
}

function i() {

    let vid = document.getElementById("fn-video");
    
    fetch(geturllang('https://fortniteapi.io/v2/battlepass?season=current', 1), {
        headers: { 'Authorization': localStorage.keyFNAPIIo }
    }).then(r => r.json()).then(r => {
        for (let src of r.videos) {
            let i = document.createElement("source");
            i.src = src.url;
            vid.append(i);
        }

        vid.muted = true;
        vid.style.width = document.body.clientWidth + 'px';
        window.addEventListener("resize", function() {
            vid.style.width = document.body.clientWidth + 'px';
        });
    }).catch(err => { console.error(err); });

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
                    href: 'map.html',
                    name: 'Map'
                },
                {
                    href: 'challenges.html',
                    name: 'Challenges',
                },
                {
                    href: 'progress.html',
                    name: 'Season Progress'
                },
                {
                    href: 'augments.html',
                    name: 'Reality Augments'
                },
                {
                    href: 'weapons.html',
                    name: 'Loot/Weapons'
                },
                {
                    href: 'vehicles.html',
                    name: 'Vehicles'
                }
            ]
        },
        {
            name: 'Extras',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'stats.html',
                    name: 'Player Stats',
                },
                {
                    href: 'seasons.html',
                    name: 'Seasons'
                },
                {
                    href: 'twitch-drops.html',
                    name: 'Twitch Drops'
                },
                {
                    href: 'crew-pack.html',
                    name: 'Fortnite Crew'
                },
                {
                    href: 'achievements.html',
                    name: 'Achievements'
                },
                {
                    href: 'tournaments.html',
                    name: 'Competitive'
                },
                {
                    href: 'news.html',
                    name: 'In-game News'
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
                },
                {
                    href: 'random-cosmetics.html',
                    name: 'Locker Generator'
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
            href: 'about.html'
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

    let translatorIcon = document.createElement('a', 'flex', 'flex-center');
    translatorIcon.href = 'language-picker.html';
    translatorIcon.title = 'Language Picker';
    translatorIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><g><path d="M11.99,1.98C6.46,1.98,1.98,6.47,1.98,12s4.48,10.02,10.01,10.02c5.54,0,10.03-4.49,10.03-10.02S17.53,1.98,11.99,1.98z M8.86,14.5c-0.16-0.82-0.25-1.65-0.25-2.5c0-0.87,0.09-1.72,0.26-2.55h6.27c0.17,0.83,0.26,1.68,0.26,2.55 c0,0.85-0.09,1.68-0.25,2.5H8.86z M14.89,15.5c-0.54,1.89-1.52,3.64-2.89,5.15c-1.37-1.5-2.35-3.25-2.89-5.15H14.89z M9.12,8.45 c0.54-1.87,1.52-3.61,2.88-5.1c1.36,1.49,2.34,3.22,2.88,5.1H9.12z M16.15,9.45h4.5c0.24,0.81,0.37,1.66,0.37,2.55 c0,0.87-0.13,1.71-0.36,2.5h-4.51c0.15-0.82,0.24-1.65,0.24-2.5C16.39,11.13,16.3,10.28,16.15,9.45z M20.29,8.45h-4.38 c-0.53-1.97-1.47-3.81-2.83-5.4C16.33,3.45,19.04,5.56,20.29,8.45z M10.92,3.05c-1.35,1.59-2.3,3.43-2.83,5.4H3.71 C4.95,5.55,7.67,3.44,10.92,3.05z M3.35,9.45h4.5C7.7,10.28,7.61,11.13,7.61,12c0,0.85,0.09,1.68,0.24,2.5H3.34 c-0.23-0.79-0.36-1.63-0.36-2.5C2.98,11.11,3.11,10.26,3.35,9.45z M3.69,15.5h4.39c0.52,1.99,1.48,3.85,2.84,5.45 C7.65,20.56,4.92,18.42,3.69,15.5z M13.09,20.95c1.36-1.6,2.32-3.46,2.84-5.45h4.39C19.08,18.42,16.35,20.55,13.09,20.95z" stroke="white"></path></g></svg>';
    // https://www.youtube.com
    translatorIcon.classList.add('multilingual-btn');

    let languages = [
        {
            name: 'English',
            title: 'English',
            backend: 'en'
        },
        {
            name: 'العربية',
            title: 'Arabic',
            backend: 'ar'
        },
        {
            name: 'Deutsch',
            title: 'German',
            backend: 'de'
        },
        {
            name: 'Español',
            title: 'Spanish',
            backend: 'es'
        },
        {
            name: 'Español (Latinoamérica)',
            title: 'Spanish (Latin American)',
            backend: 'es-419'
        },
        {
            name: 'Français',
            title: 'French',
            backend: 'fr'
        },
        {
            name: 'Italiano',
            title: 'Italian',
            backend: 'it'
        },
        {
            name: '日本',
            title: 'Japanese',
            backend: 'ja'
        },
        {
            name: '한국인',
            title: 'Korean',
            backend: 'ko'
        },
        {
            name: 'Polski',
            title: 'Polish',
            backend: 'pl'
        },
        {
            name: 'Português (Brasil)',
            title: 'Portuguese (Brazilian)',
            backend: 'pt-BR'
        },
        {
            name: 'Русский',
            title: 'Russian',
            backend: 'ru'
        },
        {
            name: 'Türkçe',
            title: 'Turkish',
            backend: 'tr'
        },
        {
            name: '中國人 (简化的) (弃用)',
            title: 'Chinese (Simplified) (Deprecated)',
            backend: 'zh-CN'
        },
        {
            name: '中国人 (傳統的) (棄用)',
            title: 'Chinese (Traditional) (Deprecated)',
            backend: 'zh-Hant'
        }
    ];
    window.uiLangList = languages;

    let langs = gne('div');
    langs.classList.add('nav-item');

    translatorIcon.addEventListener('click', function() {
        langs.classList.toggle('toggled');
    });

    langs.append(translatorIcon);

    let langList = document.createElement('ul');
    langList.classList.add('nav-dropdown-menu', 'right-dmenu', 'language-dropdown');

    langs.append(langList);

    for (let language of languages) {
        let item_context = document.createElement('li');
        item_context.classList.add('dropdown-item');

        langList.appendChild(item_context);

        let context = document.createElement('a');
        context.innerHTML = language.name;
        context.title = language.title;
        context.setAttribute('backend-value', language.backend);
        context.classList.add('link-underline', 'pointer');

        if (localStorage.requestLanguage == language.backend) {
            context.style.textDecoration = 'underline';
            context.style.color = 'var(--season-accent-1)'
        }

        context.addEventListener('click', function() {
            switchLanguage(context.getAttribute('backend-value'));
        });
        
        item_context.appendChild(context);
    }

    document.getElementsByClassName('item-search-container')[0].append(langs);
}

function doSearch() {
    var searchQuery = document.getElementById('search-input').value;

    if (searchQuery === '' || searchQuery === null) {
        return;
    }

    window.location.href = 'item.html?q=' + searchQuery;
}

function secsToDays(secs) {
    return Math.ceil(secs / (1000 * 3600 * 24));
}

function sameDay(a, b) {
    return a.getDay() === b.getDay() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function sameDayUTC(day, now) {
    var theday = [ day.getUTCDate(),
        day.getUTCMonth(),
        day.getUTCFullYear() ];
    var today = [ now.getUTCDate(),
        now.getUTCMonth(),
        now.getUTCFullYear() ];

    return theday[0] == today[0] &&
    theday[1] == today[1] &&
    theday[2] == today[2];
}


function getFormatDate(date) {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    return weekDays[date.getUTCDay()] + ', ' + months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
}

function dateNow() {
    document.getElementById('date').innerHTML = getFormatDate(new Date());
}

function addToList() {
    sections = [];
    fetch(geturllang("https://fortniteapi.io/v2/shop", 1), {
        headers: { 'Authorization': localStorage.keyFNAPIIo}
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

function marqueeCheck(obj) {
    let text = obj.textContent;

    let fullUppercase = text.toUpperCase() == text;

    if (obj.textContent.length >= 20 && !fullUppercase) {
        obj.classList.add('marquee');
    } else if (obj.textContent.length >= 15 && fullUppercase) {
        obj.classList.add('marquee');
    }
}

function iS() {
    var section = document.getElementById("shop-section-dropdown").value;

    var shop_row = document.getElementById("item-shop-section");
    clearChildren(shop_row);

    var sectionItems = [];
    for (let item of shopItems) {
        if (item.section.name == section) sectionItems.push(item);
    }

    for (let i=0; i<sectionItems.length;i++) {
        let item = sectionItems[i];

        makeCard(item);
    }
}

function makeCard(item) {
    var shop_row = document.getElementById("item-shop-section");

    let parent = document.createElement('div');
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
        obj.addEventListener("click", function() {
            window.location.href = 'item.html?q=' + item.displayName.toLowerCase();
        });
    }
    if (item.href !== undefined) {
        obj.addEventListener("click", function() {
            window.location.href = item.href;
        });
    }

    if (item.backgroundColors !== undefined) {
        let colorStr = item.backgroundColors.join(',');

        obj.style.background = 'radial-gradient(' + colorStr + ')';
    }

    parent.appendChild(obj);

    shop_row.append(parent);
}

function newYearPayloads(christmas) {
    let delay = christmas ? 300 : 600;
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = 'css/snowflakes.css';
    document.head.append(styleSheet);
    setInterval(function() {
        // Imported from local education website. Undisclosed.
        const snow = document.createElement("div");
        snow.innerHTML = "<img src='assets/images/snowflake.svg'>";
        snow.classList.add("snow");
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = Math.random() * 5 + 8 + "s";
        //document.getElementsByClassName('fn-dot-mask')[0].append(snow);
        document.body.appendChild(snow);
        setTimeout(() => { snow.remove(); }, 7000);
    }, delay);
}

loadPayloads();
function loadPayloads() {
    let distances = [0, 0];
    var now = new Date();
    var lastYear = new Date(now.getFullYear() - 1, 11, 31);
    var thisYear = new Date(now.getFullYear(), 11, 31);
    distances[0] =  Math.floor(calcDays(now.getTime() - lastYear.getTime()))
    distances[1] = Math.abs(Math.floor(calcDays(now.getTime() - thisYear.getTime())))
    
    if (distances[0] <= 10 || distances[1] <= 10) {
        const christmas = sameDay(now, new Date(now.getFullYear(), 12, 25))
        newYearPayloads(christmas);
    }
}
