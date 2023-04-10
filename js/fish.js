function getfish() {
    fetch(geturllang('https://fnlookup-api.vercel.app/api?endpoint=fish', 1)).then(r => r.json()).then(r => {

        console.log(r);
        let main = document.getElementById('fish-wrapper');

        for (let fatFlopper of r.fish) {
            let parent = gne('div');
            parent.classList.add('fish-item');

            let image = document.createElement('img');
            image.classList.add('fish-image', 'floating');
            image.src = fatFlopper.image;
            image.title = fatFlopper.name + ' (' + fatFlopper.id + ')';

            let name = gne('p');
            name.classList.add('fish-name');
            name.innerHTML = fatFlopper.name + (!fatFlopper.enabled ? ' (Vaulted)' : '');

            let desc = gne('p');
            desc.classList.add('fish-desc');
            desc.textContent = fatFlopper.description;
            let desc2 = gne('p');
            desc2.classList.add('fish-desc');
            desc2.innerHTML = fatFlopper.details + '<br>Max. Stackable: ' + fatFlopper.maxStackSize + '<br>Pro Fishing Rod: ' + (fatFlopper.needsProFishingRod ? 'Yes' : 'No');

            let decoration = document.createElement('div');
            decoration.classList.add('fish-decoration');

            let bdec = gne('div');
            bdec.classList.add('deco-b');
            decoration.append(bdec);

            bdec.setAttribute('rarity', fatFlopper.rarity);

            parent.append(image, name, desc, desc2, decoration);
            main.appendChild(parent);
        }

    }).catch(e => {console.error(e);});

}