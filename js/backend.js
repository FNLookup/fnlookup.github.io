keyFNAPI = '***REMOVED***'
keyFNAPIIo = '***REMOVED***'
marioDancing = 'https://cdn.discordapp.com/emojis/1036788611925950504.gif?size=96&quality=lossless'

window.supportedLanguages = [
    'en', 'ar', 'de', 'es', 'es-419', 'fr', 'it', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'tr', 'zh-CN', 'zh-Hant'
];
window.defaultLanguage = 'en';

if (localStorage.requestLanguage === undefined) {
    if (typeof(window.navigator.language) == 'string') {
        if (window.supportedLanguages.includes(window.navigator.language)) {
            localStorage.requestLanguage = window.navigator.language;
            console.log('changed language to ' + window.navigator.language);
        } else
            localStorage.requestLanguage = window.defaultLanguage;
        
        if (window.navigator.language.toLowerCase().startsWith('es-')) {
            console.log(window.navigator.language + ' changed to es-419');
            localStorage.requestLanguage = 'es-419';
        }
    } else
        localStorage.requestLanguage = window.defaultLanguage;
}

function debugFetch(url, oauth) {
    fetch(url, {headers: { 'Authorization': oauth }}).then(r => r.json()).then(r => {
        console.log('DebugFetch done\n', r)
    });
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

function otherargument(url, arg) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    return url + t + arg + '=' + localStorage.requestLanguage
}
function oac(url, arg, value) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    return url + t + arg + '=' + value
}

function getFlag(code) {
    return 'https://laendercode.net/img/flag-icon-css/flags/4x3/' + code.toLowerCase() + '.svg'
}

function getAllowedTournamentDevice(device) {
    switch(device) {
        case 'XboxOneGDK': return 'Xbox One Game Development Kit';
        case 'XCloud': return 'Xbox Cloud Gaming (DEV)';
        case 'XCloudMobile': return 'Xbox Cloud Gaming Mobile (DEV)';
        case 'Helios': return 'Xbox Cloud Gaming';
        case 'HeliosMobile': return 'Xbox Cloud Gaming Mobile';
        case 'XboxOne': return 'Xbox One';
        case 'XSX': return 'Xbox Series X';
        case 'Android': return 'Android (Mobile)';
        case 'GFN': return 'GeForce NOW';
        case 'Switch': return 'Nintendo Switch';
        case 'GFNMobile': return 'GeForce NOW Mobile';
        case 'Windows': return 'Windows PCs';
        case 'PS4': return 'PS4';
        case 'PS5': return 'PS5';
        default: return 'Unknown device (' + device + ')';
    }
}