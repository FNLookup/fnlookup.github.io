function start() {
    fetch(geturllang('https://fortniteapi.io/v2/battlepass?season=current', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r => r.json()).then(r => {

        let pc = document.getElementById('page-content');

        let title = gne('h1');
        title.innerHTML = r.displayInfo.chapterSeason + ': ' + r.displayInfo.battlepassName;
        pc.appendChild(title);

        let registeredPages = [];
        let pages = gne('div');
        pc.append(pages);

        for (let reward of r.rewards) {

            const page = reward.page;
            var section_c;
            if (!registeredPages.includes(page)) {
                var section_title = document.createElement('h1');
                section_title.innerHTML = 'PAGE ' + page;
                section_title.classList.add('flex-center');
                section_title.classList.add('shop-section-title');
                section_title.id = 'title_' + page;

                var section_container = document.createElement('div');
                section_container.classList.add("shop-items-display");
                section_container.setAttribute('name', page)

                pages.append(section_title);
                pages.append(section_container);

                registeredPages.push(page);
                section_c = section_container;
            } else {
                section_c = document.getElementsByName(page)[0];
            }

            let item = reward.item;

            let parent = document.createElement('div');
            parent.classList.add('item-card-parent');

            var obj = document.createElement("div");
            obj.classList.add("item-card");
            obj.setAttribute('data-rarity', item.rarity.id.toLowerCase());

            var hold = document.createElement("div");
            hold.classList.add("item-info");

            var otitle = document.createElement('a');
            otitle.innerHTML = item.name;
            otitle.classList.add("item-title");

            if (reward.quantity > 1) {
                otitle.innerHTML += ' (x' + reward.quantity + ')';
            }

            var price = document.createElement('a');
            var vbuck = document.createElement('img');
            vbuck.src = 'assets/images/star.png';
            vbuck.classList.add("vbuck-icon");

            let vbt = document.createElement('a');
            vbt.classList.add("item-price-vbp");

            let fprice = reward.price.amount;
            vbuck.title = fprice + ' Battle Stars';
            vbt.innerHTML = fprice;

            price.append(vbt);
            price.appendChild(vbuck);
            price.classList.add('item-price');

            hold.appendChild(otitle);

            let type = document.createElement('a');
            type.classList.add("item-type");
            type.innerHTML = item.type.name;
            hold.appendChild(type);

            hold.appendChild(price);
            hold.setAttribute('data-rarity', item.rarity.id.toLowerCase());

            marqueeCheck(otitle);

            obj.appendChild(hold);

            let ic = document.createElement('div');
            ic.classList.add("item-image");

            var img_obj = document.createElement("img");
            var img_src;

            if (item.images.icon != null)
                img_src = item.images.icon;
            else if (item.images.featured != null)
                img_src = item.images.featured;
            else if (item.images.background != null)
                img_src = item.images.background;

            if (reward.battlepass !== 'paid') {
                let banner_object = document.createElement('i');
                banner_object.classList.add('item-banner');
                banner_object.innerHTML = reward.battlepass;
                banner_object.setAttribute('intensity', 'Low');
                parent.appendChild(banner_object);
            }

            img_obj.src = img_src;
            img_obj.setAttribute("title", item.name + ' for ' + fprice + ' Battle Stars');
            img_obj.setAttribute('otype', item.type.id);

            ic.appendChild(img_obj);
            obj.append(ic);

            obj.addEventListener("click", function() {
                openItemByID(item.id);
            });

            parent.appendChild(obj);

            section_c.append(parent);
        }

        for (const obj of registeredPages) {
            var item_count = document.createElement('a');
            item_count.innerHTML = document.getElementsByName(obj)[0].children.length + ' items';
            item_count.classList.add('items-count');

            document.getElementById('title_' + obj).append(item_count);
        }
    }).catch(e => {
        console.error(e)
    });
}