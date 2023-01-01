function getach() {
    fetch(geturllang('https://fortniteapi.io/v1/achievements', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r => r.json()).then(r => {
        let content = document.getElementsByClassName('content')[0];

        let main = gne('div');
        main.classList.add('achievements');
        content.append(main);

        for (let achievement of r.achievements) {
            let item = gne('div');
            item.classList.add('achievement-item');

            let inner = gne('div');
            inner.classList.add('achievement-inner');

            let img = gne('img');
            img.classList.add('achievement-icon');
            img.src = achievement.image;
            img.title = achievement.name;

            let title = gne('p');
            title.classList.add('achievement-title');
            title.innerHTML = achievement.name;
            let desc = gne('p')
            desc.classList.add('achievement-description');
            desc.innerHTML = achievement.description;

            ///// fortnite styled stuff
            let deco1 = gne('div');
            deco1.classList.add('decoration-1');

            let bart = gne('div');
            bart.classList.add('decoration-top');

            let decoration2 = gne('div');
            decoration2.classList.add('decoration-2');

            let barb = gne('div');
            barb.classList.add('decoration-bottom');

            deco1.append(bart);
            decoration2.append(barb);
            item.append(deco1, decoration2);

            inner.append(img, title, desc)
            item.append(inner);
            main.append(item)
        }

    }).catch(err => {
        console.error(err)
    })
}