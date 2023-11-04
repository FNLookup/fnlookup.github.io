function fetchModes() {
    let modecreator = document.getElementById('island-author');
    let modeName = document.getElementById('gmode-name');
    let modetags = document.getElementById('tags');
    let modeimage = document.getElementById('gmode-image');
    let modedesc = document.getElementById('description');

    let requestData = getRequestData('gamemodes?enabled=true');
    fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
        let modes = r.modes;
        console.log(r);

        let playlistModel = document.getElementById('playlist-model');

        for (let mode of modes) {
            let box = gne('div')
            box.classList.add('playlist-box')

            let imga = gne('div')
            imga.classList.add('playlist-image-holder')

            let img = gne('img')
            img.classList.add('playlist-img')
            img.title = mode.name;

            img.src = mode.image;

            let holder = gne('div');
            holder.classList.add('playlist-name-holder');

            let name = gne('p')
            name.classList.add('playlist-name')

            name.innerHTML = mode.name

            holder.appendChild(name)
            imga.append(img, holder)
            box.append(imga)
            playlistModel.appendChild(box)

            box.onclick = () => {
                modecreator.innerHTML = 'Epic Games'
                modeName.innerHTML = mode.name;
                modetags.innerHTML = '';
                modeimage.innerHTML = '<img src="' + mode.image + '" alt="Img">'
                modedesc.innerHTML = mode.description;
            }
        }
    });

    let requestDataFt = getRequestData('featured');
    fetch(requestDataFt.url, requestDataFt.data).then(r => r.json()).then(r => {
        let modes = r.featured;
        console.log(r);

        let playlistModel = document.getElementById('islands-model');

        for (let mode of modes) {
            let box = gne('div')
            box.classList.add('playlist-box')

            let imga = gne('div')
            imga.classList.add('playlist-image-holder')

            let img = gne('img')
            img.classList.add('playlist-img')
            img.title = mode.title;
            img.src = mode.image;

            let holder = gne('div');
            holder.classList.add('playlist-name-holder');

            let name = gne('p')
            name.classList.add('playlist-name')

            name.innerHTML = mode.title

            holder.appendChild(name)
            imga.append(img, holder)

            box.append(imga)
            playlistModel.appendChild(box)

            box.onclick = () => {
                modecreator.innerHTML = mode.creator;
                modeName.innerHTML = mode.title;
                modetags.innerHTML = '';

                for (let tag of mode.tags) {
                    let to = gne('a');
                    to.classList.add('ci-tag');
                    to.innerHTML = tag;
                    modetags.append(to);
                }

                modeimage.innerHTML = '<img src="' + mode.image + '" alt="Img">'
                modedesc.innerHTML = mode.description;
            }
        }
    });
}