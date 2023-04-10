function getWeapons() {
    fetch(geturllang('https://fnlookup-api.vercel.app/api?endpoint=loot', 1)).then(r => r.json()).then(r => {
        let content = document.getElementById('weapon-container');

        for (let gun of r.weapons) {
            let main = gne('div');
            main.classList.add('weapon', 'd-30-media');

            let imgHolder = document.createElement('div');
            imgHolder.classList.add('weapon-img') 

            let img = gne('img')
            img.src = gun.images.background;
            imgHolder.appendChild(img)

            main.appendChild(imgHolder);
            content.appendChild(main);

            let details = gne('div');
            details.classList.add('weapon-details')
            main.appendChild(details)
        
            let gunName = gne('h1')
            gunName.innerHTML = gun.name + ' (' + gun.rarity.toUpperCase() + ')' + (!gun.enabled ? ' (VAULTED)' : '');
            gunName.classList.add('weapon-name');
            details.appendChild(gunName);

            let gunDesc = gne('h2');
            gunDesc.innerHTML = gun.description;
            gunDesc.classList.add('weapon-desc');
            details.appendChild(gunDesc);

            let gunS = gun.mainStats;
            let gunStatTable = [
                {
                    name: 'Damage/Bullet',
                    title: 'Damage that is applied to the player when hit by a bullet.',
                    content: gunS.DmgPB
                },
                {
                    name: 'Fire Rate',
                    title: 'Times the weapon can be fired in a second.',
                    content: gunS.FiringRate
                },
                {
                    name: 'Magazine Size',
                    title: 'Bullets available per reload.',
                    content: gunS.ClipSize
                },
                {
                    name: 'Reload Time',
                    title: 'Time it takes to reload the weapon.',
                    content: gunS.ReloadTime + 's'
                },
                {
                    name: 'Bullets/Cartridge',
                    title: 'Bullets in each weapon fire. Shotguns may have more than one.',
                    content: gunS.BulletsPerCartridge
                },
                {
                    name: 'Bloom',
                    title: 'How much the bullet\'s trayectory is going to be affected before hitting a player.',
                    content: gunS.Spread
                },
                {
                    name: 'Bloom (ADS)',
                    title: 'How much the bullet\'s trayectory is going to be affected before hitting a player while aiming down sights.',
                    content: gunS.SpreadDownsights
                },
                {
                    name: 'Headshot Multiplier',
                    title: 'The damage multiplier if the bullet hits the player in the head (Headshot).',
                    content: gunS.DamageZone_Critical + 'x (' + gunS.DmgPB * gunS.DamageZone_Critical + ')'
                }
            ]

            let stats = gne('div');
            stats.classList.add('weapon-stats');
            details.append(stats);

            for (let stat of gunStatTable) {
                let item = gne('div');
                item.classList.add('weapon-stat-item');

                let label = gne('div');
                label.innerHTML = stat.name;
                label.title = stat.title;
                label.classList.add('weapon-stat-label');

                let num = gne('div');
                num.innerHTML = stat.content;
                num.title = 'Value for ' + stat.name;
                num.classList.add('weapon-stat-num');

                item.append(label, num);
                stats.append(item);
            }
        }

    }).catch(err => {
        console.error(err)
    })
}