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
        headers: {'Authorization': keyFNAPIIo}
    }).then(response => response.json()).then(response => {
        items = response.items;

        for (let object of [rowOneLockerTypes, wrapTypes, menuObjectTypes]) {
            for (let modal of object.objects) {
                let things = askForReroll([modal.backend])
                let randomFirstItems = things[0];
                let chosenItem = things[1];
    
                let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name, [modal.backend]);
                document.getElementById(object.parentID).append(card);
            }
        }

        document.getElementById('generate-emotes').onclick = function() {
            for (let modal of emoteTypes.objects) {
                allowedEmoteTypes = [];
                for (let backend of emoteTypes.backends) {
                    if (document.getElementById(backend + '-checkbox').checked) {
                        allowedEmoteTypes.push(backend);
                    }
                }

                let things = askForReroll(allowedEmoteTypes)
                let randomFirstItems = things[0];
                let chosenItem = things[1];
    
                let card = getCard(randomFirstItems, chosenItem, 'Tap to reveal', modal.name, allowedEmoteTypes);
                document.getElementById(emoteTypes.parentID).append(card);
            }
            document.getElementById('emote-pickers').style.display = 'none';
        }
    }).catch(e=>{console.error(e)})
}

function askForReroll(ids, ammount = 10) {
    let ret = [];
    
    let allFirstItems = [];

    for (let item of items) {
        if (ids.includes(item.type.id))
            allFirstItems.push(item);
    }

    let chosenItem = allFirstItems[Math.floor(Math.random()*allFirstItems.length)];
    for (let j = 0; j<ammount;j++) {
        ret.push(allFirstItems[Math.floor(Math.random()*allFirstItems.length)])
    }
    
    return [ret, chosenItem];
}

// Array<Item Enum>,
// Item Enum,
// Top String,
// Bottom String

function getCard(rollEventItems, item, top, bottom, backends) {
    let parent = document.createElement('a');
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
    obj.addEventListener('click', function() {
        if (!clicked) {
            defaultImage.classList.remove("current-style");
            let times = 0;
    
            let timer = setInterval(function() {
                for (let img of itemImages) {
                    img.classList.remove("current-style");
                }
    
                itemImages[times].classList.add('current-style');
    
                times++;
    
                if (times == 5) {
                    clearInterval(timer);
                
                    for (let img of itemImages) {
                        img.classList.remove("current-style");
                    }
                    endPic.classList.add('current-style');
    
                    title.innerHTML = item.name;
                }
            }, 100)

            clicked = true;
        } else {
            for (let img of itemImages)
                img.remove();

            let things = askForReroll(backends, 5)
            let randomFirstItems = things[0];
            let chosenItem = things[1];
            let endSrc = '';
            if (chosenItem.images.icon != null) endSrc = chosenItem.images.icon;
            if (chosenItem.images.featured != null) endSrc = chosenItem.images.featured;
            if (chosenItem.images.background != null) endSrc = chosenItem.images.background;  
            endPic.src = endSrc;

            title.innerHTML = 'Rerolling...';

            for (let exampleItem of randomFirstItems) {
                let exampleSrc = '';
                if (exampleItem.images.icon != null) exampleSrc = exampleItem.images.icon;
                if (exampleItem.images.featured != null) exampleSrc = exampleItem.images.featured;
                if (exampleItem.images.background != null) exampleSrc = exampleItem.images.background;   
                var examplePic = document.createElement("img");
                examplePic.src = exampleSrc;
                examplePic.setAttribute("title", exampleItem.name);
                examplePic.classList.add("style-picture");
                ic.append(examplePic);
                itemImages.push(examplePic); }

            endPic.classList.remove('current-style');

            var times = 0;
            let timer = setInterval(function() {
                for (let img of itemImages) img.classList.remove("current-style");
                itemImages[times].classList.add('current-style');
                times++;
                if (times == 5) {
                    clearInterval(timer);
                    for (let img of itemImages) img.classList.remove("current-style");
                    endPic.classList.add('current-style');
                    title.innerHTML = chosenItem.name; }}, 100)
        }
    })
    obj.append(ic);

    return obj;
}