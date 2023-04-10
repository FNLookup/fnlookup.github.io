function loadSet() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('id')) {
        let content = document.getElementById('page-content');

        content.innerHTML = '<h1>Loading...</h1><h3>Loading cosmetic list...</h3><img src="assets/images/loading.gif">';

        fetch(geturllang('https://fnlookup-api.vercel.app/api?endpoint=items&fields=name,id,set,images,displayAssets', 1)).then(data => data.json()).then(data => {
            clearChildren(content);
            content.innerHTML = '<h1>Loading...</h1><h3>Searching for ' + params.get('id') + '</h3><img src="assets/images/loading.gif">';

            let items = data.items;

            let setID = ''
            if (params.has('id')) setID = params.get('id');

            let setItems = []
            for (let item of items) if (item.set && item.set.id.toLowerCase() == setID.toLowerCase()) setItems.push(item);

            clearChildren(content);

            if (setItems.length > 0) {
                let mainObject = gne('div');
                mainObject.classList.add('item');
                content.append(mainObject);
                
                let bottom2 = document.createElement('div');
                mainObject.appendChild(bottom2);

                let title = gne('h1');
                title.classList.add('set-name');
                title.innerHTML = setItems[0].set.name + ' SET';
                title.innerHTML += '<a class="items-count">' + setItems.length + ' items</a>';
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
        });
    } else {
        let eText = document.createElement('h1');
        eText.innerHTML = 'Unfortunately, we found an dead-end!';
        let tipText = document.createElement('h3');
        tipText.innerHTML = 'It looks like the set is not specified. View a set from an item\'s details.';
        document.getElementById('page-content').append(eText, tipText);
        document.getElementById('page-content').innerHTML += '<a href="index.html" class="gray-link">Take me home <i class="arrow sideways"></i></a>'
    }
}