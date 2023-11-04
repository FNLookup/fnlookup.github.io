function loadHistory() {
    let requestData = getRequestData('crew-history');
    fetch(requestData.url, requestData.data).then(r=>r.json()).then(r=> {

        for (let i in r.history) {
            let crew = r.history[i]

            let c = gne('a');
            c.classList.add('challenge-category');

            let img = gne('img');
            img.src = crew.images.skin;

            let title = gne('h2');
            title.classList.add('challenge-title');
            title.innerHTML = crew.rewards[0].item.name;

            if (crew.colors !== null) {
                let colorThing = '#' + crew.colors.A + ', ' + '#' + crew.colors.B;
                let cssThing = 'linear-gradient(to bottom, ' + colorThing + ')';
                img.style.background = cssThing;
            }

            c.append(img, title)
            c.href = 'crew-pack.html?crewID=' + i;

            document.querySelector('#crew-packs-wrapper').appendChild(c);
        }

    });
}