let currentLoadIndex = [0, 24];
let itemsPerLoad = 25;
let itemLookMode = false;

let appliedFilters = [];
let scrollUseList = [];

/*
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

        let menu = document.createElement('div');
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
}*/

function makeFilterAdvancedClass(filterObject) {
    let dropdownObject = document.getElementById('dropdown-object');
    let main = document.createElement('div');
    main.classList.add('filter-choice');
    let title = document.createElement('span');
    title.classList.add('filter-class');
    title.classList.add('links', 'pointer');
    title.innerHTML = filterObject.name;
    let arrow = document.createElement('i');
    arrow.classList.add('arrow');
    title.append(arrow);
    main.append(title);
    let menu = document.createElement('div');
    menu.classList.add('dropdown-menu', 'hidden');

    title.addEventListener('click', function() {
        menu.classList.toggle('hidden');
    })

    for (let filterClass of filterObject.classes) {
        let container = document.createElement('div');
        container.classList.add('filter-class-container');
        container.innerHTML = '<h2 class="filter-class-name">' + filterClass.className.toUpperCase() + '</h2>';
        
        let containerObjects = document.createElement('div');
        containerObjects.classList.add('flex', 'flex-wrap');
        for (let object of filterClass.objects) {
            let objElement = document.createElement('a');
            objElement.classList.add('filter-class-object', 'pointer');
            objElement.setAttribute('type', object.type);
            objElement.innerHTML = object.name;

            objElement.onclick = function() {
                if (!appliedFilters.includes(object)) {
                    appliedFilters.push(object);
                    updateFilters();
                }
            }

            containerObjects.appendChild(objElement);
        }
        container.append(containerObjects)

        menu.append(container);
    }

    main.append(menu);
    dropdownObject.appendChild(main);
}

function updateFilters() {
    let main = document.getElementById('selected-filters');
    clearChildren(main);

    for (let filter of appliedFilters) {
        let viewer = gne('a');
        viewer.classList.add('filter-class-object', 'flex', 'flex-center');
        viewer.setAttribute('type', filter.type);
        viewer.innerHTML = filter.name;

        let xBtn = gne('i');
        xBtn.classList.add('x-btn', 'pointer');
        viewer.appendChild(xBtn);

        xBtn.onclick = function () {
            appliedFilters.splice(appliedFilters.indexOf(filter),1);
            updateFilters();
        }

        main.append(viewer);
        
        //<a class="filter-class-object pointer" type="Common">COMMON</a>
    }

    let clrBtn = gne('button');
    clrBtn.classList.add('filters-delete-btn');
    clrBtn.innerHTML = 'Delete All';
    clrBtn.onclick = deleteFilters;
    main.append(clrBtn);

    searchItems()
}

function deleteFilters() {
    appliedFilters = [];
    updateFilters();
}

function downloadItems() {
    mainFilters();

    fetch(geturllang('https://fortniteapi.io/v2/items/list?fields=id,introduction,images,displayAssets,name,type,rarity,series,gameplayTags', 1), {
        headers: {'Authorization': keyFNAPIIo}
    }).then(response => response.json()).then(response => {
        items = response.items;
        items = items.reverse();

        scrollUseList = items;

        fetch(geturllang('https://fortniteapi.io/v1/seasons/list', 1), {
            headers: {'Authorization': keyFNAPIIo}}
        ).then(r => r.json()).then(r => {
            let seasons = []
            let allowedSeasons = []
            let curChapter;
            for (let ss of r.seasons) {
                curChapter = ss.chapter;
                if (seasons['Chapter ' + curChapter] === undefined) {
                    seasons['Chapter ' + curChapter] = []
                    allowedSeasons.push('Chapter ' + curChapter)
                }
                seasons['Chapter ' + curChapter].push({
                    text: 'C' + ss.chapter + 'S' + ss.seasonInChapter,
                    season: ss.seasonInChapter,
                    gameplayTag: 'Cosmetics.Filter.Season.' + ss.season
                })
            }
            let classes = []
            for (let object of allowedSeasons) {
                let classObjects = []
                for (let co of seasons[object]) {
                    classObjects.push({
                        name: co.text,
                        type: co.gameplayTag,
                        class: 'GameplayTag'
                    })
                }
                classes.push({
                    className: object,
                    objects: classObjects
                })
            }
            makeFilterAdvancedClass({
                name: 'Introduction',
                classes: classes
            });

            makeFilterAdvancedClass({
                name: 'Tags',
                classes: [
                    {
                        className: 'Gameplay Tags',
                        objects: [
                            { name: 'Selectable Styles', type: 'Cosmetics.UserFacingFlags.HasVariants', class: 'GameplayTag' },
                            { name: 'Unlockable Styles', type: 'Cosmetics.UserFacingFlags.HasUpgradeQuests', class: 'GameplayTag' },
                            { name: 'Reactive', type: 'CosmeticsCustom.Flags.Reactive', class: 'GameplayTagMultiple' },
                            { name: 'Traversal', type: 'Cosmetics.UserFacingFlags.Emote.Traversal', class: 'GameplayTag' },
                            { name: 'Synced', type: 'Cosmetics.UserFacingFlags.Synced', class: 'GameplayTag' },
                            { name: 'Built In Emote', type: 'Cosmetics.UserFacingFlags.BuiltInEmote', class: 'GameplayTag' },
                            { name: 'Enlightened', type: 'Cosmetics.UserFacingFlags.Enlightened', class: 'GameplayTag' },
                            { name: 'Animated', type: 'CosmeticsCustom.Flags.Animated', class: 'GameplayTagMultiple' }
                        ]
                    }
                ]
            });
        })

        let allGameplayTags = []
        for (let i of items) {
            for (let g of i.gameplayTags) {
                allGameplayTags.push(g)
            }
        }

        var array = allGameplayTags,
        result = [];

        array.forEach(s => s
            .split('.')
            .reduce((object, value) => {
                var item = (object.children = object.children || []).find(q => q.value === value);
                if (!item) object.children.push(item = { value: value })
                return item;
            }, { children: result })
        );

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

function mainFilters() {
    var filters = {
            name: 'Type',
            classes: [
                {
                    className: 'Type',
                    objects: [
                        {name: 'Back Bling', type: 'backpack', class: 'Type'},
                        {name: 'Emote', type: 'emote', class: 'Type'},
                        {name: 'Glider', type: 'glider', class: 'Type'},
                        {name: 'Emoji', type: 'emoji', class: 'Type'},
                        {name: 'Loading Screen', type: 'loadingscreen', class: 'Type'},
                        {name: 'Outfit', type: 'outfit', class: 'Type'},
                        {name: 'Pickaxe', type: 'pickaxe', class: 'Type'},
                        {name: 'Contrail', type: 'contrail', class: 'Type'},
                        {name: 'Style', type: 'cosmeticvariant', class: 'Type'},
                        {name: 'Bundle', type: 'bundle', class: 'Type'},
                        {name: 'Spray', type: 'spray', class: 'Type'},
                        {name: 'Toy', type: 'toy', class: 'Type'},
                        {name: 'Pet', type: 'pet', class: 'Type'},
                        {name: 'Music Pack', type: 'music', class: 'Type'},
                        {name: 'Wrap', type: 'wrap', class: 'Type'},
                        {name: 'Banner', type: 'bannertoken', class: 'Type'},
                    ]
                }
            ]
        }

    makeFilterAdvancedClass(filters);

    fetch(geturllang("https://fortniteapi.io/v2/rarities", 1), {
        headers: { 'Authorization': keyFNAPIIo}
    }).then(r=>r.json()).then(r=>{
        let classes = []
        let classObjects = []
        for (let a of r.rarities) {
            classObjects.push({
                name: a.name,
                type: a.id,
                class: 'Rarity'
            })
        }
        classes.push({
            className: 'Rarity',
            objects: classObjects
        })
        classObjects = []
        for (let b of r.series) {
            classObjects.push({
                name: b.name,
                type: b.id,
                class: 'Series'
            })
        }
        classes.push({
            className: 'Series',
            objects: classObjects
        })

        makeFilterAdvancedClass({
            name: 'Rarity/Series',
            classes: classes
        });
    }).catch(error => {
        console.error(error)
    })
}

function searchItems(urlname) {
    let nameorid = document.getElementById('iname').value;
    if (urlname !== undefined) nameorid = urlname;

    resetItems();

    let searchBarMatched = [];
    for (let item of items) {
        if (item.name.toLowerCase().includes(nameorid.toLowerCase()) && !searchBarMatched.includes(item)) {
            searchBarMatched.push(item);
        }
    }
    if (nameorid.length < 1) searchBarMatched = items;

    let matchingItems = [];

    const gameplayTagFilters = [];
    const typeFilters = [];
    const rarityFilters = [];
    const seriesFilters = [];
    for (let filter of appliedFilters) {
        if (filter.class === 'Type')
            typeFilters.push(filter.type)
        if (filter.class === 'Rarity')
            rarityFilters.push(filter.type)
        if (filter.class === 'Series')
            seriesFilters.push(filter.type);
        if (filter.class === 'GameplayTag')
            gameplayTagFilters.push(filter.type);
        if (filter.class === 'GameplayTagMultiple') {
            if (filter.type === 'CosmeticsCustom.Flags.Animated') {
                gameplayTagFilters.push('Cosmetics.UserFacingFlags.Emoticon.Animated', 'Cosmetics.UserFacingFlags.Wrap.Animated', 'Cosmetics.UserFacingFlags.LoadingScreen.Animated', 'Cosmetics.UserFacingFlags.Spray.Animated');
            }
            if (filter.type === 'CosmeticsCustom.Flags.Reactive') {
                gameplayTagFilters.push('Cosmetics.UserFacingFlags.Reactive.WeaponFire', 'Cosmetics.UserFacingFlags.Reactive.TimeOfDay')
            }
        }
    }

    matchingItems = filterItems(searchBarMatched, typeFilters, rarityFilters, seriesFilters, gameplayTagFilters);
    scrollUseList = matchingItems;

    clearChildren(document.getElementById('objects'));
    generateItems();
}

function filterItems(filteredItems, chosenType, chosenRarity, chosenSeries, chosenGameplayTags) {
    return filteredItems.filter(item => {
        let matchesType = chosenType.length <1 || chosenType.includes(item.type.id);
        let matchesRarity = chosenRarity.length <1 || chosenRarity.includes(item.rarity.id);
        let matchesSeries = chosenSeries.length <1 || (item.series && chosenSeries.includes(item.series.id));
        let matchesGameplayTags = chosenGameplayTags.length <1 || item.gameplayTags.some(tag => chosenGameplayTags.includes(tag));
  
        let matchAll = matchesType && matchesRarity && matchesSeries && matchesGameplayTags;
        return matchAll;
    });
}

function generateItems() {
    if (scrollUseList !== null) {
        for (let i = 0; i < scrollUseList.length; i++) {
            if (i >= currentLoadIndex[0] && i <= currentLoadIndex[1]) {
                makeItemCard(scrollUseList[i]);
            }
        }
    }
}

function generateMoreItems() {
    currentLoadIndex[0] += itemsPerLoad;
    currentLoadIndex[1] += itemsPerLoad;
    
    generateItems();
}

function resetItems () {
    currentLoadIndex[0] = 0;
    currentLoadIndex[1] = 99;
}

function makeItemCard(item) {
    let b = document.createElement('a');
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
    if (item.images.icon_background != null)
        img_src = item.images.icon_background;
    if (item.images.icon != null)
        img_src = item.images.icon;
    if (item.images.featured != null)
        img_src = item.images.featured;
    if (item.images.background != null)
        img_src = item.images.background;

    if (item.displayAssets.length > 0) {
        let displayAsset = item.displayAssets[0];
        if (displayAsset.url !== null)
            img_src = displayAsset.url;
        if (displayAsset.background !== null)
            img_src = displayAsset.background;
    }

    let ic = document.createElement('div');
    ic.classList.add("item-image");
    
    img_obj.src = img_src;
    img_obj.setAttribute("title", item.name);
    ic.appendChild(img_obj);

    obj.appendChild(ic);

    b.href = getItemLinkByID(item.id);

    b.append(obj);
    document.getElementById('objects').append(b);
}