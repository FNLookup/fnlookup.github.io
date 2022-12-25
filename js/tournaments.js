function getcompetitive() {
    fetch(geturllang('https://fortniteapi.io/v1/events/list?region=NAE', 1), {
        headers: {'Authorization': localStorage.keyFNAPIIo}
    }).then(r => r.json()).then(r => {

        console.log(r);

        let main = document.getElementById('main');
    
        for (let i = r.events.length - 19; i < r.events.length; i++) {
            let event = r.events[i];
            console.log(event);

            let eventbox = gne('div');
            eventbox.classList.add('event-poster');

            let posterimgh = gne('div');
            posterimgh.classList.add('event-img');
            let poster = gne('img');
            poster.src = event.poster;

            posterimgh.appendChild(poster);
            eventbox.append(posterimgh);

            let textholder = gne('div');
            textholder.classList.add('event-text');

            let line1 = gne('p');
            line1.classList.add('event-text-line1');
            line1.innerHTML = event.name_line1;
            let line2 = gne('p');
            line2.classList.add('event-text-line2');
            line2.innerHTML = event.name_line2;

            textholder.append(line1,line2);
            eventbox.append(textholder);

            main.appendChild(eventbox);
        }
    })
}