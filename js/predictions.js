function init() {
    // This number can modify the results DRASTICALLY
    // Cannot be negative because it will not do anything
    // If very low, it can show item shop items AND
    // Items that have appeared the same number of average days ago
    var fallbackDays = 5;

    let dateFirst = document.getElementById("dates-first");
    let dateSecond = document.getElementById("dates-second");

    var fallbackSecs = fallbackDays * 8.64e+7;
    var today = new Date();
    var times = [
        today.getTime() - fallbackSecs,
        today.getTime() + fallbackSecs
    ]

    dateFirst.innerHTML = getFormatDate(new Date(times[0]));
    dateSecond.innerHTML = getFormatDate(new Date(times[1]));

    fetch(geturllang('https://fortnite-api.com/v2/cosmetics/br', 0)).then(response => response.json()).then(response => {
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

        if (response.data !== null) {
            for (let i = 0; i < response.data.length; i++) {
                var item = response.data[i];
    
                if (item.shopHistory != null) {
                    if (item.shopHistory.length > 1) {
                        var days = [];
    
                        for (let h = 0; h < item.shopHistory.length; h++) {
    
                            if (h > 0) {
                                var l = item.shopHistory[h - 1].split('T')[0];
                                var t = item.shopHistory[h].split('T')[0];
    
                                var lastDate = new Date(l);
                                var thisDate = new Date(t);
    
                                let difference = thisDate.getTime() - lastDate.getTime();
                                let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
                                days.push(totalDays);
                            }
                        }
    
                        var total = 0;
                        var average = 0;
                        for (let object of days) {
                            total += object;
                        }
    
                        average = Math.floor(total / days.length);
                        
                        var la = item.shopHistory[item.shopHistory.length - 1].split('T')[0];
                        var lastAppearance = new Date(la);
                        var today = new Date();

                        var fallbackSecs = fallbackDays * 8.64e+7;
                        var dayTimes = [
                            today.getTime() - fallbackSecs,
                            today.getTime() + fallbackSecs
                        ]

    
                        var prevTime = secsToDays(lastAppearance.getTime()) + average;
                        var todayTime = secsToDays(today.getTime()) - fallbackDays;
                        var todayNegTime = secsToDays(today.getTime()) + fallbackDays;
    
                        var sinceLast = secsToDays(today.getTime() - lastAppearance.getTime())
                        
                        if (prevTime < todayNegTime && prevTime > todayTime &&
                            sameDay(lastAppearance, today) === false) {
                            makeItemCard(item, average, sinceLast, dayTimes);
                        }
                    }
                }
            }
        }
    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        document.getElementById('page-content').append(eText);
    });
}

function makeItemCard(item, averageWait, currentWait, times) {
    let b = document.createElement('div');
    b.classList.add('item-card-parent');

    var card = document.createElement('div');
    card.classList.add('predictions-cosmetic');
    card.classList.add('d-50-media');

    let left = document.createElement('div');

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.setAttribute('data-rarity', item.rarity.value);
    obj.classList.add('pointer');

    var title = document.createElement('span');
    title.innerHTML = item.name;
    title.classList.add("item-title");

    //card.appendChild(title);

    var img_obj = document.createElement("img");
    var img_src;

    if (item.images.featured != null)
        img_src = item.images.featured;
    else if (item.images.icon != null)
        img_src = item.images.icon;
    else if (item.images.smallIcon != null)
        img_src = item.images.smallIcon;

    let ic = document.createElement('div');
    ic.classList.add("item-image");

    img_obj.src = img_src;
    img_obj.setAttribute("title", item.name);

    ic.append(img_obj);

    obj.appendChild(ic);

    obj.addEventListener("click", function() {
        window.location.href = 'item.html?q=' + item.name.toLowerCase();
    });

    b.append(obj);

    left.appendChild(b);

    // end of image part

    let right = document.createElement("div");
    right.classList.add('predictions-item-context');

    let name = document.createElement("h2");
    name.innerHTML = item.name;
    name.classList.add('flex');
    name.classList.add('flex-wrap');

    if (item.type != null) {
        let item_type = document.createElement('a');
        item_type.classList.add('item-type-label');
        item_type.innerHTML = item.type.displayValue;
        name.appendChild(item_type);
    }
    
    if (item.rarity != null) {
        let rarity = document.createElement('a');
        rarity.classList.add('rarity-label');
        rarity.setAttribute('data-rarity', item.rarity.value);
        rarity.innerHTML = item.rarity.displayValue;
        name.appendChild(rarity);
    }

    let description = document.createElement("h3");
    description.innerHTML = item.description;

    let avgWait = document.createElement("a");
    avgWait.innerHTML = 'Average wait: ' + averageWait + ' days';

    let curWait = document.createElement("a");
    curWait.innerHTML = 'Current wait: ' + currentWait + ' days';

    right.appendChild(name);
    right.appendChild(description);
    right.appendChild(avgWait);
    right.appendChild(curWait);

    card.appendChild(left);
    card.appendChild(right);
    document.getElementById('items').append(card);
}