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

function initializeNav() {
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
            <div class="nav-buttons-items">
                <a href="/account/" class="navbar-button fortnite-button-border no-link" tkey="nav:account">ACCOUNT</a>
                <a href="/items/" class="navbar-button fortnite-button-border no-link" tkey="nav:items">ITEMS</a>
                <a href="/items/shop/" class="navbar-button fortnite-button-border no-link" tkey="nav:item-shop">SHOP</a>
                <a href="/battle-pass/" class="navbar-button fortnite-button-border no-link" tkey="nav:battle-pass">BATTLE PASS</a>
                <a href="/challenges/" class="navbar-button fortnite-button-border no-link" tkey="nav:quests">QUESTS</a>
                <a href="/events/" class="navbar-button fortnite-button-border no-link" tkey="nav:compete">COMPETE</a>
                ${(localStorage.accountId !== null ? '<a href="/stats/" class="navbar-button fortnite-button-border no-link" tkey="nav:stats">STATS</a>' : '')}
            </div>
        </div>
        <div class="navigation">
            <div class="navigation-part" id="navigation-2">
                <a href="/broadcast/" class="part-button"><img src="/assets/icons/broadcast.png" class="navigation-icon"></a>
            </div>
            <div class="navigation-part" id="navigation-3">
                <a href="/festival/" class="part-button"><img src="/assets/icons/guitar.webp" class="navigation-icon"></a>
            </div>
            <div class="navigation-part" id="navigation-3">
                <a href="/encore/" class="part-button"><img src="https://raw.githubusercontent.com/Encore-Developers/Encore/main/Encore/Assets/encore_favicon-NEW.png" class="navigation-icon"></a>
                ${(localStorage.popupVersion != '0.3' || localStorage.popupVersion == undefined ? `<popup>IMPORTANT: Stats have been fixed! Sorry for the inconvenience!</popup>` : '')}
            </div>
        </div>`;

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
translations = {
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
        "nav:item-shop": "SHOP",
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
        "language:desc": "Change the display language.",

        "common:today": "today",
        "common:today-upper": "Today",
        "common:date-format": "[x0], [x1] [x2], [x3]",
        "common:date-format-no-year": "[x0], [x1] [x2]",
        "common:monday": "Monday",
        "common:tuesday": "Tuesday",
        "common:wednesday": "Wednesday",
        "common:thursday": "Thursday",
        "common:friday": "Friday",
        "common:saturday": "Saturday",
        "common:sunday": "Sunday",
        "common:january": "jan",
        "common:february": "feb",
        "common:march": "mar",
        "common:april": "apr",
        "common:may": "may",
        "common:june": "jun",
        "common:july": "jul",
        "common:august": "aug",
        "common:september": "sep",
        "common:october": "oct",
        "common:november": "nov",
        "common:december": "dec",

        "item:please-wait": "Please wait...",
        "item:searching-for": "Searching for [x0]",
        "item:released": "Released [x0]",
        "item:last-time-seen": "Last time seen [x0]",
        "item:seen": "Seen [x0] times",
        "item:wait": "Mean wait: [x0]d",
        "item:table-date": "Date",
        "item:table-days-since": "Days Since",
        "item:styles": "Styles",
        "item:gameplay-tags": "Gameplay Tags",
        "item:upcoming": "Upcoming",
        "item:copyright": "Copyrighted Audio",
        "item:reactive": "Reactive",
        "item:includes": "This item includes",
        "item:listen": "Listen",
        "item:granted": "Granted by",
        "item:builtin": "Built-In Emote",
        "item:not-found": "No items were found.",
        "item:not-found-or-error": "No items were found, or there was an error.",
        "item:help-search": "Are you looking for a cosmetic you don't know the name of? Go to [x0] and try again.",
        "item:search-page": "items",
        "item:no-params": "Looks like you specified no parameters!",
        "item:no-params-help": "It looks like you're looking for no items. Use search to view one, or click on one somewhere else.",
        "item:take-me-home": "Take me home",

        "search:search": "Search",
        "search:search-desc": "Search all available items in Fortnite.",
        "search:items": "Items",

        "search-filters:type": "Type",
        "search-filters:type-main": "Main",
        "search-filters:type-main-outfit": "Outfit",
        "search-filters:type-main-backbling": "Backbling",
        "search-filters:type-main-glider": "Glider",
        "search-filters:type-main-loadingscreen": "Loading Screen",
        "search-filters:type-main-pickaxe": "Pickaxe",
        "search-filters:type-main-style": "Style",
        "search-filters:type-main-contrail": "Contrail",
        "search-filters:type-main-music": "Music Pack",
        "search-filters:type-main-bundle": "Bundle",

        "search-filters:type-interacting": "Interacting",
        "search-filters:type-interacting-emote": "Emote",
        "search-filters:type-interacting-emoji": "Emoji",
        "search-filters:type-interacting-spray": "Spray",
        "search-filters:type-interacting-toy": "Toy",
        "search-filters:type-interacting-pet": "Pet",
        "search-filters:type-interacting-wrap": "Wrap",
        "search-filters:type-interacting-banner": "Banner",

        "search-filters:type-rr-vehicle": "Vehicle",
        "search-filters:type-rr-vehicle-skin": "Vehicle Skin",
        "search-filters:type-rr-vehicle-style": "Vehicle Style",
        "search-filters:type-rr-vehicle-trail": "Vehicle Trail",
        "search-filters:type-rr-wheel": "Wheel",
        "search-filters:type-rr-booster": "Booster FX",

        "search-filters:type-ff-bass": "Basses",
        "search-filters:type-ff-drum": "Drumkits",
        "search-filters:type-ff-lead": "Guitars",
        "search-filters:type-ff-keys": "Keyboards",
        "search-filters:type-ff-mics": "Microphones",
        "search-filters:type-ff-aura": "Aura",
        "search-filters:type-ff-jamtrack": "Jam Track",

        "search-filters:type-lf-kit": "LEGO® Kit",
        "search-filters:type-lf-dec": "Decor",

        "search-filters:type-additional": "Adittional",
        "search-filters:type-additional-battlebus": "Battle Bus",
        "search-filters:type-additional-itemaccess": "Item Access",

        "search-filters:rarityseries": "Rarity/Series",
        "search-filters:rarityseries-rarity": "Rarity",
        "search-filters:rarityseries-series": "Series",

        "search-filters:rarityseries": "Rareza/Serie",
        "search-filters:rarityseries-rarity": "Rareza",
        "search-filters:rarityseries-series": "Serie",

        "search-filters:introduction": "Introducción",
        "search-filters:introduction-chapter": "Capítulo [x0]",
        "search-filters:introduction-chapter-cs": "C[x0]T[x1]",

        "search-filters:delete-all": "Delete all",

        "quests:select": "Select a category",
        "quests:quests": "quests",
        "quests:unknown": "Unknown",
        "quests:view-more": "View more",
        "quests:to-do": "[x0] to do",
        "quests:no-reward": "No reward.",

        "shop:item-shop": "ITEM SHOP",
        "shop:jump": "JUMP TO CATEGORY",
        "shop:back": "BACK TO TOP",
        "shop:tooltip": "[x0] for [x1] V-Bucks",

        "instruments:drums": "Drums",
        "instruments:vocals": "Vocals",
        "instruments:guitar": "Guitar",
        "instruments:bass": "Bass",
        "instruments:probass": "Pro Bass",
        "instruments:proguitar": "Pro Guitar",
        "instruments:prodrums": "Pro Drums",

        "encore:all-charts": "All Charts",
        "encore:search-charts": "Search Charts",
        "encore:search": "Search",
        "encore-card:view-more": "View more",
        "encore-card:download": "Download",
        "encore-card:charters": "Charters",
        "encore-card:charters-unknown": "Unknown",
        "encore:search-no-results": "Your search did not have any results.",

        "encore-chart:downloading": "Downloading [x0], please wait...",
        "encore-chart:download-chart": "Download Chart",
        "encore-chart:charters": "Charters",
        "encore-chart:charters-unknown": "Unknown",
        "encore-chart:size": "Size: [x0]",
        "encore-chart:genres": "Genres",
        "encore-chart:genres-unknown": "Unknown",
        "encore-chart:release-year": "Year",
        "encore-chart:instrument": "Instrument"
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
        "language:desc": "Cambia el idioma de visualización.",

        "common:today": "hoy",
        "common:today-upper": "Hoy",
        "common:date-format": "[x0], [x2] de [x1] del [x3]",
        "common:date-format-no-year": "[x0], [x2] de [x1]",
        "common:monday": "Lunes",
        "common:tuesday": "Martes",
        "common:wednesday": "Miércoles",
        "common:thursday": "Jueves",
        "common:friday": "Viernes",
        "common:saturday": "Sábado",
        "common:sunday": "Domingo",
        "common:january": "ene",
        "common:february": "feb",
        "common:march": "mar",
        "common:april": "abr",
        "common:may": "may",
        "common:june": "jun",
        "common:july": "jul",
        "common:august": "ago",
        "common:september": "sep",
        "common:october": "oct",
        "common:november": "nov",
        "common:december": "dec",

        "item:please-wait": "Por favor espere...",
        "item:searching-for": "Buscando [x0]",
        "item:released": "Lanzamiento: [x0]",
        "item:last-time-seen": "Última vez visto [x0]",
        "item:seen": "Visto [x0] veces",
        "item:wait": "Espera promedio: [x0]d",
        "item:table-date": "Fecha",
        "item:table-days-since": "Tiempo",
        "item:styles": "Estilos",
        "item:gameplay-tags": "Etiquétas",
        "item:upcoming": "Proximamente",
        "item:copyright": "Audio con derechos de autor",
        "item:reactive": "Reactivo",
        "item:includes": "Este objeto incluye",
        "item:listen": "Escuchar",
        "item:granted": "Dado por",
        "item:builtin": "Gesto Integrado",
        "item:not-found": "No se encontraron objetos.",
        "item:not-found-or-error": "No se encontraron objetos, o hubo un error.",
        "item:help-search": "¿Estás buscando el nombre de un objeto del cuál no conoces su nombre? Ve a [x0] e intenta denuevo.",
        "item:search-page": "objetos",
        "item:no-params": "¡Parece que aquí no hay parametros!",
        "item:no-params-help": "Parece que no estas buscando ningún objeto. Usa objetos para ver uno, o haz clic en uno en otro lugar.",
        "item:take-me-home": "Llévame al inicio",

        "search:search": "Buscar",
        "search:search-desc": "Buscar todos los objetos disponibles en Fortnite.",
        "search:items": "Objetos",

        "search-filters:type": "Tipo",
        "search-filters:type-main": "Principales",
        "search-filters:type-main-outfit": "Atuendo",
        "search-filters:type-main-backbling": "Mochila",
        "search-filters:type-main-glider": "Planeador",
        "search-filters:type-main-loadingscreen": "Pantalla de carga",
        "search-filters:type-main-pickaxe": "Herramienta de recolección",
        "search-filters:type-main-style": "Estilo",
        "search-filters:type-main-contrail": "Estela",
        "search-filters:type-main-music": "Música",
        "search-filters:type-main-bundle": "Lote",

        "search-filters:type-interacting": "Interacción",
        "search-filters:type-interacting-emote": "Gesto",
        "search-filters:type-interacting-emoji": "Emoticono",
        "search-filters:type-interacting-spray": "Grafiti",
        "search-filters:type-interacting-toy": "Juguete",
        "search-filters:type-interacting-pet": "Mascota",
        "search-filters:type-interacting-wrap": "Papel",
        "search-filters:type-interacting-banner": "Estandarte",

        "search-filters:type-rr-vehicle": "Vehículo",
        "search-filters:type-rr-vehicle-skin": "Atuendo de vehículo",
        "search-filters:type-rr-vehicle-style": "Estílo de vehículo",
        "search-filters:type-rr-vehicle-trail": "Marca de vehículo",
        "search-filters:type-rr-wheel": "Rueda",
        "search-filters:type-rr-booster": "Efecto de turbo",

        "search-filters:type-ff-bass": "Bajos",
        "search-filters:type-ff-drum": "Batería",
        "search-filters:type-ff-lead": "Guitarras",
        "search-filters:type-ff-keys": "Teclados",
        "search-filters:type-ff-mics": "Micrófonos",
        "search-filters:type-ff-aura": "Aura",
        "search-filters:type-ff-jamtrack": "Pista de improvisación",

        "search-filters:type-lf-kit": "Kit de LEGO®",
        "search-filters:type-lf-dec": "Decoración",

        "search-filters:type-additional": "Adicional",
        "search-filters:type-additional-battlebus": "Autobús de batalla",
        "search-filters:type-additional-itemaccess": "Acceso a objeto",

        "search-filters:rarityseries": "Rareza/Serie",
        "search-filters:rarityseries-rarity": "Rareza",
        "search-filters:rarityseries-series": "Serie",

        "search-filters:introduction": "Introducción",
        "search-filters:introduction-chapter": "Capítulo [x0]",
        "search-filters:introduction-chapter-cs": "C[x0]T[x1]",

        "search-filters:delete-all": "Borrar todos",

        "quests:select": "Selecciona una categoría",
        "quests:quests": "misiones",
        "quests:unknown": "Desconocido",
        "quests:view-more": "Ver más",
        "quests:to-do": "[x0] por hacer",
        "quests:no-reward": "Sin recompensa.",

        "shop:item-shop": "TIENDA DE OBJETOS",
        "shop:jump": "SALTAR A CATEGORÍA",
        "shop:back": "VOLVER AL INÍCIO",
        "shop:tooltip": "[x0] por [x1] monedas V", // es = pavos
        
        "instruments:drums": "Percusión",
        "instruments:vocals": "Voz",
        "instruments:guitar": "Guitarra",
        "instruments:bass": "Bajo",
        "instruments:probass": "Bajo Pro",
        "instruments:proguitar": "Guitarra Pro",
        "instruments:prodrums": "Percusión Pro",

        "encore:all-charts": "Charts de Encore",
        "encore:search-charts": "Buscar Charts",
        "encore:search": "Buscar",
        "encore-card:view-more": "Ver más",
        "encore-card:download": "Descargar",
        "encore-card:charters": "Autores",
        "encore-card:charters-unknown": "Desconocidos",

        "encore:search-no-results": "Tu búsqueda no dió resultados.",
        "encore-chart:downloading": "Descargando [x0], por favor espere...",
        "encore-chart:download-chart": "Descargar Chart",
        "encore-chart:charters": "Autores",
        "encore-chart:charters-unknown": "Desconocidos",
        "encore-chart:size": "Tamaño: [x0]",
        "encore-chart:genres": "Géneros",
        "encore-chart:genres-unknown": "Desconocidos",
        "encore-chart:release-year": "Año",
        "encore-chart:instrument": "Instrumento"
    },
}

function getTranslationKey(key) {
    let lang = localStorage.requestLanguage
    if (lang === 'es') lang = 'es-419' // Perdon espanioles oleEEEE
    if (Object.keys(translations).includes(lang)) {
        return translations[lang][key]
    } else {
        return translations['en'][key]
    }
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
        var weekDaysIDs = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var monthsIDs = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        let weekDays = []
        let months = []
        for (let day of weekDaysIDs) {
            weekDays.push(getTranslationKey('common:' + day))
        }
        for (let month of monthsIDs) {
            months.push(getTranslationKey('common:' + month))
        }
        var currentDate = new Date();
        var currentYear = currentDate.getUTCFullYear();
        var currentMonth = currentDate.getUTCMonth();
        var currentDay = currentDate.getUTCDate();

        if (date.getUTCFullYear() === currentYear && date.getUTCMonth() === currentMonth && date.getUTCDate() === currentDay && justToday) {
            return getTranslationKey('common:today');
        } else if (date.getUTCFullYear() === currentYear) {
            return getTranslationKey('common:date-format-no-year')
            .replace('[x0]', weekDays[date.getUTCDay()])
            .replace('[x1]', months[date.getUTCMonth()])
            .replace('[x2]', date.getUTCDate())
        } else {
            return getTranslationKey('common:date-format')
            .replace('[x0]', weekDays[date.getUTCDay()])
            .replace('[x1]', months[date.getUTCMonth()])
            .replace('[x2]', date.getUTCDate())
            .replace('[x3]', date.getUTCFullYear())
        }
    } else {
        var currentDate = new Date();
        var currentYear = currentDate.getUTCFullYear();
        var currentMonth = currentDate.getUTCMonth();
        var currentDay = currentDate.getUTCDate();
        if (date.getUTCFullYear() === currentYear && date.getUTCMonth() === currentMonth && date.getUTCDate() === currentDay && justToday) {
            return getTranslationKey('common:today');
        }

        var units = {
            year: 24 * 60 * 60 * 1000 * 365,
            month: 24 * 60 * 60 * 1000 * 365 / 12,
            day: 24 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000
        }

        lang = 'en'
        if (localStorage.requestLanguage !== undefined) lang = localStorage.requestLanguage

        var rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })

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
    styleSheet.href = '/css/payload.css';
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