marioDancing = '/assets/mario.gif'
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
        if (window.navigator.language.toLowerCase() == 'es-es') localStorage.requestLanguage = 'es';
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

function getLang() {
    return localStorage.requestLanguage
}

function geturllang(url, type) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    switch (type) {
        case 0: // Fortnite-API.com
            return url + t + 'language=' + getLang()
        case 1: // FortniteAPI.io
            return url + t + 'lang=' + localStorage.requestLanguage
    }
}

function getFlag(code) {
    return 'https://raw.githubusercontent.com/hampusborgos/country-flags/main/png1000px/' + code.toLowerCase() + '.png'
}

function getAllowedTournamentDevice(device) {
    switch (device) {
        case 'XboxOneGDK':
            return 'Xbox One Game Devkit';
        case 'XCloud':
            return 'Xbox Cloud Gaming (DEV)';
        case 'XCloudMobile':
            return 'Xbox Cloud Gaming Mobile (DEV)';
        case 'Helios':
            return 'Xbox Cloud Gaming';
        case 'HeliosMobile':
            return 'Xbox Cloud Gaming Mobile';
        case 'XboxOne':
            return 'Xbox One';
        case 'XSX':
            return 'Xbox Series X';
        case 'Android':
            return 'Android';
        case 'GFN':
            return 'GeForce NOW';
        case 'Switch':
            return 'Nintendo Switch';
        case 'GFNMobile':
            return 'GeForce NOW Mobile';
        case 'Windows':
            return 'Windows';
        case 'PS4':
            return 'PS4';
        case 'PS5':
            return 'PS5';
        case 'Luna':
            return 'Amazon Luna';
        case 'LunaMobile':
            return 'Amazon Luna Mobile';
        default:
            return 'Unknown device (' + device + ')';
    }
}

function getDeviceLogo(device) {
    switch (device) {
        case 'XboxOneGDK':
            return '/assets/images/platformlogo/XboxOneGDK.png';
        case 'XCloud':
            return '/assets/images/platformlogo/CloudGamingDEV.png';
        case 'XCloudMobile':
            return '/assets/images/platformlogo/CloudGamingMobileDEV.png';
        case 'Helios':
            return '/assets/images/platformlogo/CloudGaming.png';
        case 'HeliosMobile':
            return '/assets/images/platformlogo/CloudGamingMobile.png';
        case 'XboxOne':
            return '/assets/images/platformlogo/XboxOne.png';
        case 'XB1':
            return '/assets/images/platformlogo/XboxOne.png';
        case 'XSX':
            return '/assets/images/platformlogo/SeriesX.png';
        case 'Android':
            return '/assets/images/platformlogo/Android.png';
        case 'GFN':
            return '/assets/images/platformlogo/GeforceNOW.png';
        case 'Switch':
            return '/assets/images/platformlogo/Switch.png';
        case 'GFNMobile':
            return '/assets/images/platformlogo/GeforceNOWMobile.png';
        case 'Windows':
            return '/assets/images/platformlogo/Windows.png';
        case 'PS4':
            return '/assets/images/platformlogo/PS4.png';
        case 'PS5':
            return '/assets/images/platformlogo/PS5.png';
        case 'Luna':
            return '/assets/images/platformlogo/Luna.png';
        case 'LunaMobile':
            return '/assets/images/platformlogo/LunaMobile.png';
        default:
            return '/assets/images/logo-maxres.png'
    }
}

function getUnixTimestampDate(unixTimestamp) {
    return new Date(unixTimestamp * 1000).toLocaleString().replace(',', '').replace(/:.. /, ' ');
}

function getApiURL(endpoint) {
    return 'https://fnlookup-apiv2.vercel.app/api?endpoint=' + endpoint.replace('?', '&');
}

function getRequestData(urlEndpoint) {
    return {
        url: geturllang(getApiURL(urlEndpoint), 1),
        data: {}
    };
}

function itemFetch(small = true) {
    return {
        url: `https://raw.githubusercontent.com/FNLookup/data/main/fnapiio/items_${small ? 'smaller' : 'all'}_${getLang()}.json`,
        data: {}
    };
}