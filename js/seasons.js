function gets() {
    fetch(geturllang('https://fortniteapi.io/v1/seasons/list', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r => r.json()).then(r => {
        for (let season of r.seasons) {
            let p = document.createElement('div');
            p.classList.add('season-date');

            let title = document.createElement('h1');
            title.innerHTML = season.displayName;
        
            let sDate = new Date(season.startDate.split(' ')[0]);

            let startDate = document.createElement('p');
            startDate.innerHTML = 'Started ' + getFormatDate(sDate);

            p.appendChild(title);
            p.appendChild(startDate);

            if (season.endDate !== null) {
                let eDate = season.endDate.split(' ')[0];

                let endDate = document.createElement('p');
                endDate.innerHTML = 'Ended ' + getFormatDate(new Date(eDate));

                if (new Date(eDate).getTime() > new Date().getTime()) {
                    endDate.innerHTML = 'Ends ' + getFormatDate(new Date(eDate));
                }

                p.appendChild(endDate);
            } else {
                startDate.innerHTML = 'Starts ' + getFormatDate(sDate);
            }

            document.getElementById('seasons').appendChild(p);
        }

    }).catch(err => {
        console.error(err);
    })
}