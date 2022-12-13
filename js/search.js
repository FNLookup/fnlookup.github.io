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
                {name: 'Spray', backend: 'spray'},
                {name: 'Toy', backend: 'toy'},
                {name: 'Pet', backend: 'petcarrier'}
            ]
        },
        {
            name: 'Rarity',
            backend: 'rarity',
            objects: [
                {name: 'Legendary', backend: 'legendary'},
                {name: 'Epic', backend: 'epic'},
                {name: 'Rare', backend: 'rare'},
                {name: 'Uncommon', backend: 'uncommon'},
                {name: 'Common', backend: 'common'},
                {name: 'Lava Series', backend: 'lava'},
                {name: 'Dark Series', backend: 'dark'},
                {name: 'Marvel Series', backend: 'marvel'},
                {name: 'Star Wars Series', backend: 'starwars'},
                {name: 'Gaming Legends Series', backend: 'gaminglegends'},
                {name: 'Icon Series', backend: 'icon'},
                {name: 'Slurp Series', backend: 'slurp'},
                {name: 'Shadow Series', backend: 'shadow'}
            ]
        },
        {
            name: 'Season',
            backend: 'season',
            objects: [
                {name: 'Chapter 1, Season 1', backend: '1'},
                {name: 'Chapter 1, Season 2', backend: '2'},
                {name: 'Chapter 1, Season 3', backend: '3'},
                {name: 'Chapter 1, Season 4', backend: '4'},
                {name: 'Chapter 1, Season 5', backend: '5'},
                {name: 'Chapter 1, Season 6', backend: '6'},
                {name: 'Chapter 1, Season 7', backend: '7'},
                {name: 'Chapter 1, Season 8', backend: '8'},
                {name: 'Chapter 1, Season 9', backend: '9'},
                {name: 'Chapter 1, Season 10', backend: '10'},
                {name: 'Chapter 2, Season 1', backend: '11'},
                {name: 'Chapter 2, Season 2', backend: '12'},
                {name: 'Chapter 2, Season 3', backend: '13'},
                {name: 'Chapter 2, Season 4', backend: '14'},
                {name: 'Chapter 2, Season 5', backend: '15'},
                {name: 'Chapter 2, Season 6', backend: '16'},
                {name: 'Chapter 2, Season 7', backend: '17'},
                {name: 'Chapter 2, Season 8', backend: '18'},
                {name: 'Chapter 3, Season 1', backend: '19'},
                {name: 'Chapter 3, Season 2', backend: '20'},
                {name: 'Chapter 3, Season 3', backend: '21'},
                {name: 'Chapter 3, Season 4', backend: '22'},
                {name: 'Chapter 4, Season 1', backend: '23'}
            ]
        }
    ]

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
            checkbox.setAttribute('backend-value', option.backend);

            let label = document.createElement('a');
            label.innerHTML = option.name;

            chbox.append(checkbox);
            chbox.append(label);

            item.append(chbox);

            menu.appendChild(item);
        }

        main.append(menu);
        dropdownObject.appendChild(main);
    }
}

function downloadItems() {
    fetch('https://fortnite-api.com/v2/cosmetics/br').then(response => response.json()).then(response => {
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

        items = response.data;

        generateItems();
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

function searchItems() {
    let types = [];
    let rarities = [];
    let seasons = [];; // int array

    let name = document.getElementById('iname').value;
    
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
            seasons.push(parseInt(checkbox.getAttribute('backend-value')));
        }
    }

    if (items !== null) {
        resetItems();
        if (name.length > 0) {
            itemLookMode = true;

            for (let item of items) {
                if (item.name.toLowerCase().includes(name.toLowerCase())) {
    
                    let typematch = types.includes(item.type.value)
                    let raritymatch = rarities.includes(item.rarity.value);
                    let seasonmatch = seasons.includes(item.introduction.backendValue);
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
    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.setAttribute('data-rarity', item.rarity.value);

    var hold = document.createElement("div");
    hold.classList.add("item-info");

    var title = document.createElement('span');
    title.innerHTML = item.name;
    title.classList.add("item-title");

    hold.appendChild(title);
    obj.appendChild(hold);

    var img_obj = document.createElement("img");
    var img_src;

    if (item.images.featured != null)
        img_src = item.images.featured;
    else if (item.images.icon != null)
        img_src = item.images.icon;
    else if (item.images.smallIcon != null)
        img_src = item.images.smallIcon;

    img_obj.src = img_src;
    img_obj.setAttribute("title", item.name);
    obj.appendChild(img_obj);

    obj.addEventListener("click", function() {
        window.location.href = 'item.html?q=' + item.name.toLowerCase();
    });

    document.getElementById('objects').append(obj);
}