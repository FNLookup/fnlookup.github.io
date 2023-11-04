function prepareOptions() {
    let list = document.getElementById("nav-items");

    let nav_items = [
        {
            name: 'Item Shop',
            href: 'item-shop.html',
        },
        {
            href: 'search.html',
            name: 'Cosmetics'
        },
        {
            href: 'predictions.html',
            name: 'Predictions'
        },
        {
            href: 'battle-pass.html',
            name: 'Battle Pass'
        },
        {
            href: 'challenges.html',
            name: 'Quests',
        },
        {
            href: 'augments.html',
            name: 'Augments'
        },
        {
            href: 'news.html',
            name: 'In-game News'
        },
        {
            href: 'stats.html',
            name: 'Player Stats',
        },
        {
            href: 'sac-codes.html',
            name: 'SAC Codes'
        },
        {
            href: 'game-modes.html',
            name: 'Discovery'
        },
        {
            href: 'island.html',
            name: 'Creative Island'
        },
        {
            href: 'map.html',
            name: 'Map'
        },
        {
            href: 'weapons.html',
            name: 'Loot/Weapons'
        },
        {
            href: 'vehicles.html',
            name: 'Vehicles'
        },
        {
            href: 'new-cosmetics.html',
            name: 'New Cosmetics',
        },
        
        {
            href: 'random-cosmetics.html',
            name: 'Locker Generator'
        },
        {
            href: 'progress.html',
            name: 'Season Progress',
        },
        {
            href: 'seasons.html',
            name: 'All Seasons'
        },
        {
            href: 'achievements.html',
            name: 'Legacy Achievements'
        },
        {
            href: 'twitch-drops.html',
            name: 'Twitch Drops'
        },
        {
            href: 'fish.html',
            name: 'Fish'
        },
        {
            name: 'Fortnite Crew',
            href: 'crew-pack.html'
        },
        {
            name: 'Crew History',
            href: 'crew-history.html'
        },
        {
            name: 'Tournaments',
            href: 'tournaments.html'
        },
        {
            name: 'Hype Leaderboard',
            href: 'hype-leaderboard.html'
        },
        {
            name: 'AES Keys & Mappings',
            href: 'aes-mappings.html'
        },
        {
            name: 'About',
            href: 'about.html'
        },
        {
            name: '<svg viewBox="0 0 24 24" width="25" height="25"><g><path d="M11.99,1.98C6.46,1.98,1.98,6.47,1.98,12s4.48,10.02,10.01,10.02c5.54,0,10.03-4.49,10.03-10.02S17.53,1.98,11.99,1.98z M8.86,14.5c-0.16-0.82-0.25-1.65-0.25-2.5c0-0.87,0.09-1.72,0.26-2.55h6.27c0.17,0.83,0.26,1.68,0.26,2.55 c0,0.85-0.09,1.68-0.25,2.5H8.86z M14.89,15.5c-0.54,1.89-1.52,3.64-2.89,5.15c-1.37-1.5-2.35-3.25-2.89-5.15H14.89z M9.12,8.45 c0.54-1.87,1.52-3.61,2.88-5.1c1.36,1.49,2.34,3.22,2.88,5.1H9.12z M16.15,9.45h4.5c0.24,0.81,0.37,1.66,0.37,2.55 c0,0.87-0.13,1.71-0.36,2.5h-4.51c0.15-0.82,0.24-1.65,0.24-2.5C16.39,11.13,16.3,10.28,16.15,9.45z M20.29,8.45h-4.38 c-0.53-1.97-1.47-3.81-2.83-5.4C16.33,3.45,19.04,5.56,20.29,8.45z M10.92,3.05c-1.35,1.59-2.3,3.43-2.83,5.4H3.71 C4.95,5.55,7.67,3.44,10.92,3.05z M3.35,9.45h4.5C7.7,10.28,7.61,11.13,7.61,12c0,0.85,0.09,1.68,0.24,2.5H3.34 c-0.23-0.79-0.36-1.63-0.36-2.5C2.98,11.11,3.11,10.26,3.35,9.45z M3.69,15.5h4.39c0.52,1.99,1.48,3.85,2.84,5.45 C7.65,20.56,4.92,18.42,3.69,15.5z M13.09,20.95c1.36-1.6,2.32-3.46,2.84-5.45h4.39C19.08,18.42,16.35,20.55,13.09,20.95z" stroke="white"></path></g></svg> Language',
            href: 'language-picker.html'
        }
    ]

    for (let nav_option of nav_items) {
        if (nav_option.href !== null) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.classList.add('nav-item');
            a.innerHTML = nav_option.name + ' ';
            a.href = nav_option.href;
            li.append(a);

            list.append(li);
        }
    }
}