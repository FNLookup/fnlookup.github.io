let currentLoadIndex = [0, 24];
let itemsPerLoad = 25;
let itemLookMode = false;

let appliedFilters = [];
let scrollUseList = [];

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
                let ignoreFilterApply = false;
                if (filterObject.ignoreCosmeticFilters !== undefined && !filterObject.ignoreCosmeticFilters)
                    ignoreFilterApply = true;   

                if (!ignoreFilterApply) {
                    if (!appliedFilters.includes(object)) {
                        appliedFilters.push(object);
                        updateFilters();
                    }
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

    fetch(geturllang('https://fortniteapi.io/v2/items/list', 1), {
        headers: {'Authorization': keyFNAPIIo}
    }).then(response => response.json()).then(response => {
        items = response.items;
        items = items.reverse();

        for (let item of items) {
            if (!item.name || item.name.length < 1 || item.name === '') {
                item.name = item.id;
            }
        }

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

            makeFilterAdvancedClass({
                name: 'Sort',
                classes: [
                    {
                        className: 'Name',
                        objects: [
                            { name: 'Name (A-Z)', type: 'Sort.Name.A-Z', class: 'Sort'},
                            { name: 'Name (Z-A)', type: 'Sort.Name.Z-A', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Description',
                        objects: [
                            { name: 'Description (A-Z)', type: 'Sort.Description.A-Z', class: 'Sort'},
                            { name: 'Description (Z-A)', type: 'Sort.Description.Z-A', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Set',
                        objects: [
                            { name: 'Set (A-Z)', type: 'Sort.Set.A-Z', class: 'Sort'},
                            { name: 'Set (Z-A)', type: 'Sort.Set.Z-A', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Rarity',
                        objects: [
                            { name: 'Rarity (A-Z)', type: 'Sort.Rarity.A-Z', class: 'Sort'},
                            { name: 'Rarity (Z-A)', type: 'Sort.Rarity.Z-A', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Series',
                        objects: [
                            { name: 'Series (A-Z)', type: 'Sort.Series.A-Z', class: 'Sort'},
                            { name: 'Series (Z-A)', type: 'Sort.Series.Z-A', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Shop Appearances',
                        objects: [
                            { name: 'Longest Wait', type: 'Sort.Shop.LongestWait', class: 'Sort'},
                            { name: 'Most Recent in Shop', type: 'Sort.Shop.MostRecent', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'Added',
                        objects: [
                            { name: 'Newest', type: 'Sort.Added.Newest', class: 'Sort'},
                            { name: 'Oldest', type: 'Sort.Added.Oldest', class: 'Sort'}
                        ]
                    },
                    {
                        className: 'API Interest',
                        objects: [
                            { name: 'Highest', type: 'Sort.Interest.Highest', class: 'Sort'},
                            { name: 'Lowest', type: 'Sort.Interest.Lowest', class: 'Sort'}
                        ]
                    }
                ]
            })
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

        var scrollPercentage;
        window.onscroll = function() {
            var h = document.documentElement, 
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
        
            scrollPercentage = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        
            if (scrollPercentage >= 95) {
                generateMoreItems();
            }
        };        
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

    const sorts = [];
    
    var encounteredOne = false;
    for (let filter of appliedFilters) {
        if (encounteredOne && filter.class === 'Sort') {
            appliedFilters.splice(appliedFilters.indexOf(filter), 1);
            updateFilters();
            return;
        }
        if (filter.class === 'Sort') encounteredOne = true;
    }

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
        if (filter.class === 'Sort') {
            sorts.push(filter.type);
        }
    }

    matchingItems = filterItems(searchBarMatched, typeFilters, rarityFilters, seriesFilters, gameplayTagFilters);

    if (sorts.length > 0) {
        let sort = sorts[0]
        if (['Sort.Name.A-Z', 'Sort.Name.Z-A', 'Sort.Description.A-Z', 'Sort.Description.Z-A', 'Sort.Set.A-Z', 'Sort.Set.Z-A', 'Sort.Rarity.A-Z', 'Sort.Rarity.Z-A', 'Sort.Series.A-Z', 'Sort.Series.Z-A'].includes(sort)) {
            if (['Sort.Set.A-Z', 'Sort.Set.Z-A'].includes(sort)) {
                matchingItems = matchingItems.filter(function(item) {
                    return item.set != null;
                });
            }
            if (['Sort.Series.A-Z', 'Sort.Series.Z-A'].includes(sort)) {
                matchingItems = matchingItems.filter(function(item) {
                    return item.series != null;
                });
            }

            matchingItems.sort(function(a, b) {
                // ignore upper and lowercase
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();

                if (sort === 'Sort.Name.Z-A') {
                    nameA = b.name.toUpperCase();
                    nameB = a.name.toUpperCase();
                } else if (sort === 'Sort.Description.A-Z') {
                    nameA = a.description.toUpperCase();
                    nameB = b.description.toUpperCase();
                } else if (sort === 'Sort.Description.Z-A') {
                    nameA = b.description.toUpperCase();
                    nameB = a.description.toUpperCase();
                } else if (sort === 'Sort.Set.A-Z') {
                    nameA = a.set.name.toUpperCase();
                    nameB = b.set.name.toUpperCase();
                } else if (sort === 'Sort.Set.Z-A') {
                    nameA = b.set.name.toUpperCase();
                    nameB = a.set.name.toUpperCase();
                } else if (sort === 'Sort.Rarity.A-Z') {
                    nameA = a.rarity.name.toUpperCase();
                    nameB = b.rarity.name.toUpperCase();
                } else if (sort === 'Sort.Rarity.Z-A') {
                    nameA = b.rarity.name.toUpperCase();
                    nameB = a.rarity.name.toUpperCase();
                } else if (sort === 'Sort.Series.A-Z') {
                    if (a.series === null || b.series === null) {
                        return 0;
                    }
                    nameA = a.series.name.toUpperCase();
                    nameB = b.series.name.toUpperCase();
                } else if (sort === 'Sort.Series.Z-A') {
                    if (a.series === null || b.series === null) {
                        return 0;
                    }
                    nameA = b.series.name.toUpperCase();
                    nameB = a.series.name.toUpperCase();
                }

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
        } 
        if (['Sort.Shop.LongestWait', 'Sort.Shop.MostRecent'].includes(sort)) {
            matchingItems = matchingItems.filter(function(item) {
                return item.lastAppearance != null;
            });

            if (sort === 'Sort.Shop.MostRecent') {
                matchingItems.sort(function(a, b) {
                    return new Date(b.lastAppearance) - new Date(a.lastAppearance);
                });     
            } 

            if (sort === 'Sort.Shop.LongestWait') {
                //Calculate the wait time for each item in days
                matchingItems.forEach(function(item) {
                    var current_date = new Date();
                    var lastAppearance = new Date(item.lastAppearance);
                    item.wait = (current_date - lastAppearance) / (1000 * 60 * 60 * 24);
                });

                //Sort the items by the wait time in ascending order
                matchingItems.sort(function(a, b) {
                    return b.wait - a.wait;
                });
            }
        }
        if (['Sort.Added.Newest', 'Sort.Added.Oldest'].includes(sort)) {
            if (sort === 'Sort.Added.Newest') {
                matchingItems.sort(function(a, b) {
                    var date1 = new Date(a.added.date);
                    var date2 = new Date(b.added.date);
                    return date2 - date1;
                });                
            }

            if (sort === 'Sort.Added.Oldest') {
                matchingItems.sort(function(a, b) {
                    var date1 = new Date(a.added.date);
                    var date2 = new Date(b.added.date);
                    return date1 - date2;
                });
            }
        }
        if (['Sort.Interest.Lowest', 'Sort.Interest.Highest'].includes(sort)) {
            if (sort === 'Sort.Interest.Lowest') {
                matchingItems.sort(function(a, b) {
                    return a.interest - b.interest;
                });                
            }

            if (sort === 'Sort.Interest.Highest') {
                matchingItems.sort(function(a, b) {
                    return b.interest - a.interest;
                });
            }
        }
    }

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
    hold.setAttribute('data-rarity', item.rarity.id.toLowerCase());

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

    if (item.displayAssets != null) {
        if (item.displayAssets.length > 0) {
            let displayAsset = item.displayAssets[0];
            if (displayAsset.url !== null)
                img_src = displayAsset.url;
            if (displayAsset.background !== null)
                img_src = displayAsset.background;
        }
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