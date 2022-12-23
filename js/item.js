function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('q')) {

        fetch(geturllang('https://fortniteapi.io/v2/items/list', 1), {
            headers: {'Authorization': localStorage.keyFNAPIIo}
        }).then(data => data.json()).then(data => {
            let items = [];

            for (let item of data.items) {
                if (item.name.toLowerCase() === params.get('q').toLowerCase()) {
                    items.push(item);
                }
            }

            const response = items;

            if (response.length > 0) {
                for (let item of response) {
                    console.log(item);

                    let content = document.getElementById('page-content');

                    let mainObject = gne('div');

                    let main = document.createElement('div');
                    main.classList.add('flex-media');

                    let left = document.createElement('div');
                    left.classList.add('d-50-media');
                    let right = document.createElement('div');
                    right.classList.add('d-50-media');
                    right.classList.add('item-info-right');
                    main.append(left);
                    main.append(right);

                    // image part
                    let portrait = document.createElement('div');
                    portrait.classList.add('item-card');
                    portrait.classList.add('no-resize');
                    portrait.setAttribute('data-rarity', item.rarity.id.toLowerCase());

                    let image = document.createElement('img');
                    image.title = item.name;
                    image.classList.add('item-card-item-display');
                    
                    if (item.images !== null) {
                        var img_src;
                        if (item.images.icon != null)
                            img_src = item.images.icon;
                        if (item.images.featured != null)
                            img_src = item.images.featured;
                        if (item.images.background != null)
                            img_src = item.images.background;
            
                        image.src = img_src;
                    }
                    portrait.append(image);
                    left.append(portrait);
                    // end of image part

                    let name = document.createElement('h1');
                    if (item.name != null) {
                        name.innerHTML = item.name;
                    }

                    name.classList.add('flex');
                    name.classList.add('flex-wrap');

                    if (item.type != null) {
                        let item_type = document.createElement('a');
                        item_type.classList.add('item-type-label');
                        item_type.innerHTML = item.type.name;
                        name.appendChild(item_type);
                    }
                    
                    if (item.rarity != null) {
                        let rarity = document.createElement('a');
                        rarity.classList.add('rarity-label');
                        rarity.setAttribute('data-rarity', item.rarity.id.toLowerCase());
                        rarity.innerHTML = item.rarity.name;
                        name.appendChild(rarity);
                    }

                    right.append(name);

                    if (item.description !== null) {
                        let description = document.createElement('h2');
                        description.innerHTML = item.description;
                        right.append(description);
                    }

                    if (item.set != null) {
                        let set = document.createElement('h3');
                        set.innerHTML = item.set.partOf;
                        right.appendChild(set);
                    }

                    mainObject.append(main);

                    fetch(otherargument(geturllang('https://fortnite-api.com/v2/cosmetics/br/search?name=' + item.name, 0), 'searchLanguage')).then(data => data.json()).then(data => {
                        if (data.status !== 200) {
                            let eTitle = document.createElement('h1');
                            let eText = document.createElement('h2');
                            let error = data.status + ': ' + data.error;
                            console.log(error);
                            eTitle.innerHTML = 'Error: ' + data.status;
                            eText.innerHTML = data.error;
                            document.getElementById('page-content').append(eTitle);
                        }

                        let item = data.data;

                        if (item.introduction !== null) {
                            let introduction = document.createElement('h3');
                            introduction.innerHTML = item.introduction.text;
                            introduction.title = 'Introduced in Season ' + item.introduction.backendValue;
                            right.append(introduction);
                        }

                        
                        if (item.shopHistory !== null) {
                            let release = document.createElement('p');
                            release.innerHTML = 'Released ' + getFormatDate(new Date(item.shopHistory[0].split('T')[0]));
                            right.appendChild(release);
                
                            let lastSeen = document.createElement('p');
                            lastSeen.innerHTML = 'Last Appearance: ' + getFormatDate(new Date(item.shopHistory[item.shopHistory.length - 1].split('T')[0]));
                            right.appendChild(lastSeen);
                
                            let ocurrences = document.createElement('p');
                            ocurrences.innerHTML = 'Ocurrences: ' + item.shopHistory.length;
                            right.appendChild(ocurrences);

                            let hlist = document.createElement('div');
                            hlist.classList.add('shop-history');
            
                            for (let i = 0; i < item.shopHistory.length; i++) {
                                let row = gne('div');
                                let left = gne('div');
                                let right = gne('div');

                                row.classList.add('flex');
                                left.classList.add('d-70');
                                right.classList.add('d-30', 'flex', 'flex-center', 'flex-hcenter');

                                row.append(left, right);

                                let date = document.createElement('p');
                                var hdate = new Date(item.shopHistory[i].split('T')[0]);
                                date.innerHTML = getFormatDate(hdate);
                                date.classList.add('shop-history-element');

                                left.append(date);
                                
                                if (i === 0) {
                                    date.classList.add('flex-wrap');
            
                                    let tagRel = document.createElement('a');
                                    tagRel.classList.add('shop-history-tag');
                                    tagRel.innerHTML = 'Release';
                                    date.appendChild(tagRel);
                                }

                                if (sameDayUTC(hdate, new Date())) {
                                    date.classList.add('flex-wrap');
            
                                    let tagToday = document.createElement('a');
                                    tagToday.classList.add('shop-history-tag');
                                    tagToday.innerHTML = 'Today';
                                    date.appendChild(tagToday);
                                }

                                var today = new Date();
                                var dsince = Math.floor((today.getTime() - hdate.getTime()) / (1000 * 3600 * 24));

                                let ds = gne('a');
                                ds.innerHTML = dsince + 'd';
                                if (dsince == 0) ds.innerHTML = '<a href="item-shop.html">Item Shop</a>';
                                right.append(ds);
            
                                hlist.append(row);
                            }
            
                            right.append(hlist);
                        }

                        let bottom = document.createElement('div');
                        bottom.classList.add('flex-media');

                        if (item.variants != null) {
                            let styleContainer = document.createElement('div');
                            styleContainer.classList.add('d-50-media');
                            bottom.append(styleContainer);

                            let styles = document.createElement('h1');
                            styles.innerHTML = 'Variants';
                            styleContainer.append(styles);

                            for (let i = 0; i < item.variants.length; i++) {
                                let variant = item.variants[i];

                                let options = document.createElement('div');
                                options.classList.add('flex');
                                options.classList.add('flex-wrap');

                                let title = document.createElement('h2');
                                title.innerHTML = variant.type;
                                styleContainer.append(title);

                                for (let j = 0; j < variant.options.length; j++) {
                                    let parent = document.createElement('a');
                                    parent.classList.add('variant-container');

                                    let image = document.createElement('img');
                                    image.src = variant.options[j].image;
                                    image.title = variant.options[j].name;
                                    parent.innerHTML = variant.options[j].name;
                                    parent.append(image);

                                    options.append(parent);
                                }

                                styleContainer.append(options);
                            }
                        }

                        if (item.showcaseVideo != null) {
                            let ytContainer = document.createElement('div');
                            ytContainer.classList.add('d-50-media');
                            bottom.append(ytContainer);

                            let ytIframe = document.createElement('iframe');
                            ytIframe.src = 'https://www.youtube.com/embed/' + item.showcaseVideo + '?loop=1';
                            ytIframe.title = item.name + ' Showcase Video';
                            ytIframe.setAttribute('frameborder', '0');
                            ytIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                            ytIframe.setAttribute('allowfullscreen', 'true')
                            ytIframe.classList.add('youtube-iframe');
                            ytContainer.append(ytIframe);
                        }

                        mainObject.append(bottom);
                        content.append(mainObject);
                    }).catch(error => {
                        let eText = document.createElement('h1');
                        console.error(error);
                        eText.innerHTML = error;
                        document.getElementById('page-content').append(eText);
                    })
                }
            } else {
                let eText = document.createElement('h1');
                eText.innerHTML = 'No cosmetics were found!';
                document.getElementById('page-content').append(eText);
                let tipText = document.createElement('h3');
                tipText.innerHTML = "Are you looking for a cosmetic you don't know the name of? Go to ";
                let link = document.createElement('a');
                link.href = 'search.html';
                link.innerHTML = 'search.';
                link.classList.add('green');
                tipText.append(link);
                document.getElementById('page-content').append(tipText);
            }
        }).catch(error => {
            let eText = document.createElement('h1');
            console.error(error);
            eText.innerHTML = error;
            document.getElementById('page-content').append(eText);
        })
    }
}