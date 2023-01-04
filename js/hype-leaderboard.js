function doTable() {
    fetch('assets/local/epic/hype-leaderboard.json').then(r => r.json()).then(r => {
        let nationalities = [];

        for (let entry of r.entries) {
            let tableObject = gne('tr');
            tableObject.classList.add('table-entry');

            let rank, name, points;
            rank = gne('th');

            rank.classList.add('player-rank', 'bot');
            rank.innerHTML = entry.rank;

            name = gne('th');
            name.classList.add('player-name', 'bot');
            if (entry.players[0] !== null) {
                let flag = gne('div')
                flag.classList.add('player-flag');
                let img = gne('img');

                img.src = getFlag(entry.players[0].country);
                img.title = entry.players[0].country.toLowerCase();

                flag.append(img);

                name.append(flag);
                name.innerHTML += entry.players[0].displayName;

                if (!nationalities.includes(entry.players[0].country)) {
                    nationalities.push(entry.players[0].country);
                }
            } else {
                name.innerHTML = '???';
            }

            points = gne('th');
            points.classList.add('player-points', 'bot');
            points.innerHTML = entry.pointsEarned;

            tableObject.append(rank, name, points);
            document.querySelector('#leaderboard-body').appendChild(tableObject);
        }

        console.log(nationalities.join('\n'));
    }).catch(err => {
        console.error(err);
    })
}