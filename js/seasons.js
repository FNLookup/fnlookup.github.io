function gets() {
    fetch(geturllang('https://fnlookup-api.vercel.app/api?endpoint=seasons', 1)).then(r => r.json()).then(r => {
        for (i=0;i<r.seasons.length;i++) {
            let season = r.seasons[i]

            let p = document.createElement('div');
            p.classList.add('season');

            let image = document.createElement('img');
            image.src = 'https://fortnite.gg/img/seasons/' + (i + 1) + '.jpg';
            p.appendChild(image);

            let content = document.createElement('div');
            content.classList.add('season-context');
            p.appendChild(content);

            if (i !== 0) {
                let bpButton = document.createElement('a');
                bpButton.classList.add('season-bp-button');
                bpButton.innerHTML = 'VIEW BATTLE PASS';
                bpButton.href = 'battle-pass.html?season=' + (i + 1);
    
                p.appendChild(bpButton);
            }

            let title = document.createElement('h1');
            title.innerHTML = season.displayName;
        
            let sDate = new Date(season.startDate.split(' ')[0]);

            let startDate = document.createElement('p');
            startDate.innerHTML = 'Started ' + getFormatDate(sDate);

            content.appendChild(title);
            content.appendChild(startDate);

            if (season.endDate !== null) {
                let eDate = season.endDate.split(' ')[0];

                let endDate = document.createElement('p');
                endDate.innerHTML = 'Ended ' + getFormatDate(new Date(eDate));

                if (new Date(eDate).getTime() > new Date().getTime()) {
                    endDate.innerHTML = 'Ends ' + getFormatDate(new Date(eDate));
                }

                content.appendChild(endDate);
            } else {
                startDate.innerHTML = 'Starts ' + getFormatDate(sDate);
            }

            document.getElementById('seasons').appendChild(p);
        }

    }).catch(err => {
        console.error(err);
    })
}