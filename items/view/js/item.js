let demoVideo = undefined;

function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('q') || params.has('id')) {
        let content = document.getElementById('page-content');

        var itemID = '';
        if (params.has('id')) {
            itemID = params.get('id');
        }

        let loading = document.getElementById('loading')
        loading.innerHTML = '<h1>Please wait...</h1><h3>Searching for ' + itemID + '</h3><img src="/assets/images/loading.gif">';

        let requestData = getRequestData('item&id=' + itemID);
        fetch(requestData.url, requestData.data).then(data => data.json()).then(data => {
            clearChildren(loading)

            let setItems = [];

            let item = data.item;

            if (item.type.id == 'sparks_song') {
                console.log('this is a jamtrack. redirecting you');
                window.location.href = '/festival/view/?' + item.id;
            }

            let mainObject = gne('div');
            mainObject.classList.add('item');
            mainObject.setAttribute('item', item.name);
            mainObject.setAttribute('type', item.type.name);

            //document.getElementById('label-center').innerHTML = item.name.toUpperCase()

            let main = document.createElement('div');
            main.classList.add('flex-media');

            let left = document.createElement('div');
            left.classList.add('d-50-media');
            let right = document.createElement('div');
            right.classList.add('d-50-media');
            right.classList.add('item-info-right', 'header-text-bold');
            main.append(left);
            main.append(right);

            // image part
            let portrait = document.createElement('div');
            portrait.style.borderRadius = '15px'
            portrait.style.overflow = 'hidden'
            portrait.id = 'media-visualization'
                //portrait.classList.add('item-card', 'item-card-item-view');
                //portrait.classList.add('no-resize');
            portrait.setAttribute('data-rarity', item.rarity.id.toLowerCase());

            //let ic = document.createElement('div');
            //ic.classList.add("item-image", 'item-card-item-display');

            let images = [];
            let imageSources = []

            if (item.displayAssets.length > 0) {
                for (displayAsset of item.displayAssets) {
                    let pushList = [
                        displayAsset.background,
                        displayAsset.full_background,
                        displayAsset.url,
                        displayAsset.background_texture
                    ]
                    for (url of pushList)
                        if (url !== null && url !== undefined) imageSources.push(url)
                }

                var img_obj = document.createElement("img");

                if (item.displayAssets[0].url !== null) {
                    img_src = item.displayAssets[0].url;
                }
                if (item.displayAssets[0].background !== null) {
                    img_src = item.displayAssets[0].background;
                }

                img_obj.src = img_src;
                //img_obj.setAttribute("title", item.name + (item.displayAssets.length > 1 ? ' (style ' + (i + 1) + ' out of ' + item.displayAssets.length + ')' : ''));
                img_obj.setAttribute('otype', item.mainType);
                img_obj.classList.add("style-picture");
                img_obj.style.width = '100%'
                img_obj.style.display = 'block'
                images.push(img_obj);
                portrait.appendChild(img_obj);
                //portrait.append(ic);
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

            let pushList = [
                item.images.background,
                item.images.featured,
                item.images.full_background,
                item.images.icon,
                item.images.icon_background
            ]
            for (url of pushList)
                if (url !== null && url !== undefined) imageSources.push(url)

                //console.log(imageSources)

            let carrousel = document.createElement('div')
            carrousel.classList.add('item-page-carrousel')

            // fortnuite.gg videos!! omg
            //we need the english name tho
            FNAPICOMDATA = undefined

            fetch('https://fortnite-api.com/v2/cosmetics/br/' + item.id).then(data => data.json()).then(data => {
                // console.log(data);
                FNAPICOMDATA = data
                const hasFNGG = Items.some(item => item.name === data.data.name);
                // console.log(hasFNGG)
                if (hasFNGG) {
                    fnggItem = Items.find(item => item.name === data.data.name);
                    // console.log(fnggItem)
                    let vidURL = 'https://fnggcdn.com/items-download/' + fnggItem.id + '/video.mp4?2' // apparently built in transform emote videos with ?2 make them both sides
                    if (item.type.id == 'music') {
                        vidURL = 'https://fortnite.gg/img/items/' + fnggItem.id + '/audio.mp3?1'
                    }

                    imageSources.splice(1, 0, vidURL)

                    // demoVideo.onerror = function() {
                    //     //demoVideo.remove();
                    //     //videoContainer.remove();
                    //     console.log("VIDEO ERROR!")
                    // };
                }

                fortNut()
            }).catch(e => { //Even if the fortnite-api.com doesnt have it 
                fortNut()
            })

            function fortNut() {
                for (let img of imageSources) {
                    if (img.includes('video.mp4')) {
                        // console.log('There is an impostor')
                        let vid = document.createElement('video')
                        vid.src = img
                        vid.style.height = '100%'
                        vid.muted = true
                        vid.loop = true
                        vid.autoplay = true
                        vid.classList.add('fortnite-button-border')
                        vid.addEventListener('click', function() {
                            // console.log('video was clicked')
                            clearChildren(document.getElementById('media-visualization'))
                            let createdVideo = document.createElement('video')
                            createdVideo.src = img
                            createdVideo.style.height = '100%'
                            createdVideo.loop = true
                            createdVideo.autoplay = true
                            createdVideo.classList.add('item-card-item-display')
                            createdVideo.controls = true
                            document.getElementById('media-visualization').append(createdVideo)
                        })
                        carrousel.append(vid)
                    } else if (img.includes('audio.mp3')) {
                        // console.log('There is an impostor')
                        let vid = document.createElement('img')
                        vid.src = '/assets/icons/headphone.svg'
                        vid.style.height = '100%'
                        vid.classList.add('fortnite-button-border')
                        carrousel.append(vid)
                        vid.addEventListener('click', function() {
                            // console.log('video was clicked')
                            clearChildren(document.getElementById('media-visualization'))
                            let createdMedia = document.createElement('img')
                            createdMedia.src = imageSources[0]
                            createdMedia.classList.add('item-card-item-display')
                            createdMedia.style.height = '100%'
                            document.getElementById('media-visualization').append(createdMedia)
                            let createdVideo = document.createElement('audio')
                            createdVideo.src = img
                            createdVideo.loop = true
                            createdVideo.autoplay = true
                            createdVideo.classList.add('item-card-item-display')
                            createdVideo.controls = true
                            document.getElementById('media-visualization').append(createdVideo)
                        })
                        carrousel.append(vid)
                    } else {
                        let vid = document.createElement('img')
                        vid.src = img + '?width=100'
                        vid.style.height = '100%'
                        vid.classList.add('fortnite-button-border')
                        carrousel.append(vid)
                        vid.addEventListener('click', function() {
                            // console.log('image was clicked')
                            clearChildren(document.getElementById('media-visualization'))
                            let createdMedia = document.createElement('img')
                            createdMedia.src = img
                            createdMedia.classList.add('item-card-item-display')
                            createdMedia.style.height = '100%'
                            document.getElementById('media-visualization').append(createdMedia)
                        })
                    }
                }
            }

            left.append(carrousel)
                // end of image part

            let name = document.createElement('h1');
            if (item.name != null) {
                name.innerHTML = item.name;
            }

            name.classList.add('flex', 'flex-wrap', 'flex-center');

            document.title = item.name + ' - FNLookup';

            let tags = document.createElement('div');
            tags.classList.add('flex', 'item-tags');
            tags.classList.add('tagopen');
            name.appendChild(tags);

            if (item.type != null) {
                let item_type = document.createElement('a');
                item_type.classList.add('item-type-label');
                item_type.innerHTML = item.type.name;
                tags.appendChild(item_type);
            }

            if (item.rarity != null) {
                let rarity = document.createElement('a');
                rarity.classList.add('rarity-label');
                rarity.setAttribute('data-rarity', item.rarity.id.toLowerCase());
                rarity.innerHTML = item.rarity.name;
                tags.appendChild(rarity);

                if (item.series != null) {
                    let series = document.createElement('a');
                    series.classList.add('rarity-label');
                    series.setAttribute('data-rarity', item.series.id.toLowerCase());
                    series.innerHTML = item.series.name;
                    tags.appendChild(series);
                }
            }

            if (item.copyrightedAudio) {
                let caudio = document.createElement('a');
                caudio.classList.add('item-type-label', 'copyrighted-audio-warning');
                caudio.innerHTML = 'Copyrighted Audio';
                tags.appendChild(caudio);
            }

            if (item.reactive) {
                let remodal = document.createElement('a');
                remodal.classList.add('item-type-label');
                remodal.innerHTML = 'Reactive';
                tags.appendChild(remodal);
            }

            if (item.price != null) {
                if (item.price > 0) {
                    let pricetag = document.createElement('a');
                    pricetag.classList.add('item-type-label', 'flex', 'flex-center');
                    pricetag.innerHTML = item.price;
                    pricetag.innerHTML += '<img class="vbuck-icon-item" src="/assets/images/vbucks.png" title="V-Buck">'
                    tags.appendChild(pricetag);
                }
            }

            if (item.upcoming) {
                let item_type = document.createElement('a');
                item_type.classList.add('item-type-label', 'upcoming-notice');
                item_type.innerHTML = 'Upcoming';
                tags.appendChild(item_type);
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
                pass.innerHTML = bp.displayText.chapterSeason + ': ' + bp.battlePassName + (bp.page !== null ? ' - ' + bp.page : '') + ' (' + bp.type + ')';
                right.appendChild(pass);
            }

            if (item.introduction !== null) {
                let introduction = document.createElement('h3');
                introduction.innerHTML = item.introduction.text;
                introduction.title = 'Introduced in Season ' + item.introduction.backendValue;
                right.append(introduction);
            }

            if (item.set != null) {
                let set = document.createElement('a');
                set.href = 'set.html?id=' + item.set.id;
                set.innerHTML = '<h3>' + item.set.partOf + '</h3>';
                right.appendChild(set);
            }

            if (item.releaseDate != null) {
                let release = document.createElement('p');
                release.innerHTML = 'Released ' + getFormatDate(new Date(item.releaseDate), true);
                right.appendChild(release);
            }

            if (item.lastAppearance != null) {
                let lastSeen = document.createElement('p');
                lastSeen.innerHTML = 'Last time seen ' + getFormatDate(new Date(item.lastAppearance), true, true).toLowerCase();
                right.appendChild(lastSeen);
            }

            if (item.shopHistory !== null) {
                let ocurrences = document.createElement('p');
                ocurrences.innerHTML = 'Seen ' + item.shopHistory.length + ' times';
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

                    let date = document.createElement('a');
                    var hdate = new Date(appearanceDate);
                    date.innerHTML = getFormatDate(hdate);
                    date.classList.add('shop-history-element');

                    left.append(date);

                    var dsince = Math.floor((new Date().getTime() - hdate.getTime()) / (1000 * 3600 * 24));
                    var rSince = getFormatDate(hdate, true)

                    let ds = gne('a');
                    ds.innerText = rSince;

                    if (dsince == 0) ds.innerHTML = '<a href="/items/shop/">Today</a>';

                    right.append(ds);

                    if (j !== item.shopHistory.length - 1) {
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

                if (item.shopHistory.length > 1) {
                    let avgWaitPerA = document.createElement('p');
                    avgWaitPerA.innerHTML = 'Mean wait: ' + avg + 'd';
                    right.append(avgWaitPerA);
                }
            }

            if (item.id !== null) {
                let id = document.createElement('p');
                id.innerHTML = 'ID: <code>' + item.id + '</code>';
                id.title = 'ID: ' + item.id;
                id.onclick = function() {
                    navigator.clipboard.writeText(item.id);
                }
                right.append(id);
            }

            if (item.gameplayTags.length > 0) {
                let gt = document.createElement('p');
                gt.innerHTML = 'Gameplay Tags';
                right.append(gt);

                let gtcode = document.createElement('div');
                gtcode.style.padding = '.5rem';
                gtcode.style.border = '1px solid gray';
                gtcode.style.borderRadius = '25px'
                gtcode.style.backgroundColor = 'var(--card-background-color)'
                right.append(gtcode);
                for (let gtag of item.gameplayTags) {
                    gtcode.innerHTML += '<p><code>' + gtag + '</code></p>';
                }
            }

            if (item.audio !== null) {
                right.innerHTML += '<h3>Listen</h3>';

                let audio = gne('audio');
                audio.controls = true;
                audio.loop = true;
                audio.classList.add('audio-fn');
                right.append(audio);
                audio.src = item.audio;
                audio.load();
            }

            mainObject.append(main);
            content.append(mainObject);

            let bottom = document.createElement('div');
            bottom.classList.add('flex-media');

            mainObject.append(bottom);

            let rowItem = 1;
            let rows = -1;

            if (item.styles != null) {
                if (item.styles.length > 0) {
                    let allStyleObjects = []
                    let selectedStyleOfRows = []

                    let styleContainer = document.createElement('div');
                    styleContainer.classList.add('d-50-media');
                    bottom.append(styleContainer);

                    let parttitle = document.createElement('h1');
                    parttitle.innerHTML = 'Styles';
                    styleContainer.append(parttitle);

                    let rStyleTabs = [];
                    for (let a in item.styles) {
                        let style = item.styles[a];
                        let box;
                        let key = 'box_' + style.channelName.toLowerCase();

                        let isNewRow = false;

                        if (!rStyleTabs.includes(style.channelName)) {
                            let title = document.createElement('h2');
                            title.innerHTML = style.channelName;
                            styleContainer.append(title);

                            box = document.createElement('div');
                            box.classList.add('flex');
                            box.classList.add('flex-wrap');
                            box.classList.add('variants');
                            box.id = key;
                            styleContainer.append(box);

                            rStyleTabs.push(style.channelName)

                            rowItem = 1;
                            rows++;
                            isNewRow = true;
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

                        parent.setAttribute('style-row', rows);
                        parent.setAttribute('style-row-item', rowItem);
                        if (rowItem == 1) parent.setAttribute('is-selected', true)
                        else parent.setAttribute('is-selected', false)

                        if (isNewRow) {
                            selectedStyleOfRows.push(parent);
                        }

                        parent.onclick = () => {
                            parent.setAttribute('is-selected', true);
                            selectedStyleOfRows[parseInt(parent.getAttribute('style-row'))].setAttribute('is-selected', false);
                            selectedStyleOfRows[parseInt(parent.getAttribute('style-row'))] = parent;

                            let urlPost = '';

                            let allRowArray = [];
                            for (let thing of allStyleObjects) {
                                if (thing.getAttribute('is-selected') == 'true') {
                                    allRowArray.push(thing.getAttribute('style-row-item') == '1');
                                }
                            }
                            let allNotFirst = allRowArray.includes(false);

                            for (let xd = -1; xd < rows; xd++) {
                                urlPost += '-' + selectedStyleOfRows[xd + 1].getAttribute('style-row-item');
                            }

                            let styleVideo = document.getElementById('media-visualization').children[0]
                            let videoExists = document.getElementById('media-visualization').innerHTML.includes('video')

                            if (videoExists) {
                                styleVideo.title = item.name + ' "' + style.name + '" style';

                                let curTime = styleVideo.currentTime;

                                if (allNotFirst) {
                                    styleVideo.src = 'https://fnggcdn.com/items-download/' + fnggItem.id + '/video' + urlPost + '.mp4?2'
                                } else {
                                    styleVideo.src = 'https://fnggcdn.com/items-download/' + fnggItem.id + '/video.mp4?2'
                                }

                                styleVideo.addEventListener('play', function() {
                                    styleVideo.currentTime = curTime;
                                })
                            }
                        }

                        rowItem++;

                        allStyleObjects.push(parent);

                        box.append(parent);
                    }
                }
            }

            let bottom1 = document.createElement('div');
            mainObject.appendChild(bottom1);

            if (item.type.id !== 'bundle' && item.type.id !== 'cosmeticvariant') {
                if (FNAPICOMDATA !== undefined && FNAPICOMDATA.data.showcaseVideo != null) {
                    let ytContainer = document.createElement('div');
                    ytContainer.classList.add('d-50-media');
                    bottom1.append(ytContainer);
                    let ytIframe = document.createElement('iframe');
                    ytIframe.src = 'https://www.youtube.com/embed/' + data.data.showcaseVideo + '?loop=1';
                    ytIframe.setAttribute('frameborder', '0');
                    ytIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    ytIframe.setAttribute('allowfullscreen', 'true')
                    ytIframe.classList.add('youtube-iframe');
                    ytContainer.append(ytIframe);
                }
            }

            if (item.grants.length > 0) {
                let title = gne('h1');
                title.innerHTML = 'This item includes';
                bottom1.append(title);

                let grantModal = document.createElement('div');
                grantModal.classList.add('flex');
                grantModal.classList.add('flex-wrap');
                grantModal.classList.add('variants');
                bottom1.append(grantModal);

                for (let grant of item.grants) {
                    let parent = document.createElement('a');
                    parent.classList.add('variant-container');

                    let image = document.createElement('img');
                    image.src = grant.images.icon + '?width=100';
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
                grantModal.classList.add('variants');
                bottom2.append(grantModal);

                for (granted of item.grantedBy) {
                    let parent = document.createElement('a');
                    parent.classList.add('variant-container');

                    let image = document.createElement('img');
                    image.src = granted.images.icon + '?width=100';
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
                grantModal.classList.add('variants');
                bottom2.append(grantModal);

                let parent = document.createElement('a');
                parent.classList.add('variant-container');

                let image = document.createElement('img');
                image.src = emote.images.icon + '?width=100';
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
                grantModal.classList.add('variants');
                bottom2.append(grantModal);

                for (setItem of setItems) {
                    let parent = document.createElement('a');
                    parent.classList.add('variant-container');

                    let image = document.createElement('img');
                    image.src = setItem.images.icon + '?width=100';
                    image.title = setItem.name;
                    parent.innerHTML = setItem.name;
                    parent.append(image);

                    parent.href = getItemLinkByID(setItem.id)

                    grantModal.append(parent);
                }
            }

            // let titlei = gne('h1');
            // titlei.innerHTML = 'Images';
            // bottom2.append(titlei);

            // let imageModal = document.createElement('div');
            // imageModal.classList.add('flex');
            // imageModal.classList.add('flex-wrap');
            // imageModal.classList.add('variants');
            // bottom2.append(imageModal);

            // let allAvailable = Object.getOwnPropertyNames(item.images);

            // for (let imageField of allAvailable) {
            //     if (item.images[imageField] !== null) {
            //         let parent = document.createElement('a');
            //         parent.classList.add('variant-container');

            //         let image = document.createElement('img');
            //         image.src = item.images[imageField];
            //         image.title = imageField;
            //         parent.innerHTML = imageField;
            //         parent.href = item.images[imageField];
            //         parent.target = '_blank';
            //         parent.append(image);
            //         imageModal.append(parent);
            //     }
            // }

            // if (item.displayAssets !== null) {
            //     if (item.displayAssets.length > 0) {
            //         let titlei = gne('h1');
            //         titlei.innerHTML = 'Display Assets';
            //         bottom2.append(titlei);

            //         let imageModal = document.createElement('div');
            //         imageModal.classList.add('flex');
            //         imageModal.classList.add('variants');
            //         imageModal.classList.add('flex-wrap');
            //         bottom2.append(imageModal);

            //         for (let displayAsset of item.displayAssets) {
            //             let allAvailable = Object.getOwnPropertyNames(displayAsset);

            //             function validURL(string) {
            //                 let url;
            //                 try { url = new URL(string); } catch (_) { return false; }
            //                 return url.protocol === "http:" || url.protocol === "https:";
            //             }

            //             for (let imageField of allAvailable) {
            //                 if (displayAsset[imageField] !== null && validURL(displayAsset[imageField])) {
            //                     let parent = document.createElement('a');
            //                     parent.classList.add('variant-container');

            //                     let image = document.createElement('img');
            //                     image.src = displayAsset[imageField];
            //                     image.title = imageField;
            //                     parent.innerHTML = imageField;
            //                     parent.append(image);
            //                     parent.href = displayAsset[imageField];
            //                     parent.target = '_blank';
            //                     imageModal.append(parent);
            //                 }
            //             }
            //         }
            //     }
            // }
        }).catch(err => {
            clearChildren(content);

            let eText = document.createElement('h1');
            eText.innerHTML = 'No cosmetics were found, or an error has occurred.<br>' + err;
            let tipText = document.createElement('h3');

            let value = ''
            if (params.has('q')) value = params.get('q');
            if (params.has('id')) value = params.get('id');

            console.error(err)


            tipText.innerHTML = 'Are you looking for a cosmetic you don\'t know the name of? Go to <a class="green" href="search.html?name=' + value + '">cosmetic search</a> and try again.';
            content.append(eText, tipText);
        })
    } else {
        let eText = document.createElement('h1');
        eText.innerHTML = 'Looks like you specified no parameters!';
        let tipText = document.createElement('h3');
        tipText.innerHTML = 'It looks like you\'re looking for no items. Use the search bar to view one, or click on one somewhere else.';
        document.getElementById('page-content').append(eText, tipText);
        document.getElementById('page-content').innerHTML += '<a href="index.html" class="gray-link">Take me home <i class="arrow sideways"></i></a>'
    }
}