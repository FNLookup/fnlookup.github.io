let currentLoadIndex = [0, 24];
let itemsPerLoad = 25;
let itemLookMode = false;

function initFilter() {
    var filters = [
        {
            name: 'Type',
            backend: 'type',
            objects: [
                {name: 'Back Bling', backend: 'backpack'},
                {name: 'Emote', backend: 'emote'},
                {name: 'Glider', backend: 'glider'},
                {name: 'Emoji', backend: 'emoji'},
                {name: 'Loading Screen', backend: 'loadingscreen'},
                {name: 'Outfit', backend: 'outfit'},
                {name: 'Pickaxe', backend: 'pickaxe'},
                {name: 'Contrail', backend: 'contrail'},
                {name: 'Style', backend: 'cosmeticvariant'},
                {name: 'Bundle', backend: 'bundle'},
                {name: 'Spray', backend: 'spray'},
                {name: 'Toy', backend: 'toy'},
                {name: 'Pet', backend: 'pet'},
                {name: 'Music Pack', backend: 'music'}
            ]
        }
    ]

    makeFc(filters);

    fetch(geturllang("https://fortniteapi.io/v2/rarities", 1), {
        headers: { 'Authorization': localStorage.keyFNAPIIo}
    }).then(r=>r.json()).then(r=>{
        
        let stuff = [];
        for (let a of r.rarities) {
            stuff.push({
                name: a.name,
                backend: a.id
            });
        }
        for (let b of r.series) {
            stuff.push({
                name: b.name,
                backend: b.id
            });
        }

        makeFc([
            {
                name: 'Rarity',
                backend: 'rarity',
                objects: stuff
            }
        ])

    }).catch(error => {
        console.error(error)
    })
}

function makeFc(filters) {
    let dropdownObject = document.getElementById('dropdown-object');
    for (let filterClass of filters) {
        let main = document.createElement('div');
        main.classList.add('filter-choice');

        let title = document.createElement('span');
        title.classList.add('filter-class');
        title.classList.add('links', 'pointer');
        title.innerHTML = filterClass.name;
        
        let arrow = document.createElement('i');
        arrow.classList.add('arrow');

        title.append(arrow);
        main.append(title);

        let menu = document.createElement('ul');
        menu.classList.add('dropdown-menu', 'hidden');

        title.addEventListener('click', function() {
            menu.classList.toggle('hidden');
        })

        if (filterClass.objects !== undefined) {
            for (let option of filterClass.objects) {
                let item = document.createElement('li');
                item.classList.add('dropdown-choice');
    
                let chbox = document.createElement('div');
                chbox.classList.add('flex');
    
                let normalize = option.name.toLowerCase().replace(' ', '-').replace(',', '-');
    
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = normalize;
                checkbox.name = filterClass.backend;
                checkbox.setAttribute('backend-value', option.backend.toLowerCase());
    
                let label = document.createElement('a');
                label.innerHTML = option.name;
    
                chbox.append(checkbox);
                chbox.append(label);
    
                item.append(chbox);
    
                menu.appendChild(item);
            }
        }

        main.append(menu);
        dropdownObject.appendChild(main);
    }
}

function downloadItems() {
    fetch(geturllang('https://fortniteapi.io/v2/items/list?fields=id,introduction,images,name,type,rarity', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(response => response.json()).then(response => {
        items = response.items;

        let seasons = [];
        for (let item of response.items) {
            if (item.introduction !== null) {
                if (!seasons.includes(item.introduction.text)) {
                    seasons.push(item.introduction.text);
                }
            }
        }

        let stuff = [];
        for (let season of seasons) {
            stuff.push({
                name: season,
                backend: season
            })
        }

        makeFc([
            {name: 'Season', backend: 'season', objects:stuff}
        ])

        let p = new URLSearchParams(document.location.search);
        firstTime = false;
        if (p.has('q') && firstTime === false) {
            searchItems(p.get('q'));
            firstTime = true;
        } else {
            generateItems();
        }
    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        document.getElementById('content').append(eText);
    });
}

function generateItems() {
    if (items !== null) {
        for (let i = 0; i < items.length; i++) {
            if (i >= currentLoadIndex[0] && i <= currentLoadIndex[1]) {
                makeItemCard(items[i]);
            }
        }
    }
}

function generateMoreItems() {
    if (itemLookMode === false) {
        currentLoadIndex[0] += itemsPerLoad;
        currentLoadIndex[1] += itemsPerLoad;
    
        generateItems();
    }
}

function resetItems () {
    currentLoadIndex[0] = 0;
    currentLoadIndex[1] = 99;

    let o = document.getElementById('objects');
    while(o.firstChild)
        o.removeChild(o.firstChild);
}

function searchItems(urlname) {
    let types = [];
    let rarities = [];
    let seasons = [];

    let name = document.getElementById('iname').value;
    if (urlname !== null) name = urlname;
    
    let tchbox = document.getElementsByName('type');
    let rchbox = document.getElementsByName('rarity');
    let schbox = document.getElementsByName('season');

    for (let checkbox of tchbox) {
        if (checkbox.checked) {
            types.push(checkbox.getAttribute('backend-value'));
        }
    }

    for (let checkbox of rchbox) {
        if (checkbox.checked) {
            rarities.push(checkbox.getAttribute('backend-value'));
        }
    }

    for (let checkbox of schbox) {
        if (checkbox.checked) {
            seasons.push(checkbox.getAttribute('backend-value'));
        }
    }

    if (items !== null) {
        resetItems();
        if (name.length > 0) {
            itemLookMode = true;

            for (let item of items) {
                if (item.name.toLowerCase().includes(name.toLowerCase())) {
    
                    let typematch = types.includes(item.type.id)
                    let raritymatch = rarities.includes(item.rarity.id.toLowerCase());
                    let seasonmatch = true;
                    if (item.introduction !== null) {
                        seasonmatch = seasons.includes(item.introduction.text);
                    }
                    if (types.length < 1) typematch = true;
                    if (rarities.length < 1) raritymatch = true;
                    if (seasons.length < 1) seasonmatch = true;
    
                    if (typematch && raritymatch && seasonmatch) {
                        makeItemCard(item);
                    }
                }
            }
        } else {
            itemLookMode = false;

            generateItems();
        }
    }
}

function makeItemCard(item) {
    let b = document.createElement('div');
    b.classList.add('item-card-parent');

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.setAttribute('data-rarity', item.rarity.id.toLowerCase());

    var hold = document.createElement("div");
    hold.classList.add("item-info");

    var title = document.createElement('span');
    title.innerHTML = item.name;
    title.classList.add("item-title");

    hold.appendChild(title);
    obj.appendChild(hold);

    var img_obj = document.createElement("img");
    var img_src;

    if (item.images.icon != null)
        img_src = item.images.icon;
    if (item.images.featured != null)
        img_src = item.images.featured;
    if (item.images.background != null)
        img_src = item.images.background;   

    let ic = document.createElement('div');
    ic.classList.add("item-image");
    
    img_obj.src = img_src;
    img_obj.setAttribute("title", item.name);
    ic.appendChild(img_obj);

    obj.appendChild(ic);

    obj.addEventListener("click", function() {
        openItemByID(item.id);
    });

    b.append(obj);
    document.getElementById('objects').append(b);
}