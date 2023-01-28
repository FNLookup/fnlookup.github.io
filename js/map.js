function generateMap() {
    fetch(geturllang('https://fortniteapi.io/v2/game/poi', 1),{
        headers: {'Authorization': keyFNAPIIo}
    }).then(r => r.json()).then(r => {
        if (r.data !== null) {
            setMapFunctions();
            addMapElements();

            for (let poi of r.list) {
                let a = gne('a');
                a.addEventListener('click', function() {
                    openMapView(poi);
                });

                let pName = gne('h1');
                pName.innerHTML = poi.name;

                a.append(pName);
                document.getElementById('map-info').append(a);
            }
        }
    }).catch(e => {
        console.error(e);
    });
}

function openMapView(poi) {
    let pName = document.getElementById('poi-name');
    pName.innerHTML = poi.name;

    let pView = document.getElementById('poi-view-dialog');
    pView.classList.add('open')
    
    let pX = document.getElementById('close-map-btn');
    pX.onclick = function() {
        pView.classList.remove('open');
    }

    document.getElementById('poi-image').src = poi.images[0].url;
}

function setMapFunctions() {
    let page = document.getElementsByClassName('content')[0];

    var poiSwitch = document.createElement('label');
    poiSwitch.classList.add('toggle');

    let input = document.createElement('input');
    input.classList.add('toggle-checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'true');
    poiSwitch.appendChild(input);
    let swi = document.createElement('div');
    swi.classList.add('toggle-switch');
    poiSwitch.appendChild(swi);

    swi.addEventListener('click', function () {
        var value = document.getElementById('map-image').classList.toggle('no-poi');

        let img_src = 'https://fortnite-api.com/images/map_' + localStorage.requestLanguage + '.png'
        let img_src_np = 'https://fortnite-api.com/images/map.png'

        document.getElementById('map-image').src = value ? img_src_np : img_src;
    })

    let label = document.createElement('h2');
    label.innerHTML = 'Show POI Names';
    poiSwitch.appendChild(label);

    page.append(poiSwitch);
}

function addMapElements() {
    let page = document.getElementsByClassName('content')[0];
    let content = document.createElement('div');
    content.classList.add('flex-media');

    page.append(content);

    let mapInfo = document.createElement('div');
    mapInfo.classList.add('d-50-media');
    mapInfo.id = 'map-info';

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('d-50-media');

    let img = document.createElement('img');
    img.title = 'Map';
    img.id = 'map-image';
    img.classList.add('map');
    img.src = 'https://fortnite-api.com/images/map_' + localStorage.requestLanguage + '.png'
    imgContainer.append(img);
    
    content.append(mapInfo);
    content.append(imgContainer);
}