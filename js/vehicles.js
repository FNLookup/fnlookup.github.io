function getstat() {
    let requestData = getRequestData('vehicles');
    fetch(requestData.url, requestData.data).then(shop => shop.json()).then(data => {

        let main = document.getElementById('vehicle-wrapper');

        for (let vehicle of data.vehicles) {
            let parent = gne('div');
            parent.classList.add('vehicle-item');

            let image = document.createElement('img');
            image.classList.add('vehicle-image');
            image.src = vehicle.icon;
            image.title = vehicle.name + ' (' + vehicle.id + ')';

            let name = gne('p');
            name.classList.add('vehicle-name');
            name.textContent = vehicle.name;

            let decoration = document.createElement('div');
            decoration.classList.add('vehicle-decoration');

            let bdec = gne('div');
            bdec.classList.add('deco-b');
            decoration.append(bdec);

            parent.append(image, name, decoration);
            main.appendChild(parent);
        }

    }).catch(err => {
        console.error(err);
    })
}