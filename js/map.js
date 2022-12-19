function generateMap() {
    fetch('https://fortnite-api.com/v1/map').then(response => response.json()).then(response => {
        if (response.status !== 200) {
            let eTitle = document.createElement('h1');
            let eText = document.createElement('h2');
            let error = response.status + ': ' + response.error;
            console.log(error);
            eTitle.innerHTML = 'Error: ' + response.status;
            eText.innerHTML = response.error;
            document.getElementsByClassName('content')[0].append(eTitle);
            document.getElementsByClassName('content')[0].append(eText);

            return;
        }

        if (response.data !== null) {
            let data = response.data;

            setMapFunctions();
            addMapElements();

            let content_body = document.getElementById('map-info');

            let namedPOIItems = document.createElement('div');
            namedPOIItems.classList.add('map-location-box');
            namedPOIItems.classList.add('hidden');

            let namedPois = document.createElement('h2');
            namedPois.classList.add('map-location-type');
            namedPois.classList.add('links');

            var arrowNP = document.createElement('i');
            arrowNP.classList.add('arrow');

            arrowNP.id = 'named-poi-arrow';
            arrowNP.classList.add('sideways');

            namedPois.append(arrowNP);
            namedPois.innerHTML += ' POIs';

            content_body.appendChild(namedPois);
            content_body.appendChild(namedPOIItems);

            namedPois.addEventListener('click', function() {
                document.getElementById('named-poi-arrow').classList.toggle('sideways');
                namedPOIItems.classList.toggle('hidden');
            });

            let unnamedPOIItems = document.createElement('div');
            unnamedPOIItems.classList.add('map-location-box');
            unnamedPOIItems.classList.add('hidden');

            let unnamedPois = document.createElement('h2');
            unnamedPois.classList.add('map-location-type');
            unnamedPois.classList.add('links');

            var arrowUNP = document.createElement('i');
            arrowUNP.classList.add('arrow');

            arrowUNP.id = 'unnamed-poi-arrow';
            arrowUNP.classList.add('sideways');

            unnamedPois.append(arrowUNP);
            unnamedPois.innerHTML += ' Landmarks';
            
            content_body.appendChild(unnamedPois);
            content_body.appendChild(unnamedPOIItems);

            unnamedPois.addEventListener('click', function() {
                document.getElementById('unnamed-poi-arrow').classList.toggle('sideways');
                unnamedPOIItems.classList.toggle('hidden');
            });

            for (let poi of data.pois) {
                let name = document.createElement('p');
                name.innerHTML = poi.name;
                if (poi.id.startsWith('Athena.Location.UnNamedPOI')) { //unnamed
                    unnamedPOIItems.append(name);
                } else {
                    namedPOIItems.append(name);
                }
            }
        }

        console.log(response);
    });
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
        document.getElementById('map-image').src = 'https://fortnite-api.com/images/map' + (!value ? '_en' : '') + '.png'
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
    img.src = 'https://fortnite-api.com/images/map_en.png';
    imgContainer.append(img);
    
    content.append(mapInfo);
    content.append(imgContainer);
}