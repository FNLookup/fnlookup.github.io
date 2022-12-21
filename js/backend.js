localStorage.keyFNAPI = '***REMOVED***'
localStorage.keyFNAPIIo = '***REMOVED***'
if (localStorage.requestLanguage === undefined) {
    localStorage.requestLanguage = 'en';
}

supportedLanguages = [
    'en', 'ar', 'de', 'es', 'es-419', 'fr', 'it', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'tr', 'zh-CN', 'zh-Hant'
];

function geturllang(url, type) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    switch (type) {
        case 0: // Fortnite-API
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