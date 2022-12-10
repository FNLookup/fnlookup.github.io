function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('q')) {

        fetch('https://fortnite-api.com/v2/cosmetics/br/search?name=' + params.get('q')).then(data => data.json()).then(data => {

            if (data.status !== 200) {
                let eTitle = document.createElement('h1');
                let eText = document.createElement('h2');
                let error = data.status + ': ' + data.error;
                console.log(error);
                eTitle.innerHTML = 'Error: ' + data.status;
                eText.innerHTML = data.error;
                document.getElementById('page-content').append(eTitle);
                document.getElementById('page-content').append(eText);

                return;
            }

            const response = data.data;

            if (response !== null) {
                let content = document.getElementById('page-content');
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
                portrait.setAttribute('data-rarity', response.rarity.value);

                let image = document.createElement('img');
                image.title = response.name;
                image.classList.add('item-card-item-display');
                
                if (response.images !== null) {
                    var img_src;
                    if (response.images.featured != null)
                        img_src = response.images.featured;
                    else if (response.images.icon != null)
                        img_src = response.images.icon;
                    else if (response.images.smallIcon != null)
                        img_src = response.images.smallIcon;
        
                    image.src = img_src;
                }
                portrait.append(image);
                left.append(portrait);
                // end of image part

                let name = document.createElement('h1');
                
                if (response.name != null) {
                    name.innerHTML = response.name;
                }

                name.classList.add('flex');
                name.classList.add('flex-wrap');

                if (response.outfit != null) {
                    let item_type = document.createElement('a');
                    item_type.classList.add('item-type-label');
                    item_type.innerHTML = response.type.displayValue;
                    name.appendChild(item_type);
                }
                
                if (response.rarity != null) {
                    let rarity = document.createElement('a');
                    rarity.classList.add('rarity-label');
                    rarity.setAttribute('data-rarity', response.rarity.value);
                    rarity.innerHTML = response.rarity.displayValue;
                    name.appendChild(rarity);
                }

                right.append(name);

                if (response.description !== null) {
                    let description = document.createElement('h2');
                    description.innerHTML = response.description;
                    right.append(description);
                }

                if (response.introduction !== null) {
                    let introduction = document.createElement('h3');
                    introduction.innerHTML = response.introduction.text;
                    introduction.title = 'Introduced in Season ' + response.introduction.backendValue;
                    right.append(introduction);
                }

                if (response.set != null) {
                    let set = document.createElement('h3');
                    set.innerHTML = response.set.text;
                    right.appendChild(set);
                }

                if (response.shopHistory !== null) {
                    let release = document.createElement('p');
                    release.innerHTML = 'Released ' + getFormatDate(new Date(response.shopHistory[0].split('T')[0]));
                    right.appendChild(release);
        
                    let lastSeen = document.createElement('p');
                    lastSeen.innerHTML = 'Last Appearance: ' + getFormatDate(new Date(response.shopHistory[response.shopHistory.length - 1].split('T')[0]));
                    right.appendChild(lastSeen);
        
                    let ocurrences = document.createElement('p');
                    ocurrences.innerHTML = 'Ocurrences: ' + response.shopHistory.length;
                    right.appendChild(ocurrences);

                    let hlist = document.createElement('div');
                    hlist.classList.add('shop-history');
    
                    for (let i = 0; i < response.shopHistory.length; i++) {
                        let date = document.createElement('p');
                        var hdate = new Date(response.shopHistory[i].split('T')[0]);
                        date.innerHTML = getFormatDate(hdate);
                        date.classList.add('shop-history-element');
                        
                        if (sameDayUTC(hdate, new Date())) {
                            date.classList.add('flex-wrap');
    
                            let tagToday = document.createElement('a');
                            tagToday.classList.add('shop-history-tag');
                            tagToday.innerHTML = 'Today';
                            date.appendChild(tagToday);
                        }
    
                        if (i === 0) {
                            date.classList.add('flex-wrap');
    
                            let tagRel = document.createElement('a');
                            tagRel.classList.add('shop-history-tag');
                            tagRel.innerHTML = 'Release';
                            date.appendChild(tagRel);
                        }
    
                        hlist.append(date);
                    }
    
                    right.append(hlist);
                }

                /// end of info part

                let bottom = document.createElement('div');
                bottom.classList.add('flex-media');

                if (response.variants != null) {
                    let styleContainer = document.createElement('div');
                    styleContainer.classList.add('d-50-media');
                    bottom.append(styleContainer);

                    let styles = document.createElement('h1');
                    styles.innerHTML = 'STYLES';
                    styleContainer.append(styles);

                    for (let i = 0; i < response.variants.length; i++) {
                        let variant = response.variants[i];

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

                if (response.showcaseVideo != null) {
                    let ytContainer = document.createElement('div');
                    ytContainer.classList.add('d-50-media');
                    bottom.append(ytContainer);

                    let ytIframe = document.createElement('iframe');
                    ytIframe.src = 'https://www.youtube.com/embed/' + response.showcaseVideo;
                    ytIframe.title = response.name + ' Showcase Video';
                    ytIframe.setAttribute('frameborder', '0');
                    ytIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    ytIframe.setAttribute('allowfullscreen', 'true')
                    ytIframe.classList.add('youtube-iframe');
                    ytContainer.append(ytIframe);
                }

                content.append(main);
                content.append(bottom);
            }
        }).catch(error => {
            let eText = document.createElement('h1');
            console.error(error);
            eText.innerHTML = error;
            document.getElementById('page-content').append(eText);
        })

    }
}

function sameDayUTC(day, now) {
    var theday = [ day.getUTCDate(),
        day.getUTCMonth(),
        day.getUTCFullYear() ];
    var today = [ now.getUTCDate(),
        now.getUTCMonth(),
        now.getUTCFullYear() ];
    
    if (
        theday[0] == today[0] &&
        theday[1] == today[1] &&
        theday[2] == today[2]
    ) {
        return true;
    }
}