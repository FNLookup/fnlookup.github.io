newsBasic = false;

function newsAlt() {
    let parent = document.getElementById('news-mobile');
    if (parent.getAttribute('basic') == 'true') newsBasic = true;
    
    fetch(geturllang('https://fortniteapi.io/v1/news?type=br', 1), {
        headers: { 'Authorization': keyFNAPIIo }
    }).then(response => response.json()).then(response => {
        var news = response.news;

        let areWeOld = false;
        let yesWeAreOld = false;

        for (let i in news) {
            let breaking = news[i]

            let container = document.createElement('div');
            container.classList.add('news-item');

            if (i !== 0) {
                let hr= document.createElement('hr');
                hr.classList.add('hidden-media-o');
                container.appendChild(hr);
            }

            let image = document.createElement('img');
            image.src = breaking.image;
            image.classList.add('full-size');
            image.classList.add('news-item-image');
            container.appendChild(image);

            if (!breaking.live && !areWeOld) {
                areWeOld = true;
            }

            if (areWeOld && newsBasic) return;
            if (areWeOld && !yesWeAreOld) {
                document.getElementsByClassName('content')[0].innerHTML += '<hr><h1 class="shop-section-title">Previous News</h1><div class="news-mobile" id="old-news"></div>';
                parent = document.getElementById('old-news');
                yesWeAreOld = true;
            }

            /// image part ended

            let context = document.createElement('div');
            context.classList.add('mobile-media-content');

            let tabTitle = document.createElement('h3');
            tabTitle.innerHTML = breaking.tabTitle;

            let title = document.createElement('h2');
            title.innerHTML = breaking.title;

            let body = document.createElement('p');
            body.innerHTML = breaking.body;

            context.appendChild(tabTitle);
            context.appendChild(title);
            context.appendChild(body);

            container.appendChild(context);

            parent.appendChild(container);
        }
    })
}