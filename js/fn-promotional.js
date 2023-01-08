enableAutoplayPromotionals = false;

fetch(geturllang('https://fortniteapi.io/v2/battlepass?season=current', 1), {
    headers: { 'Authorization': keyFNAPIIo }
}).then(r => r.json()).then(r => {
    sources = [];
    curSource = 0;

    for (let src of r.videos) {
        sources.push(src.url);
    }

    vid.classList.add('active-by-viewer');
    vid.src = sources[curSource];
    vid.loop = false;
    vid.controls = true;
    vid.style.position = 'relative';

    document.querySelector('.fn-dot-mask').style.display = 'none';
    document.querySelector('.season-video').style.zIndex = 0;

    vid.addEventListener('ended', function () {
        nextVid();
    }, false);

    lol = setInterval(hideTooltip, 3000);

    controls = document.getElementById('video-controls');

    document.getElementById('prev-btn').onclick = prevVid;
    document.getElementById('next-btn').onclick = nextVid;
    updateCounter();

    vid.onmousemove = function () {
        clearInterval(lol);
        lol = setInterval(hideTooltip, 3000);
        popupTooltip();
    }
}).catch(err => { console.error(err); });

function nextVid() {
    curSource += 1;
    if (curSource >= sources.length) curSource = 0;

    vid.src = sources[curSource];
    popupTooltip();
    updateCounter();
}

function prevVid() {
    curSource -= 1;
    if (curSource < 0) curSource = sources.length - 1;

    vid.src = sources[curSource];
    popupTooltip();
    updateCounter();
}

function updateCounter() {
    document.getElementById('videos-counter').innerHTML = (curSource + 1) + ' of ' + sources.length;
}

function popupTooltip() {
    controls.style.transform = 'translateX(0)';
    document.querySelector('.nav-container').style.transform = 'translateY(0)';
}

function hideTooltip() {
    console.log('Tooltip hidden');
    clearInterval(lol);

    document.getElementById('controls-tooltip').style.display = 'none';
    controls.style.transform = 'translateX(-100%)';

    document.querySelector('.nav-container').style.transform = 'translateY(-100%)';

    document.getElementById('controls').style.display = 'flex';
}