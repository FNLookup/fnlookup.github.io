marioDancing = 'https://cdn.discordapp.com/emojis/1036788611925950504.gif?size=96&quality=lossless'
crystalBall = 'https://discord.com/assets/1e183a34aa97fc91f7e6992bdd24f981.svg|46c8d137-adea4f05-5928e673-ffdcf29d';
// document.head.innerHTML += '<script src="js/cookie.js"></script>'

window.supportedLanguages = [
    'en', 'ar', 'de', 'es', 'es-419', 'fr', 'it', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'tr', 'zh-CN', 'zh-Hant'
];
window.defaultLanguage = 'en';

if (localStorage.requestLanguage === undefined) {
    if (typeof(window.navigator.language) == 'string') {
        if (window.supportedLanguages.includes(window.navigator.language)) {
            localStorage.requestLanguage = window.navigator.language;
            console.log('changed language to ' + window.navigator.language);
        } else localStorage.requestLanguage = window.defaultLanguage;
        if (window.navigator.language.toLowerCase().startsWith('es-')) localStorage.requestLanguage = 'es-419';
        if (window.navigator.language.toLowerCase() == 'es-ES') localStorage.requestLanguage = 'es';
    } else
        localStorage.requestLanguage = window.defaultLanguage;
}

function switchLanguage(to) {
    if (window.supportedLanguages.includes(to)) {
        localStorage.requestLanguage = to;
        window.location.reload();
        return true;
    } else return false;
}

function geturllang(url, type) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    switch (type) {
        case 0: // Fortnite-API.com
            return url + t + 'language=' + localStorage.requestLanguage
        case 1: // FortniteAPI.io
            return url + t + 'lang=' + localStorage.requestLanguage
    }
}

function getFlag(code) {
    return 'https://raw.githubusercontent.com/hampusborgos/country-flags/main/png1000px/' + code.toLowerCase() + '.png'
    //they done my ecuador dirty so had to ditch them
}

function getAllowedTournamentDevice(device) {
    switch(device) {
        case 'XboxOneGDK': return 'Xbox One Game Devkit';
        case 'XCloud': return 'Xbox Cloud Gaming (DEV)';
        case 'XCloudMobile': return 'Xbox Cloud Gaming Mobile (DEV)';
        case 'Helios': return 'Xbox Cloud Gaming';
        case 'HeliosMobile': return 'Xbox Cloud Gaming Mobile';
        case 'XboxOne': return 'Xbox One';
        case 'XSX': return 'Xbox Series X';
        case 'Android': return 'Android';
        case 'GFN': return 'GeForce NOW';
        case 'Switch': return 'Nintendo Switch';
        case 'GFNMobile': return 'GeForce NOW Mobile';
        case 'Windows': return 'Windows';
        case 'PS4': return 'PS4';
        case 'PS5': return 'PS5';
        case 'Luna': return 'Amazon Luna';
        case 'LunaMobile': return 'Amazon Luna Mobile';
        default: return 'Unknown device (' + device + ')';
    }
}

function getUnixTimestampDate(unixTimestamp) {
    return new Date(unixTimestamp * 1000).toLocaleString().replace(',', '').replace(/:.. /, ' ');
}

function getApiURL(endpoint) {
    return 'https://fnlookup-api.vercel.app/api?endpoint=' + endpoint.replace('?', '&');

    var baseURL = 'https://fortniteapi.io/';
    var requestURL = endpoint.replace(endpoint, '');
    const endpoints = {
        'achievements': 'v1/achievements',
        'twitch-drops': 'v1/twitch/drops',
        'battlepass': '/v2/battlepass',
        'stats': 'v1/stats',
        'shop': 'v2/shop',
        'seasons': 'v1/seasons/list',
        'rarities': 'v2/rarities',
        'news': 'v1/news',
        'fish': 'v1/loot/fish',
        'loot': 'v1/loot/list',
        'lookup': 'v2/lookup/advanced',
        'item': 'v2/items/get',
        'all-items': 'v2/items/list',
        'augments': 'v1/game/augments',
        'gamemodes': 'v1/game/modes',
        'poi': 'v1/game/poi',
        'vehicles': 'v1/game/vehicles',
        'events': 'v1/events/list',
        'window': 'v1/events/window',
        'crew': 'v2/crew',
        'crew-history': 'v2/crew/history',
        'creator': 'v1/creator',
        'island': 'v1/creative/island',
        'featured': 'v1/creative/featured',
        'challenges': 'v3/challenges',
        // ...
      };

    var originalURL = 'https://fnlookup-api.vercel.app/api?endpoint=' + endpoint;
    var params = new URLSearchParams(originalURL.split('?')[1]);

    const gottenEndpoint = params.get('endpoint');
    var lastURL = baseURL + endpoints[gottenEndpoint];
    params.delete('endpoint');
    lastURL += '?'+ params.toString();

    console.log(lastURL);
    return lastURL
}

function getRequestData(urlEndpoint) {
    return {
        url: geturllang(getApiURL(urlEndpoint), 1), data:{}
    };
}