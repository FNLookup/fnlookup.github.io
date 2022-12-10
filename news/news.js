var tabs = [];
let selected = 0;

function create() {
    fetch('https://fortnite-api.com/v2/news/br').then(response => response.json()).then(response => {
        if (response.status !== 200) {
            let eTitle = document.createElement('h1');
            let eText = document.createElement('h2');
            let error = response.status + ': ' + response.error;
            console.log(error);
            eTitle.innerHTML = 'Error: ' + response.status;
            eText.innerHTML = response.error;
            document.body.append(eTitle);
            document.body.append(eText);

            return;
        }

        var data = response.data.motds;

        for (let i = 0; i < data.length; i++) {
            var tab = document.createElement('div');
            tab.classList.add('page-header');
            tab.innerHTML = data[i].tabTitle;
            if (i == 0) {
                tab.setAttribute('selected', 'true');
                document.getElementById('content-title').innerHTML = data[i].title;
                document.getElementById('content-description').innerHTML = data[i].body;
                document.body.style.backgroundImage = 'url(' + data[i].image + ')';
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

                title.innerHTML = data[i].title;
                desc.innerHTML = data[i].body;

                document.body.style.backgroundImage = 'url(' + data[i].image + ')';
            });
        }
    });
}