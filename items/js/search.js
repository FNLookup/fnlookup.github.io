let offset = 20;
let perPage = 50;
lastScrollPercent = 0
let itemLookMode = false;

let appliedFilters = [];
let scrollUseList = [];

function makeFilterAdvancedClass(filterObject) {
    let dropdownObject = document.getElementById('dropdown-object');
    let main = document.createElement('div');
    main.classList.add('filter-choice');
    let title = document.createElement('span');
    title.classList.add('filter-class', 'fortnite-button-border');
    title.classList.add('links', 'pointer');
    title.innerHTML = filterObject.name;
    let arrow = document.createElement('i');
    arrow.classList.add('arrow');
    main.append(title);
    let menu = document.createElement('div');
    menu.classList.add('dropdown-menu', 'hidden-dropdown');

    let dropdownAllowed = true
    if (filterObject.classes[0].className.startsWith('ButtonType')) dropdownAllowed = false

    for (let filterClass of filterObject.classes) {
        if (filterClass.className.startsWith('ButtonType')) {
            title.addEventListener('click', function() {
                if (appliedFilters.includes(filterClass.objects[0])) {
                    appliedFilters.splice(appliedFilters.indexOf(filterClass.objects[0]), 1);
                    updateFilters();
                } else {
                    appliedFilters.push(filterClass.objects[0]);
                    updateFilters();
                }
            })
        } else {
            let container = document.createElement('div');
            container.classList.add('filter-class-container');
            container.innerHTML = '<h2 class="filter-class-name">' + filterClass.className.toUpperCase() + '</h2>';

            let containerObjects = document.createElement('div');
            containerObjects.classList.add('flex', 'flex-wrap');
            for (let object of filterClass.objects) {
                let objElement = document.createElement('a');
                objElement.classList.add('filter-class-object', 'fortnite-button-border', 'pointer');
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
    }

    if (dropdownAllowed) {
        title.append(arrow);
        title.addEventListener('click', function() {
            menu.classList.toggle('hidden-dropdown');
        })
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
        xBtn.classList.add('x-btn', 'fortnite-button-border', 'pointer');
        viewer.appendChild(xBtn);

        xBtn.onclick = function() {
            appliedFilters.splice(appliedFilters.indexOf(filter), 1);
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

    document.getElementById('objects').innerHTML = '<img src="/assets/images/loading.gif">';
    let requestData = itemFetch(false);
    fetch(requestData.url, requestData.data).then(response => response.json()).then(response => {
        items = response.items;
        // console.log(items);

        nonullitems = items.reverse() //.filter(obj => obj.name.length !== 0);

        scrollUseList = nonullitems
        document.getElementById('item-search-count').innerText = scrollUseList.length

        let requestData = getRequestData('seasons');
        fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
            let seasons = []
            let allowedSeasons = []
            let curChapter;
            for (let ss of r.seasons) {
                curChapter = ss.chapter;
                let chapText = getTranslationKey('search-filters:introduction-chapter').replace('[x0]', curChapter)
                if (seasons[chapText] === undefined) {
                    seasons[chapText] = []
                    allowedSeasons.push(chapText)
                }
                seasons[chapText].push({
                    text: getTranslationKey('search-filters:introduction-chapter-cs').replace('[x0]', ss.chapter).replace('[x1]', ss.seasonInChapter),
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
                name: getTranslationKey('search-filters:introduction'),
                classes: classes
            });

            makeFilterAdvancedClass({
                name: 'Tags',
                classes: [{
                    className: 'Gameplay Tags',
                    objects: [
                        { name: 'Selectable Styles', type: 'Cosmetics.UserFacingFlags.HasVariants', class: 'GameplayTag' },
                        { name: 'Unlockable Styles', type: 'Cosmetics.UserFacingFlags.HasUpgradeQuests', class: 'GameplayTag' },
                        { name: 'Reactive', type: 'CosmeticsCustom.Flags.Reactive', class: 'GameplayTagMultiple' },
                        { name: 'Traversal', type: 'Cosmetics.UserFacingFlags.Emote.Traversal', class: 'GameplayTag' },
                        { name: 'Synced', type: 'Cosmetics.UserFacingFlags.Synced', class: 'GameplayTag' },
                        { name: 'Built In Emote', type: 'Cosmetics.UserFacingFlags.BuiltInEmote', class: 'GameplayTag' },
                        { name: 'Enlightened', type: 'Cosmetics.UserFacingFlags.Enlightened', class: 'GameplayTag' },
                        { name: 'Animated', type: 'CosmeticsCustom.Flags.Animated', class: 'GameplayTagMultiple' },
                    ]
                }, {
                    className: 'Source',
                    objects: [
                        { name: 'Item Shop', type: 'Cosmetics.Source.ItemShop', class: 'GameplayTag' },
                        { name: 'Battle Pass', type: 'CosmeticsCustom.Flags.Source.BattlePass', class: 'GameplayTagMultiple' },
                        { name: 'Crew Pack', type: 'CosmeticsCustom.Flags.Source.CrewPack', class: 'GameplayTagMultiple' },
                    ]
                }, {
                    className: 'Platform Exclusive',
                    objects: [
                        { name: 'Xbox Exclusive', type: 'CosmeticsCustom.Flags.Platform.Xbox', class: 'GameplayTagMultiple' },
                        { name: 'Switch Exclusive', type: 'CosmeticsCustom.Flags.Platform.Nintendo', class: 'GameplayTagMultiple' },
                        { name: 'PS Exclusive', type: 'CosmeticsCustom.Flags.Platform.PlayStation', class: 'GameplayTagMultiple' },
                        { name: 'Streaming Exclusive', type: 'CosmeticsCustom.Flags.Platform.Cloud', class: 'GameplayTagMultiple' },
                        { name: 'Mobile Exclusive', type: 'CosmeticsCustom.Flags.Platform.Mobile', class: 'GameplayTagMultiple' }
                    ]
                }]
            });

            makeFilterAdvancedClass({
                name: '<img src="/assets/images/festival.png">',
                classes: [{
                    className: 'ButtonType=Mode',
                    objects: [
                        { name: 'FESTIVAL', type: 'CosmeticsCustom.Mode.Sparks', class: 'ModeTypes' }
                    ]
                }]
            })
            makeFilterAdvancedClass({
                name: '<img src="/assets/images/rocketracing.png">',
                classes: [{
                    className: 'ButtonType=Mode',
                    objects: [
                        { name: 'ROCKET RACING', type: 'CosmeticsCustom.Mode.DelMar', class: 'ModeTypes' }
                    ]
                }]
            })
            makeFilterAdvancedClass({
                name: '<img src="/assets/images/lego.png">',
                classes: [{
                    className: 'ButtonType=Mode',
                    objects: [
                        { name: 'LEGO® Fortnite', type: 'CosmeticsCustom.Mode.Juno', class: 'ModeTypes' }
                    ]
                }]
            })

            makeFilterAdvancedClass({
                name: 'Sort',
                classes: [{
                        className: 'Name',
                        objects: [
                            { name: 'Name (A-Z)', type: 'Sort.Name.A-Z', class: 'Sort' },
                            { name: 'Name (Z-A)', type: 'Sort.Name.Z-A', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Description',
                        objects: [
                            { name: 'Description (A-Z)', type: 'Sort.Description.A-Z', class: 'Sort' },
                            { name: 'Description (Z-A)', type: 'Sort.Description.Z-A', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Set',
                        objects: [
                            { name: 'Set (A-Z)', type: 'Sort.Set.A-Z', class: 'Sort' },
                            { name: 'Set (Z-A)', type: 'Sort.Set.Z-A', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Rarity',
                        objects: [
                            { name: 'Rarity (A-Z)', type: 'Sort.Rarity.A-Z', class: 'Sort' },
                            { name: 'Rarity (Z-A)', type: 'Sort.Rarity.Z-A', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Series',
                        objects: [
                            { name: 'Series (A-Z)', type: 'Sort.Series.A-Z', class: 'Sort' },
                            { name: 'Series (Z-A)', type: 'Sort.Series.Z-A', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Shop Appearances',
                        objects: [
                            { name: 'Longest Wait', type: 'Sort.Shop.LongestWait', class: 'Sort' },
                            { name: 'Most Recent in Shop', type: 'Sort.Shop.MostRecent', class: 'Sort' }
                        ]
                    },
                    {
                        className: 'Added',
                        objects: [
                            { name: 'Newest', type: 'Sort.Added.Newest', class: 'Sort' },
                            { name: 'Oldest', type: 'Sort.Added.Oldest', class: 'Sort' }
                        ]
                    }
                ]
            })
        })

        let allGameplayTags = []
        for (let i of nonullitems) {
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

        clearChildren(document.getElementById('objects'));

        let p = new URLSearchParams(document.location.search);
        firstTime = false;
        if (p.has('name') && firstTime === false) {
            searchItems(p.get('name'));
            firstTime = true;
        } else {
            resetoffset()
        }

        // Attach the scroll event listener
        window.onscroll = handleScroll
    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        document.getElementById('content').append(eText);
    });
}

function mainFilters() {
    var filters = {
        name: getTranslationKey('search-filters:type'),
        classes: [{
            className: getTranslationKey('search-filters:type-main'),
            objects: [
                { name: getTranslationKey('search-filters:type-main-backbling'), type: 'backpack', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-glider'), type: 'glider', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-loadingscreen'), type: 'loadingscreen', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-outfit'), type: 'outfit', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-pickaxe'), type: 'pickaxe', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-contrail'), type: 'contrail', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-style'), type: 'cosmeticvariant', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-bundle'), type: 'bundle', class: 'Type' },
                { name: getTranslationKey('search-filters:type-main-music'), type: 'music', class: 'Type' },
            ]
        }, {
            className: getTranslationKey('search-filters:type-interacting'),
            objects: [
                { name: getTranslationKey('search-filters:type-interacting-emote'), type: 'emote', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-emoji'), type: 'emoji', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-spray'), type: 'spray', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-toy'), type: 'toy', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-pet'), type: 'pet', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-wrap'), type: 'wrap', class: 'Type' },
                { name: getTranslationKey('search-filters:type-interacting-banner'), type: 'bannertoken', class: 'Type' },
            ]
        }, {
            className: 'Rocket Racing',
            objects: [
                { name: getTranslationKey('search-filters:type-rr-vehicle'), type: 'vehicle_body', class: 'Type' },
                { name: getTranslationKey('search-filters:type-rr-vehicle-skin'), type: 'vehicle_skin', class: 'Type' },
                { name: getTranslationKey('search-filters:type-rr-vehicle-style'), type: 'vehicle_cosmeticvariant', class: 'Type' },
                { name: getTranslationKey('search-filters:type-rr-vehicle-trail'), type: 'vehicle_drifttrail', class: 'Type' },
                { name: getTranslationKey('search-filters:type-rr-wheel'), type: 'vehicle_wheel', class: 'Type' },
                { name: getTranslationKey('search-filters:type-rr-booster'), type: 'vehicle_booster', class: 'Type' },
            ]
        }, {
            className: 'Fortnite Festival',
            objects: [
                { name: getTranslationKey('search-filters:type-ff-bass'), type: 'sparks_bass', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-drum'), type: 'sparks_drum', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-lead'), type: 'sparks_guitar', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-keys'), type: 'sparks_keyboard', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-mics'), type: 'sparks_microphone', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-aura'), type: 'sparks_aura', class: 'Type' },
                { name: getTranslationKey('search-filters:type-ff-jamtrack'), type: 'sparks_song', class: 'Type' },
            ]
        }, {
            className: 'LEGO® Fortnite',
            objects: [
                { name: getTranslationKey('search-filters:type-lf-kit'), type: 'building_set', class: 'Type' },
                { name: getTranslationKey('search-filters:type-lf-dec'), type: 'building_prop', class: 'Type' },
            ]
        }, {
            className: getTranslationKey('search-filters:type-additional'),
            objects: [
                { name: getTranslationKey('search-filters:type-additional-battlebus'), type: 'battlebus', class: 'Type' },
                { name: getTranslationKey('search-filters:type-additional-itemaccess'), type: 'itemaccess', class: 'Type' },
            ]
        }]
    }

    makeFilterAdvancedClass(filters);

    let requestData = getRequestData('rarities');
    fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
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
            className: getTranslationKey('search-filters:rarityseries-rarity'),
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
            className: getTranslationKey('search-filters:rarityseries-series'),
            objects: classObjects
        })

        makeFilterAdvancedClass({
            name: getTranslationKey('search-filters:rarityseries'),
            classes: classes
        });
    }).catch(error => {
        console.error(error)
    })
}

function searchItems(urlname) {
    let nameorid = document.getElementById('iname').value;
    if (urlname !== undefined) {
        nameorid = urlname;
        document.getElementById('iname').value = urlname;
    }

    // window.history.replaceState({ id: "100" }, nameorid + " - Search - FNLookup", "fnlookup/search.html" + (nameorid.length > 0 ? "?name=" + nameorid : ""));
    // this code wont work in github pages

    let searchBarMatched = [];
    for (let item of nonullitems) {
        if ((item.name.toLowerCase().includes(nameorid.toLowerCase()) || item.id.toLowerCase().includes(nameorid.toLowerCase())) && !searchBarMatched.includes(item)) {
            searchBarMatched.push(item);
        }
    }
    if (nameorid.length < 1) {
        searchBarMatched = nonullitems;
        scrollUseList = nonullitems
    }

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
        if (filter.class === 'ModeTypes') {
            if (filter.type === 'CosmeticsCustom.Mode.Sparks') {
                typeFilters.push('sparks_song', "sparks_bass",
                    "sparks_drum",
                    "sparks_guitar",
                    "sparks_keyboard",
                    "sparks_microphone",
                    "sparks_aura")
            }
            if (filter.type === 'CosmeticsCustom.Mode.DelMar') {
                typeFilters.push('vehicle-body', "vehicle_skin",
                    "vehicle_wheel",
                    "vehicle_cosmeticvariant",
                    "vehicle_drifttrail",
                    "vehicle_booster")
            }
            if (filter.type === 'CosmeticsCustom.Mode.Juno') {
                typeFilters.push('building_set', "building_prop")
            }
        }
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
                gameplayTagFilters.push('Cosmetics.UserFacingFlags.Reactive.WeaponFire', 'Cosmetics.UserFacingFlags.Reactive.TimeOfDay', 'Cosmetics.UserFacingFlags.Reactive')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Source.BattlePass') {
                gameplayTagFilters.push('IncludesTag=.BattlePass')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Source.CrewPack') {
                gameplayTagFilters.push('IncludesTag=.CrewPack')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Platform.Xbox') {
                gameplayTagFilters.push('IncludesTag=.XboxHW')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Platform.Nintendo') {
                gameplayTagFilters.push('IncludesTag=.Nintendo')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Platform.PlayStation') {
                gameplayTagFilters.push('IncludesTag=.PS4', 'IncludesTag=.SonyPlusPack', 'IncludesTag=.PlaystationActivation')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Platform.Cloud') {
                gameplayTagFilters.push('IncludesTag=.AmazonLuna')
            }
            if (filter.type === 'CosmeticsCustom.Flags.Platform.Mobile') {
                gameplayTagFilters.push('IncludesTag=.Samsung', 'IncludesTag=.Huawei')
            }
            //Platform.XboxHW
            //
        }
        if (filter.class === 'Sort') {
            sorts.push(filter.type);
        }
    }

    matchingItems = filterItems(searchBarMatched, typeFilters, rarityFilters, seriesFilters, gameplayTagFilters);

    console.log(sorts)

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
    }

    scrollUseList = matchingItems;
    document.getElementById('item-search-count').innerText = scrollUseList.length

    clearChildren(document.getElementById('objects'));
    resetoffset()
}

function filterItems(filteredItems, chosenType, chosenRarity, chosenSeries, chosenGameplayTags) {
    filteredGameplayTags = chosenGameplayTags
    for (gt in filteredGameplayTags) {
        let tag = filteredGameplayTags[gt]
        if (tag.startsWith('IncludesTag=')) {
            filteredGameplayTags[gt] = tag.split('=')[1]
        }
    }

    //console.log(chosenType, chosenRarity, chosenSeries, filteredGameplayTags)

    return filteredItems.filter(item => {
        let matchesType = chosenType.length < 1 || chosenType.includes(item.type.id);
        let matchesRarity = chosenRarity.length < 1 || chosenRarity.includes(item.rarity.id);
        let matchesSeries = chosenSeries.length < 1 || (item.series && chosenSeries.includes(item.series.id));

        let matchesGameplayTags = filteredGameplayTags.length < 1 || filteredGameplayTags.some(chosenTag => {
            return item.gameplayTags.some(tag => tag.includes(chosenTag));
        });

        //console.log(item.gameplayTags, matchesGameplayTags)

        let matchAll = matchesType && matchesRarity && matchesSeries && matchesGameplayTags;
        return matchAll;
    });
}

function makeItemCard(item) {
    if (item.name.length === 0) item.name = item.id

    let b = document.createElement('a');
    b.classList.add('item-card-parent');

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.classList.add("fortnite-button-border");
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
    var img_src = '/assets/images/unknown-cosmetic.png';
    var suffix = '?width=165'
    if (item.images.icon_background != null)
        img_src = item.images.icon_background + suffix;
    if (item.images.icon != null)
        img_src = item.images.icon + suffix;
    if (item.images.featured != null)
        img_src = item.images.featured + suffix;
    if (item.images.background != null)
        img_src = item.images.background + suffix;

    if (item.displayAssets != null) {
        if (item.displayAssets.length > 0) {
            let displayAsset = item.displayAssets[0];
            if (displayAsset.url !== null)
                img_src = displayAsset.url + suffix;
            if (displayAsset.background !== null)
                img_src = displayAsset.background + suffix;
        }
    }

    let ic = document.createElement('div');
    ic.classList.add("item-image");

    //if (img_src === null || img_src === undefined) return
    img_obj.src = img_src;

    img_obj.setAttribute("title", item.name);
    ic.appendChild(img_obj);

    obj.appendChild(ic);

    b.href = getItemLinkByID(item.id);

    b.append(obj);
    document.getElementById('objects').append(b);

    // console.log(item.name, scrollUseList.indexOf(item))
}


function getScrollPercent() {
    const winHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    const scrollTop = window.scrollY;
    const trackLength = docHeight - winHeight;
    const percentScrolled = Math.floor((scrollTop / trackLength) * 100);
    return percentScrolled;
}

function generateItems(itemsarg) {
    for (let item of itemsarg)
        makeItemCard(item)
    offset += perPage
}

function handleScroll() {
    // console.log('scroll')
    const currentScrollPercent = getScrollPercent();
    // console.log(currentScrollPercent)
    if (currentScrollPercent > 90) {
        //console.log('im going crazh', offset)
        const nextItems = scrollUseList.slice(offset, offset + perPage); // Extract the next 50 items
        generateItems(nextItems);
        lastScrollPercent = currentScrollPercent;
    }
}

function resetoffset() {
    generateItems(scrollUseList.slice(0, perPage));
    offset = perPage
}