var tabs = [];
let selected = 0;

function create() {
    fetch(geturllang('https://fnlookup-api.vercel.app/api?endpoint=news&type=br', 1)).then(response => response.json()).then(response => {
        document.getElementsByClassName('text-wait')[0].setAttribute('done', 'true');

        var news = response.news;

        for (let i in news) {
            let breaking = news[i]

            if (breaking.live /* || true */) {
                var tab = document.createElement('div');
                tab.classList.add('page-header');
                tab.innerHTML = breaking.tabTitle;
                if (breaking == news[0]) {
                    tab.setAttribute('selected', 'true');
                    document.getElementById('content-title').innerHTML = breaking.title;
                    document.getElementById('content-description').innerHTML = breaking.body;
                    document.body.style.backgroundImage = 'url(' + breaking.image + ')';
                }

                document.getElementById('news-container').appendChild(tab);
                tabs.push(tab);

                tab.addEventListener('click', function() {
                    for (let to of tabs) {
                        to.setAttribute('selected', 'false');
                    }

                    tabs[i].setAttribute('selected', 'true');

                    if (selected != i) {
                        var desc = document.getElementById('content-description');
                        var title = document.getElementById('content-title');

                        desc.classList.remove('transition-all');
                        desc.style.opacity = '0';
                        title.classList.remove('transition-all');
                        title.style.opacity = '0';
                        title.style.marginLeft = '-1rem';
                        var x = setInterval(function() {
                            clearInterval(x);
                            desc.classList.add('transition-all');
                            desc.style.opacity = '1';
                            title.classList.add('transition-all');
                            title.style.opacity = '1';
                            title.style.marginLeft = '0rem';
                        }, 1);
                    }

                    selected = i;

                    title.innerHTML = breaking.title;
                    desc.innerHTML = breaking.body;

                    document.body.style.backgroundImage = 'url(' + breaking.image + ')';
                });
            }
        }
    });
}