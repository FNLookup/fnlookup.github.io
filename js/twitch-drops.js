function getdrops() {
    fetch('https://fortniteapi.io/v1/twitch/drops', {
        headers: {
            'Authorization': localStorage.keyFNAPIIo
        }
    }).then(r => r.json()).then(r => {
        for (drop of r.drops) {
            makeTwitchDropCard(drop);
        }
    }).catch(err => {
        console.error(err);
    });
}

function makeTwitchDropCard(dropObject) {
    console.log(dropObject);

    let drop = document.createElement('div');
    drop.classList.add('twitch-drop');

    let img = document.createElement('img');
    img.classList.add('hidden-media');
    img.src = dropObject.gameArtUrl;
    drop.appendChild(img);

    let context = document.createElement('div');
    context.classList.add('twitch-drop-info', 'flex', 'flex-wrap');

    let left = document.createElement('div');
    left.classList.add('d-70-media');

    let name = document.createElement('h2');
    name.innerHTML = dropObject.name

    let desc = document.createElement('p');
    desc.innerHTML = dropObject.description;

    left.append(name, desc);

    /////////////////////////////////

    let right = document.createElement('div');
    right.classList.add('d-30-media', 'text-right');

    let sDate = document.createElement('p');
    sDate.innerHTML = getFormatDate(new Date(dropObject.startDate.split('T')[0]))

    let eDate = document.createElement('p');
    eDate.innerHTML = getFormatDate(new Date(dropObject.endDate.split('T')[0]))

    right.append(sDate, document.createElement('br'), eDate);

    context.append(left, right);
    drop.appendChild(context);

    ////////////////////////////////////

    let acstuff = document.createElement('div');
    
    let accounts = document.createElement('a');
    accounts.innerHTML = 'Channels allowed';
    let arrow = document.createElement('i'); arrow.classList.add('arrow', 'sideways');
    accounts.classList.add('links', 'pointer', 'twitch-drops-ca');
    accounts.appendChild(arrow);

    let channels = document.createElement('div');
    channels.classList.add('hidden');

    for (let channel of dropObject.allowed.channels) {
        let chname = document.createElement('a');
        chname.classList.add('twitch-channel');

        let tl = document.createElement('img');
        tl.src = 'assets/images/twitch.png';

        chname.append(tl);
        chname.innerHTML += channel.displayName;
        chname.href = 'https://www.twitch.tv/' + channel.name + '/';

        channels.append(chname);
    }

    accounts.addEventListener('click', function() {
        arrow.classList.toggle('sideways');
        channels.classList.toggle('hidden');
    });

    acstuff.append(accounts);
    acstuff.append(channels);

    context.append(acstuff);

    document.getElementById('drops').appendChild(drop);
}