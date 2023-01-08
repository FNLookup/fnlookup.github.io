function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('q') || params.has('id')) {
        let content = document.getElementById('page-content');

        content.innerHTML = '<h1>Loading...</h1><h3>Loading cosmetic list...</h3><img src="assets/images/loading.gif">';

        fetch(geturllang('https://fortniteapi.io/v2/items/list?fields=name,id,set,images', 1), {
            headers: {'Authorization': keyFNAPIIo}
        }).then(data => data.json()).then(data => {
            clearChildren(content);
            content.innerHTML = '<h1>Loading...</h1><h3>Searching for ' + params.get('q') + '</h3><img src="assets/images/loading.gif">';

            let items = [];
            let allItems = data.items;

            var itemName = '';
            var itemID = '';
            if (params.has('q')) {
                itemName = params.get('q');
            }
            if (params.has('id')) {
                itemID = params.get('id');
            }

            for (let item of data.items) {
                if ((params.has('q') && item.name.toLowerCase() === itemName.toLowerCase()) || (params.has('id') && item.id.toLowerCase() === itemID.toLowerCase())) {
                    items.push(item);
                }
            }

            const response = items;
            if (response.length > 0) {
                clearChildren(content);

                for (let preitem of response) {
                    fetch(geturllang('https://fortniteapi.io/v2/items/get?id=' + preitem.id, 1), {
                        headers: {'Authorization': keyFNAPIIo}
                    }).then(data => data.json()).then(data => {
                        let setItems = [];

                        let item = data.item;

                        let mainObject = gne('div');
                        mainObject.classList.add('item');
                        mainObject.setAttribute('item', item.name);
                        mainObject.setAttribute('type', item.type.name);

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
                        portrait.classList.add('item-card', 'item-card-item-view');
                        portrait.classList.add('no-resize');
                        portrait.setAttribute('data-rarity', item.rarity.id.toLowerCase());

                        let ic = document.createElement('div');
                        ic.classList.add("item-image", 'item-card-item-display');
                    
                        let images = [];
                        let currentImage = 0;
                    
                        if (item.displayAssets.length > 0) {
                            for (let i = 0; i < item.displayAssets.length; i++) {
                                let displayAsset = item.displayAssets[i];
                        
                                var img_obj = document.createElement("img");
                                var img_src;
                        
                                if (displayAsset.url !== null)
                                    img_src = displayAsset.url;
                                if (displayAsset.background !== null)
                                    img_src = displayAsset.background;
                        
                                img_obj.src = img_src;
                                img_obj.setAttribute("title", item.name + (item.displayAssets.length > 1 ? ' (style ' + (i + 1) + ' out of ' + item.displayAssets.length + ')' : ''));
                                img_obj.setAttribute('otype', item.mainType);
                                img_obj.classList.add("style-picture");
                                
                                if (i === 0) img_obj.classList.add('current-style');
                        
                                images.push(img_obj);
                                ic.appendChild(img_obj);
                            }
                            portrait.append(ic);
                        
                            if (item.displayAssets.length > 1) {
                                setInterval(function() {
                                    currentImage ++;
                                    if (currentImage > images.length - 1) currentImage = 0;
                        
                                    images[currentImage].classList.add('current-style');
                                    for (let i = 0; i < images.length; i++) {
                                        if (i !== currentImage) 
                                            images[i].classList.remove('current-style');
                                    }
                                }, 5000);
                            }

                            if (item.displayAssets.length > 1) {
                                portrait.classList.add('mt1s'); //more-than-one-style
                            }
                        } else {
                            var img_src;
                            if (item.images.icon != null)
                                img_src = item.images.icon;
                            if (item.images.featured != null)
                                img_src = item.images.featured;
                            if (item.images.background != null)
                                img_src = item.images.background;

                            var img_obj = document.createElement("img");
                            img_obj.src = img_src;
                            img_obj.setAttribute("title", item.name);
                            img_obj.classList.add("item-card-item-display");
                            portrait.appendChild(img_obj);
                        }
                        left.append(portrait);
                        // end of image part

                        let name = document.createElement('h1');
                        if (item.name != null) {
                            name.innerHTML = item.name;
                        }

                        name.classList.add('flex');
                        name.classList.add('flex-wrap');

                        document.title = item.name + ' - FNLookup';

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

                            if (item.series != null) {
                                rarity.innerHTML += ' - ' + item.series.name;
                            }
                        }

                        if (item.copyrightedAudio) {
                            let caudio = document.createElement('a');
                            caudio.classList.add('item-type-label', 'copyrighted-audio-warning');
                            caudio.innerHTML = 'Copyrighted Audio';
                            name.appendChild(caudio);
                        }

                        if (item.reactive) {
                            let remodal = document.createElement('a');
                            remodal.classList.add('item-type-label');
                            remodal.innerHTML = 'Reactive';
                            name.appendChild(remodal);
                        }

                        if (item.price != null) {
                            if (item.price > 0) {
                                let pricetag = document.createElement('a');
                                pricetag.classList.add('item-type-label', 'flex', 'flex-center');
                                pricetag.innerHTML = item.price;
                                pricetag.innerHTML += '<img class="vbuck-icon-item" src="https://media.fortniteapi.io/images/652b99f7863db4ba398c40c326ac15a9/transparent.png" title="V-Buck">'
                                name.appendChild(pricetag);
                            }
                        }

                        if (item.upcoming) {
                            let item_type = document.createElement('a');
                            item_type.classList.add('item-type-label', 'upcoming-notice');
                            item_type.innerHTML = 'Upcoming';
                            name.appendChild(item_type);
                        }

                        right.append(name);

                        if (item.description !== null) {
                            let description = document.createElement('h2');
                            description.innerHTML = item.description;
                            right.append(description);
                        }

                        if (item.battlepass != null) {
                            let pass = document.createElement('a');
                            let bp = item.battlepass;
                            pass.innerHTML = bp.displayText.chapterSeason + ': ' + bp.battlePassName + (bp.page !== null ? ' - ' + bp.page : '' ) + ' (' + bp.type + ')';
                            right.appendChild(pass);
                        }
                        
                        if (item.introduction !== null) {
                            let introduction = document.createElement('h3');
                            introduction.innerHTML = item.introduction.text;
                            introduction.title = 'Introduced in Season ' + item.introduction.backendValue;
                            right.append(introduction);
                        }

                        if (item.set != null) {
                            let set = document.createElement('h3');
                            set.innerHTML = item.set.partOf;
                            right.appendChild(set);

                            for (let i of allItems) {
                                if (i.set !== null) {
                                    if (i.set.name == item.set.name) {
                                        setItems.push(i);
                                    }
                                }
                            }
                        }

                        if (item.releaseDate != null) {
                            let release = document.createElement('p');
                            release.innerHTML = 'Released ' + getFormatDate(new Date(item.releaseDate));
                            right.appendChild(release);
                        }

                        if (item.lastAppearance != null) {
                            let lastSeen = document.createElement('p');
                            lastSeen.innerHTML = 'Last Appearance: ' + getFormatDate(new Date(item.lastAppearance));
                            right.appendChild(lastSeen);
                        }

                        if (item.shopHistory !== null) {                
                            let ocurrences = document.createElement('p');
                            ocurrences.innerHTML = 'Ocurrences: ' + item.shopHistory.length;
                            right.appendChild(ocurrences);

                            let hlist = document.createElement('div');
                            hlist.classList.add('shop-history');

                            let tableHeader = gne('div');
                            let leftRow = gne('div');
                            let rightRow = gne('div');
                            tableHeader.classList.add('flex');
                            leftRow.classList.add('d-70');
                            rightRow.classList.add('d-30', 'flex', 'flex-center', 'flex-hcenter');
                            leftRow.innerHTML = '<h4>Date</h4>';
                            rightRow.innerHTML = '<h4>Days Since</h4>';
                            tableHeader.append(leftRow, rightRow);
                            hlist.append(tableHeader);
            
                            let avgTable = [];
                            for (let j = item.shopHistory.length - 1; j >= 0; j--) {
                                let appearanceDate = item.shopHistory[j];

                                let row = gne('div');
                                let left = gne('div');
                                let right = gne('div');

                                row.classList.add('flex');
                                left.classList.add('d-70');
                                right.classList.add('d-30', 'flex', 'flex-center', 'flex-hcenter');

                                row.append(left, right);
                                hlist.append(row);

                                let date = document.createElement('p');
                                var hdate = new Date(appearanceDate);
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

                                var today = new Date();
                                var dsince = Math.floor((today.getTime() - hdate.getTime()) / (1000 * 3600 * 24));

                                let ds = gne('a');
                                ds.innerHTML = dsince + 'd';
                                if (dsince == 0) ds.innerHTML = '<a href="item-shop.html">Item Shop</a>';
                                right.append(ds);

                                if (j !== item.shopHistory.length-1) {
                                    var nextAppearance = new Date(item.shopHistory[j + 1]);
                                    var thisAppearance = new Date(item.shopHistory[j]);

                                    var dsinceta = Math.floor((nextAppearance.getTime() - thisAppearance.getTime()) / (1000 * 3600 * 24));
                                    avgTable.push(dsinceta);
                                }
                            }

                            let sum = 0;
                            for (let num of avgTable) sum += num;
                            let avg = sum / avgTable.length;
            
                            right.append(hlist);

                            let avgWaitPerA = document.createElement('p');
                            avgWaitPerA.innerHTML = 'Average Wait: ' + avg + 'd';
                            right.append(avgWaitPerA);
                        }

                        if (item.id !== null) {
                            let id = document.createElement('p');
                            id.innerHTML = 'ID: ' + item.id;
                            id.title = 'ID: ' + item.id;
                            right.append(id);
                        }

                        mainObject.append(main);
                        content.append(mainObject);

                        let bottom = document.createElement('div');
                        bottom.classList.add('flex-media');

                        mainObject.append(bottom);

                        if (item.styles != null) {
                            if (item.styles.length > 0) {
                                let styleContainer = document.createElement('div');
                                styleContainer.classList.add('d-50-media');
                                bottom.append(styleContainer);

                                let parttitle = document.createElement('h1');
                                parttitle.innerHTML = 'Styles';
                                styleContainer.append(parttitle);

                                let rStyleTabs = [];
                                for (let style of item.styles) {
                                    let box;
                                    let key = 'box_' + style.channelName.toLowerCase();

                                    if (!rStyleTabs.includes(style.channelName)) {
                                        let title = document.createElement('h2');
                                        title.innerHTML = style.channelName;
                                        styleContainer.append(title);
                                        
                                        box = document.createElement('div');
                                        box.classList.add('flex');
                                        box.classList.add('flex-wrap');
                                        box.id = key;
                                        styleContainer.append(box);

                                        rStyleTabs.push(style.channelName)
                                    } else {
                                        box = document.getElementById(key);
                                    }

                                    let parent = document.createElement('a');
                                    parent.classList.add('variant-container');

                                    let image = document.createElement('img');
                                    if (style.image !== null) {
                                        image.src = style.image;
                                    } else {
                                        image.src = marioDancing;
                                    }
                                    image.title = style.name + ' (' + style.channelName + ')';
                                    parent.innerHTML = style.name;
                                    parent.append(image);

                                    box.append(parent);
                                }
                            }
                        }

                        if (item.type.id !== 'bundle' && item.type.id !== 'cosmeticvariant') {
                            fetch(otherargument(geturllang('https://fortnite-api.com/v2/cosmetics/br/search?id=' + item.id, 0), 'searchLanguage')).then(data => data.json()).then(data => {
                                if (data.status !== 200) {
                                    let eTitle = document.createElement('h1'); let eText = document.createElement('h2'); let error = data.status + ': ' + data.error;
                                    console.error(error); eTitle.innerHTML = 'Error: ' + data.status; eText.innerHTML = data.error; document.getElementById('page-content').append(eTitle);
                                } else {
                                    if (data.data.showcaseVideo != null) {
                                        let ytContainer = document.createElement('div');
                                        ytContainer.classList.add('d-50-media');
                                        bottom.append(ytContainer);
                                        let ytIframe = document.createElement('iframe');
                                        ytIframe.src = 'https://www.youtube.com/embed/' + data.data.showcaseVideo + '?loop=1';
                                        ytIframe.setAttribute('frameborder', '0');
                                        ytIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                                        ytIframe.setAttribute('allowfullscreen', 'true')
                                        ytIframe.classList.add('youtube-iframe');
                                        ytContainer.append(ytIframe);
                                    }
                                }
                            }).catch(error => { console.error(error) })
                        }

                        if (item.type.id == 'music') {
                            fetch('assets/local/music-packs/related-videos.json').then(r => r.json()).then(r => {
                                for (let packID of r.items) {
                                    if (packID.id === item.id) {
                                        for (let url of packID.urls) {
                                            let ytContainer = document.createElement('div');
                                            ytContainer.classList.add('d-50-media');
                                            bottom.append(ytContainer);
                                            let ytIframe = document.createElement('iframe');
                                            ytIframe.src = 'https://www.youtube.com/embed/' + url + '?loop=1';
                                            ytIframe.setAttribute('frameborder', '0');
                                            ytIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                                            ytIframe.setAttribute('allowfullscreen', 'true')
                                            ytIframe.classList.add('youtube-iframe');
                                            ytContainer.append(ytIframe);
                                        }
                                    }
                                }
                            })
                        }

                        let bottom1 = document.createElement('div');
                        mainObject.appendChild(bottom1);

                        if (item.grants.length > 0) {
                            let title = gne('h1');
                            title.innerHTML = 'This item includes';
                            bottom1.append(title);

                            let grantModal = document.createElement('div');
                            grantModal.classList.add('flex');
                            grantModal.classList.add('flex-wrap');
                            bottom1.append(grantModal);

                            for (let grant of item.grants) {
                                let parent = document.createElement('a');
                                parent.classList.add('variant-container');

                                let image = document.createElement('img');
                                image.src = grant.images.icon;
                                image.title = grant.name;
                                parent.innerHTML = grant.name;
                                parent.append(image);

                                parent.href = getItemLinkByID(grant.id)

                                grantModal.append(parent);
                            }
                        }

                        let bottom2 = document.createElement('div');
                        mainObject.appendChild(bottom2);

                        if (item.grantedBy.length > 0) {
                            let title = gne('h1');
                            title.innerHTML = 'Granted by';
                            bottom2.append(title);

                            let grantModal = document.createElement('div');
                            grantModal.classList.add('flex');
                            grantModal.classList.add('flex-wrap');
                            bottom2.append(grantModal);

                            for (granted of item.grantedBy) {
                                let parent = document.createElement('a');
                                parent.classList.add('variant-container');

                                let image = document.createElement('img');
                                image.src = granted.images.icon;
                                image.title = granted.name;
                                parent.innerHTML = granted.name;
                                parent.append(image);

                                parent.href = getItemLinkByID(granted.id)

                                grantModal.append(parent);
                            }
                        }

                        if (item.builtInEmote != null) {
                            let emote = item.builtInEmote;
                            
                            let title = gne('h1');
                            title.innerHTML = 'Built-In Emote';
                            bottom2.append(title);

                            let grantModal = document.createElement('div');
                            grantModal.classList.add('flex');
                            grantModal.classList.add('flex-wrap');
                            bottom2.append(grantModal);

                            let parent = document.createElement('a');
                            parent.classList.add('variant-container');

                            let image = document.createElement('img');
                            image.src = emote.images.icon;
                            image.title = emote.name;
                            parent.innerHTML = emote.name;
                            parent.append(image);
                            parent.href = getItemLinkByID(emote.id)
                            grantModal.append(parent);
                        }

                        if (setItems.length > 0) {
                            let title = gne('h1');
                            title.innerHTML = item.set.partOf;
                            bottom2.append(title);

                            let grantModal = document.createElement('div');
                            grantModal.classList.add('flex');
                            grantModal.classList.add('flex-wrap');
                            bottom2.append(grantModal);

                            for (setItem of setItems) {
                                let parent = document.createElement('a');
                                parent.classList.add('variant-container');

                                let image = document.createElement('img');
                                image.src = setItem.images.icon;
                                image.title = setItem.name;
                                parent.innerHTML = setItem.name;
                                parent.append(image);

                                parent.href = getItemLinkByID(setItem.id)

                                grantModal.append(parent);
                            }
                        }
                        
                    }).catch(err => {
                        console.error(err);
                    })
                }
            } else {
                clearChildren(content);

                let eText = document.createElement('h1');
                eText.innerHTML = 'No cosmetics were found!';
                let tipText = document.createElement('h3');
                tipText.innerHTML = 'Are you looking for a cosmetic you don\'t know the name of? Go to <a class="green" href="search.html?q=' + params.get('q') + '">cosmetic search</a> and try again.';
                content.append(eText, tipText);
            }
        }).catch(error => {
            let eText = document.createElement('h1');
            console.error(error);
            eText.innerHTML = error;
            document.getElementById('page-content').append(eText);
        })
    }
}