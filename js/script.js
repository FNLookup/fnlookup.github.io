function gne(e) {
    return document.createElement(e);
}

function clearChildren(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
}

function calcDays(v) {
    return v / (1000 * 3600 * 24)
}

function trueRound(value, digits) {
    return (Math.round((value * Math.pow(10, digits)).toFixed(digits - 1)) / Math.pow(10, digits)).toFixed(digits);
}

function cero(integer) {
    return integer < 10 ? '0' + integer : integer
}

function i() {
    document.getElementsByClassName('nav-container')[0].innerHTML = `
        <div class="navbar-top" id="main-nav">
            <a class="navbar-button fortnite-button-border no-link">
                <img class="menu-toggle" id="menu-btn" src="/assets/icons/xbox-menu.png" title="Menu">
            </a>
            <a href="/services/" class="navbar-button fortnite-button-border no-link">
                <img class="services" src="/assets/images/menu.svg" title="Services">
            </a>
            <a href="/island.html" class="navbar-button fortnite-button-border no-link">
                <img class="creative-discovery" src="/assets/images/lupa.svg" title="Search">
            </a>
            <a href="/" class="navbar-button no-link fortnite-button-border mini-logo-container">
                <img class="mini-logo" src="/assets/logo_nobg.png" title="FNLookup">
            </a>
            <a href="/" class="nav-logo">FNLookup</a>
            <div class="nav-buttons-items">
                <a href="/account/" class="navbar-button fortnite-button-border no-link" tkey="nav:account">ACCOUNT</a>
                <a href="/items/" class="navbar-button fortnite-button-border no-link" tkey="nav:items">ITEMS</a>
                <a href="/items/shop/" class="navbar-button fortnite-button-border no-link" tkey="nav:item-shop">ITEM SHOP</a>
                <a href="/battle-pass/" class="navbar-button fortnite-button-border no-link" tkey="nav:battle-pass">BATTLE PASS</a>
                <a href="/challenges/" class="navbar-button fortnite-button-border no-link" tkey="nav:quests">QUESTS</a>
                <a href="/events/" class="navbar-button fortnite-button-border no-link" tkey="nav:compete">COMPETE</a>
                ${(localStorage.accountId !== undefined ? '<a href="/statistics/" class="navbar-button fortnite-button-border no-link" tkey="nav:stats">STATS</a>' : '')}
            </div>
        </div>
        <div class="navigation">
            <div class="navigation-part" id="navigation-1">
                <a class="part-button"><img src="/assets/icons/home.png" class="navigation-icon"></a>
            </div>
            <div class="navigation-part" id="navigation-2">
                <a href="/broadcast/" class="part-button"><img src="/assets/icons/broadcast.png" class="navigation-icon"></a>
                ${(localStorage.popupVersion != '0.1' || localStorage.popupVersion == undefined ? `<popup>>>>> NEW! >>>> Broadcast and Festival Hub!</popup>` : '')}
            </div>
            <div class="navigation-part" id="navigation-3">
                <a href="/festival/" class="part-button"><img src="/assets/icons/guitar.webp" class="navigation-icon"></a>
            </div>
        </div>`;

    if (window.location.pathname !== '/' && history.length > 1) {
        let buttonOne = document.getElementById('navigation-1')
        buttonOne.children[0].children[0].src = '/assets/icons/back.png' //icon
        buttonOne.children[0].onclick = function() { // a
            history.back()
        }
    } else {
        document.getElementById('navigation-1').remove()
    }

    document.getElementById('menu-btn').addEventListener('click', function() {
        //document.getElementById('nav-elements').classList.toggle('hidden-nav');
        document.getElementById('main-nav').classList.toggle('hidden-nav');
    });

    let languages = [{
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

function getTranslationKey(key) {
    let translations = {
        "en": {
            "home:welcome_back": "Welcome Back",
            "home:your_ranked_stats": "Your Ranked Stats",
            "home:br": "Battle Royale",
            "home:zb": "Zero Build",
            "home:rr": "Ranked Racing",

            "home:not_linked": "You haven't linked an account yet.",
            "home:link_account": "Link your account",

            "nav:account": "ACCOUNT",
            "nav:items": "ITEMS",
            "nav:item-shop": "ITEM SHOP",
            "nav:battle-pass": "BATTLE PASS",
            "nav:quests": "QUESTS",
            "nav:compete": "COMPETE",
            "nav:stats": "STATS",

            "navigation:home": "HOME",
            "navigation:back": "BACK",
            "navigation:broadcast": "BROADCAST",
            "navigation:notifications": "NOTIFICATIONS",

            "account:navigation_bar": "ACCOUNT",
            "account:page_name": "Account",
            "account:page": "Link or view your accounts",
            "account:current_account": "Current Account",
            "account:link_button": "LINK",
            "account:switch_button": "SWITCH ACCOUNT",
            "account:language": "Language",
            "account:change_language": "CHANGE LANGUAGE",
            "account:about_fnlookup": "About FNLookup",
            "account:about": "VIEW",
            "account:not_linked": "You haven't linked an account yet.",

            "account_change:your_accounts": "Your accounts",
            "account_change:add_another": "Add new account",
            "account_change:search": "Search",
            "account_change:reset_your_accounts": "Reset your accounts",
            "account_change:link_new": "Link your account",

            "language:language": "Language",
            "language:desc": "Change your display language."
        },
        "es-419": {
            "home:welcome_back": "Bienvenido de vuelta",
            "home:your_ranked_stats": "Tus estadísticas en Ranked",
            "home:br": "Battle Royale",
            "home:zb": "Sin construcción",
            "home:rr": "Ranked Racing",

            "home:not_linked": "Aún no has vinculado una cuenta.",
            "home:link_account": "Vincula tu cuenta",

            "nav:account": "CUENTA",
            "nav:items": "OBJETOS",
            "nav:item-shop": "TIENDA",
            "nav:battle-pass": "PASE DE BATALLA",
            "nav:quests": "MISIONES",
            "nav:compete": "COMPETIR",
            "nav:stats": "ESTADISTICAS",

            "navigation:home": "INICIO",
            "navigation:back": "ATRAS",
            "navigation:broadcast": "BROADCAST",
            "navigation:notifications": "NOTIFICACIONES",

            "account:navigation_bar": "CUENTA",
            "account:page_name": "Cuenta",
            "account:page": "Vincular o ver tus cuentas",
            "account:current_account": "CUENTA PRINCIPAL",
            "account:link_button": "VINCULAR",
            "account:switch_button": "CAMBIAR CUENTA",
            "account:language": "Idioma",
            "account:change_language": "CAMBIAR IDIOMA",
            "account:about_fnlookup": "Sobre FNLookup",
            "account:about": "VER",
            "account:not_linked": "Aún no has vinculado una cuenta.",

            "account_change:link_new": "Vincula tu cuenta",
            "account_change:your_accounts": "Tus cuentas",
            "account_change:add_another": "Añadir nueva cuenta",
            "account_change:search": "Buscar",
            "account_change:reset_your_accounts": "Restablecer tus cuentas",

            "language:language": "Idioma",
            "language:desc": "Cambia el idioma de visualización."
        },
    }

    let lang = localStorage.requestLanguage
    if (lang === 'es') lang = 'es-419' // Perdon espanioles oleEEEE
    return translations[lang][key]
}

function callTranslate() {
    let toTranslate = document.querySelectorAll('[tkey]')
    for (let element of toTranslate) {
        element.textContent = getTranslationKey(element.getAttribute('tkey'))
    }
}

function doSearch() {
    var searchQuery = document.getElementById('search-input').value;

    if (searchQuery === '' || searchQuery === null) {
        return;
    }

    openItem(searchQuery);
}

function openItemByID(id) { // From the prehistoric days of FNLookup
    window.location.href = getItemLinkByID(id);
}

function getItemLinkByID(id) {
    return '/items/view/?id=' + id;
}

function secsToDays(secs) {
    return Math.ceil(secs / (1000 * 3600 * 24));
}

function sameDay(a, b) {
    return a.getDay() === b.getDay() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function sameDayUTC(day, now) {
    var theday = [day.getUTCDate(),
        day.getUTCMonth(),
        day.getUTCFullYear()
    ];
    var today = [now.getUTCDate(),
        now.getUTCMonth(),
        now.getUTCFullYear()
    ];

    return theday[0] == today[0] &&
        theday[1] == today[1] &&
        theday[2] == today[2];
}


function getFormatDate(date, relative = false, justToday = false) {
    if (!relative) {
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        var currentDate = new Date();
        var currentYear = currentDate.getUTCFullYear();
        var currentMonth = currentDate.getUTCMonth();
        var currentDay = currentDate.getUTCDate();

        if (date.getUTCFullYear() === currentYear && date.getUTCMonth() === currentMonth && date.getUTCDate() === currentDay && justToday) {
            return "Today";
        } else if (date.getUTCFullYear() === currentYear) {
            return weekDays[date.getUTCDay()] + ', ' + months[date.getUTCMonth()] + ' ' + date.getUTCDate();
        } else {
            return weekDays[date.getUTCDay()] + ', ' + months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
        }
    } else {
        var currentDate = new Date();
        var currentYear = currentDate.getUTCFullYear();
        var currentMonth = currentDate.getUTCMonth();
        var currentDay = currentDate.getUTCDate();
        if (date.getUTCFullYear() === currentYear && date.getUTCMonth() === currentMonth && date.getUTCDate() === currentDay && justToday) {
            return "Today";
        }

        var units = {
            year: 24 * 60 * 60 * 1000 * 365,
            month: 24 * 60 * 60 * 1000 * 365 / 12,
            day: 24 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000
        }

        var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

        var getRelativeTime = (date, date2 = new Date()) => {
            var elapsed = date - date2

            // "Math.abs" accounts for both "past" & "future" scenarios
            for (var u in units)
                if (Math.abs(elapsed) > units[u] || u == 'second')
                    return rtf.format(Math.round(elapsed / units[u]), u)
        }

        return getRelativeTime(date)

        // stack overflow thx
    }
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
        snow.innerHTML = "<img src='/assets/images/snowflake.svg'>";
        snow.classList.add("snow");
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = Math.random() * 5 + 8 + "s";
        document.body.appendChild(snow);
        setTimeout(() => { snow.remove(); }, 7000);
    }, delay);
}

function newYearPayloads() {
    setInterval(function() {
        for (let o in [0, 1, 2]) {
            const firework = document.createElement("div");
            firework.innerHTML = "<img src='/assets/images/firework.png'>";
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
    distances[0] = Math.floor(calcDays(now.getTime() - lastYear.getTime()))
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

    for (let i = 0; i < sectionItems.length; i++) {
        let item = sectionItems[i];

        makeCard(item);
    }
}