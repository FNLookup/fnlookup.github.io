function gne(e) {
    return document.createElement(e);
}

function clearChildren(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
}

function calcDays(v) {
    return v / (1000 * 3600 * 24)
}

function trueRound(value, digits){
    return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
}

function cero(integer) {
    return integer < 10 ? '0' + integer : integer
}

function i() {
    document.getElementsByClassName('nav-container')[0].innerHTML = `
        <div class="navbar-top" id="main-nav">
            <a class="navbar-button no-link">
                <img class="menu-toggle" id="menu-btn" src="assets/icons/xbox-menu.png" title="Menu">
            </a>
            <a href="new-menu.html" class="navbar-button no-link">
                <img class="services" src="assets/images/menu.svg" title="Services">
            </a>
            <a href="island.html" class="navbar-button no-link">
                <img class="creative-discovery" src="assets/images/lupa.svg" title="Search">
            </a>
            <a href="index.html" class="navbar-button no-link mini-logo-container">
                <img class="mini-logo" src="assets/logo-maxres.png" title="FNLookup">
            </a>
            <a href="index.html" class="nav-logo">FNLookup</a>
            <div class="nav-buttons-items">
                <a href="index.html" class="navbar-button no-link">HOME</a>
                <a href="search.html" class="navbar-button no-link">ITEMS</a>
                <a href="item-shop.html" class="navbar-button no-link">ITEM SHOP</a>
                <a href="battle-pass.html" class="navbar-button no-link">BATTLE PASS</a>
                <a href="challenges.html" class="navbar-button no-link">QUESTS</a>
                <a href="tournaments.html" class="navbar-button no-link">COMPETE</a>
                <a href="achievements.html" class="navbar-button no-link">CARREER</a>
                <a href="item-shop.html" class="navbar-button no-link">V-BUCKS</a>
            </div>
        </div>`;

    document.getElementById('menu-btn').addEventListener('click', function() {
        //document.getElementById('nav-elements').classList.toggle('hidden-nav');
        document.getElementById('main-nav').classList.toggle('hidden-nav');
    });

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
}

function doSearch() {
    var searchQuery = document.getElementById('search-input').value;

    if (searchQuery === '' || searchQuery === null) {
        return;
    }

    openItem(searchQuery);
}

function openItem(q) {
    console.log('Browsing item: ' + q);
    window.location.href = 'item.html?q=' + q;
}

function openItemByID(id) {
    console.log('Browsing item (by ID): ' + id);
    window.location.href = 'item.html?id=' + id;
}

function getItemLink(q) {
    return 'item.html?q=' + q;
}

function getItemLinkByID(id) {
    return 'item.html?id=' + id;
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

function marqueeCheck(obj) {
    let text = obj.textContent;

    let fullUppercase = text.toUpperCase() == text;

    if (obj.textContent.length >= 20 && !fullUppercase) {
        obj.classList.add('marquee');
    } else if (obj.textContent.length >= 15 && fullUppercase) {
        obj.classList.add('marquee');
    }
}

function payloadTriggered() {
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = 'css/payload.css';
    document.head.append(styleSheet);
}

function christmasPayload(christmas) {
    let delay = christmas ? 300 : 600;
    setInterval(function() {
        // Imported from local education website. Undisclosed.
        const snow = document.createElement("div");
        snow.innerHTML = "<img src='assets/images/snowflake.svg'>";
        snow.classList.add("snow");
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = Math.random() * 5 + 8 + "s";
        document.body.appendChild(snow);
        setTimeout(() => { snow.remove(); }, 7000);
    }, delay);
}

function newYearPayloads() {
    setInterval(function() {
        for(let o in [0,1,2]) {
            const firework = document.createElement("div");
            firework.innerHTML = "<img src='assets/images/firework.png'>";
            firework.classList.add("firework");
            firework.style.left = Math.random() * 100 + "vw";
            firework.style.top = Math.random() * 50 + "vh";
            document.getElementsByClassName('fn-dot-mask')[0].append(firework);
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }, 500);
}

loadPayloads();
function loadPayloads() {
    var now = new Date();
    var anyPayloadTriggered = false;

    // 1st payload: Christmas and new years eve

    let distances = [0, 0];
    var lastYear = new Date(now.getFullYear() - 1, 11, 31);
    var thisYear = new Date(now.getFullYear(), 11, 31);
    distances[0] =  Math.floor(calcDays(now.getTime() - lastYear.getTime()))
    distances[1] = Math.abs(Math.floor(calcDays(now.getTime() - thisYear.getTime())))
    
    if (distances[0] <= 10 || distances[1] <= 10) {
        const christmas = sameDay(now, new Date(now.getFullYear(), 12, 25))
        christmasPayload(christmas);
        anyPayloadTriggered = true;
    }

    // 2nd payload: new years

    if (sameDay(now, new Date(now.getFullYear(), 11, 31))) {
        newYearPayloads();
        anyPayloadTriggered = true;
    }

    if (anyPayloadTriggered) {
        payloadTriggered();
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
