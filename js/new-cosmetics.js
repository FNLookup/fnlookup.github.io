function init() {
    fetch(geturllang("https://fortnite-api.com/v2/cosmetics/br/new", 0)).then(response=>response.json()).then(response=>{
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
            let items = response.data.items;

            for (let j = 0; j < items.length; j++) {
                let b = document.createElement('div');
                b.classList.add('item-card-parent');
                    
                const item_obj = items[j];

                var obj = document.createElement("div");
                obj.classList.add("item-card");
                obj.setAttribute('data-rarity', item_obj.rarity.value);

                var hold = document.createElement("div");
                hold.classList.add("item-info");

                var title = document.createElement('span');
                title.innerHTML = item_obj.name;
                title.classList.add("item-title");

                hold.appendChild(title);
                obj.appendChild(hold);

                var img_obj = document.createElement("img");
                var img_src;

                if (item_obj.images.featured != null)
                    img_src = item_obj.images.featured;
                else if (item_obj.images.icon != null)
                    img_src = item_obj.images.icon;
                else if (item_obj.images.smallIcon != null)
                    img_src = item_obj.images.smallIcon;

                let ic = document.createElement('div');
                ic.classList.add("item-image");

                img_obj.src = img_src;
                img_obj.setAttribute("title", item_obj.name);

                ic.appendChild(img_obj);
                obj.appendChild(ic);

                obj.addEventListener("click", function() {
                    window.location.href = 'item.html?q=' + item_obj.name.toLowerCase();
                });

                b.append(obj);

                document.getElementById('items').append(b);
            }

            var item_count = document.createElement('a');
            item_count.innerHTML = items.length + ' items';
            item_count.classList.add('items-count');
    
            document.getElementById('cosmetic-page-title').append(item_count);
        }

    }).catch(error => {
        let eText = document.createElement('h1');
        console.error(error);
        eText.innerHTML = error;
        document.getElementById('page-content').append(eText);
    });
}