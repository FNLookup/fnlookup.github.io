function declareFuncs() {
    let params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
        document.getElementById('island-input').value = params.get('code');
        doStuff(params.get('code'));
    }

    document.getElementById("i-button").onclick = function() {
        doStuff(null);
    }
}

function doStuff(iCode) {
    let iID = document.getElementById('island-input').value;
    if (iCode !== null) {
        iID = iCode;
    }

    let code = document.getElementById('code-label');
    let publish = document.getElementById('island-published');
    let user = document.getElementById('island-author');
    let name = document.getElementById('island-name');
    let intro = document.getElementById('intro')
    let description = document.getElementById('description');
    let tags = document.getElementById('tags')
    let live = document.getElementById('live')
    let img = document.getElementById('island-img');
    let link = document.getElementById('link-visit');

    fetch('https://fortniteapi.io/v1/creative/island?code=' + iID, {
        headers: { 'Authorization': keyFNAPIIo }
    }).then(r => r.json()).then(r => {
        if (r.island !== undefined) {
            document.getElementById('island-data').classList.remove('hidden');

            let i = r.island;

            code.innerHTML = i.code;
            let d = i.publishedDate.split('T')[0];

            publish.innerHTML = getFormatDate(new Date(d))
            user.innerHTML = i.creator;
            name.innerHTML = i.title;

            document.title = i.title + ' - ' + i.code + ' - FNLookup';
            
            let introStr = '';
            for (let t of i.introduction.split('\n')) {
                introStr += '<li class="ci-intro">' + t + '</li>';
            }

            img.src = i.image;

            let mapTags = [];
            mapTags.push(i.matchmaking.playerCount + ' max players');
            for (let t of i.tags) mapTags.push(t); 

            if (i.xp !== undefined) {
                if (i.xp.enabled) {
                    tags.innerHTML = '<img src="assets/icons/xp.png" width="25" alt="XP">';
                }
            }

            for (let tag of mapTags) {
                let to = gne('a');
                to.classList.add('ci-tag');
                to.innerHTML = tag;
                tags.append(to);
            }

            intro.innerHTML = introStr;

            let desc = '';
            for (let t of i.description.split('\n')) {
                desc += '<br>' + t;
            }

            description.innerHTML = desc;
            if (i.status !== undefined) {
                live.innerHTML = i.status.toUpperCase();
            } else {
                live.innerHTML = 'Unknown';
            }

            let visitLink = 'tposejank.github.io/fnlookup/island?code=' + i.code;
            link.innerHTML = visitLink;
            link.href = 'https://' + visitLink;
        }

    }).catch(e => {
        console.error(e);
    })
}