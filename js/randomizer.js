let rowOneLockerTypes = {
    parentID: 'main-locker-items',
    objects: [
        {name: 'Outfit',                    backend: 'outfit'}, 
        {name: 'Back Bling',                backend: 'backpack'}, 
        {name: 'Pickaxe',                   backend: 'pickaxe'},
        {name: 'Glider',                    backend: 'glider'}, 
        {name: 'Contrail',                  backend: 'contrail'}
    ]
}

let emoteTypes = {
    parentID: 'emote-slots',
    objects: [
        {name: 'Emote Slot 1'}, 
        {name: 'Emote Slot 2'},  
        {name: 'Emote Slot 3'},
        {name: 'Emote Slot 4'}, 
        {name: 'Emote Slot 5'},
        {name: 'Emote Slot 6'}
    ],
    backends: [
        'emote', 'spray', 'emoji'
    ]
}

let wrapTypes = {
    parentID: 'weapon-wraps',
    objects: [
        {name: 'Vehicle Wrap',              backend: 'wrap'}, 
        {name: 'Assault Rifle Wrap',        backend: 'wrap'}, 
        {name: 'Shotgun Wrap',              backend: 'wrap'},
        {name: 'SMG Wrap',                  backend: 'wrap'}, 
        {name: 'Sniper Wrap',               backend: 'wrap'}, 
        {name: 'Pistol Wrap',               backend: 'wrap'},
        {name: 'Explosive Weapon Wrap',     backend: 'wrap'}
    ]
}

let menuObjectTypes = {
    parentID: 'menu-items',
    objects: [
        {name: 'Music Pack',                backend: 'music'},
        {name: 'Loading Screen',            backend: 'loadingscreen'}
    ]
}

function loadRandomPicker() {
    fetch(geturllang('https://fortniteapi.io/v2/items/list?fields=images,name,type', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(response => response.json()).then(response => {
        items = response.items;

        for (let modal of rowOneLockerTypes.objects) {

            let allFirstItems = [];
            let randomFirstItems = [];

            for (let item of items) {
                if (item.type.id == modal.backend)
                    allFirstItems.push(item);
            }

            let chosenItem = allFirstItems[Math.floor(Math.random()*allFirstItems.length)];
            for (let j = 0; j<10;j++) {
                randomFirstItems.push(allFirstItems[Math.floor(Math.random()*allFirstItems.length)])
            }
            let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name);
            document.getElementById(rowOneLockerTypes.parentID).append(card);
        }

        document.getElementById('generate-emotes').onclick = function() {
            for (let modal of emoteTypes.objects) {

                let allFirstItems = [];
                let randomFirstItems = [];
    
                let allowedTypes = [];
                for (let backend of emoteTypes.backends) {
                    if (document.getElementById(backend + '-checkbox').checked) {
                        allowedTypes.push(backend);
                    }
                }
    
                for (let item of items) {
                    if (allowedTypes.includes(item.type.id))
                        allFirstItems.push(item);
                }
    
                let chosenItem = allFirstItems[Math.floor(Math.random()*allFirstItems.length)];
                for (let j = 0; j<10;j++) {
                    randomFirstItems.push(allFirstItems[Math.floor(Math.random()*allFirstItems.length)])
                }
                let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name);
                document.getElementById(emoteTypes.parentID).append(card);
            }
            document.getElementById('emote-pickers').style.display = 'none';
        }

        for (let modal of wrapTypes.objects) {

            let allFirstItems = [];
            let randomFirstItems = [];

            for (let item of items) {
                if (item.type.id == modal.backend)
                    allFirstItems.push(item);
            }

            let chosenItem = allFirstItems[Math.floor(Math.random()*allFirstItems.length)];
            for (let j = 0; j<10;j++) {
                randomFirstItems.push(allFirstItems[Math.floor(Math.random()*allFirstItems.length)])
            }
            let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name);
            document.getElementById(wrapTypes.parentID).append(card);
        }

        for (let modal of menuObjectTypes.objects) {

            let allFirstItems = [];
            let randomFirstItems = [];

            for (let item of items) {
                if (item.type.id == modal.backend)
                    allFirstItems.push(item);
            }

            let chosenItem = allFirstItems[Math.floor(Math.random()*allFirstItems.length)];
            for (let j = 0; j<10;j++) {
                randomFirstItems.push(allFirstItems[Math.floor(Math.random()*allFirstItems.length)])
            }
            let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name);
            document.getElementById(menuObjectTypes.parentID).append(card);
        }
    }).catch(e=>{console.error(e)})
}

// Array<Item Enum>,
// Item Enum,
// Top String,
// Bottom String

function getCard(rollEventItems, item, top, bottom) {
    let parent = document.createElement('div');
    parent.classList.add('item-card-parent');

    var obj = document.createElement("div");
    obj.classList.add("item-card");

    var hold = document.createElement("div");
    hold.classList.add("item-info");

    var title = document.createElement('a');
    title.innerHTML = top;
    title.classList.add("item-title");

    let type = document.createElement('a');
    type.classList.add("item-type");
    type.innerHTML = bottom;

    hold.append(title, type);
    obj.appendChild(hold);

    let ic = document.createElement('div');
    ic.classList.add("item-image");

    var defaultImage = document.createElement("img");
    var img_src = 'assets/images/unknown-cosmetic.png';
    defaultImage.src = img_src;
    defaultImage.setAttribute("title", 'Click to reveal');
    defaultImage.classList.add("style-picture", 'current-style');
    ic.append(defaultImage);

    let itemImages = [];

    for (let exampleItem of rollEventItems) {
        let exampleSrc = '';

        if (exampleItem.images.icon != null)
            exampleSrc = exampleItem.images.icon;
        if (exampleItem.images.featured != null)
            exampleSrc = exampleItem.images.featured;
        if (exampleItem.images.background != null)
            exampleSrc = exampleItem.images.background;   

        var examplePic = document.createElement("img");
        examplePic.src = exampleSrc;
        examplePic.setAttribute("title", exampleItem.name);
        examplePic.classList.add("style-picture");
        ic.append(examplePic);

        itemImages.push(examplePic);
    }

    let endPic = document.createElement("img")
    let endSrc = '';

    if (item.images.icon != null)
        endSrc = item.images.icon;
    if (item.images.featured != null)
        endSrc = item.images.featured;
    if (item.images.background != null)
        endSrc = item.images.background;  
    endPic.src = endSrc;
    endPic.title = item.name;
    endPic.classList.add("style-picture");
    ic.append(endPic)

    let clicked = false;
    obj.onclick = function() {
        if (!clicked) {
            defaultImage.classList.remove("current-style");
            let times = 0;
    
            let timer = setInterval(function() {
                for (let img of itemImages) {
                    img.classList.remove("current-style");
                }
    
                itemImages[times].classList.add('current-style');
    
                times++;
    
                if (times == 10) {
                    clearInterval(timer);
                
                    for (let img of itemImages) {
                        img.classList.remove("current-style");
                    }
                    endPic.classList.add('current-style');
    
                    title.innerHTML = item.name;
                }
            }, 100)

            clicked = true;
        }
    }
    obj.append(ic);

    return obj;
}