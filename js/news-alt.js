function newsAlt() {
    let parent = document.getElementById('news-mobile');
    
    fetch('https://fortnite-api.com/v2/news/br').then(response => response.json()).then(response => {
        var data = response.data.motds;

        for (let i = 0; i < data.length; i++) {

            let container = document.createElement('div');
            container.classList.add('flex-media');
            container.classList.add('news-item');

            if (i !== data.length - 1 && i !== 0) {
                let hr= document.createElement('hr');
                hr.classList.add('hidden-media-o');
                container.appendChild(hr);
            }

            let image = document.createElement('img');
            image.src = data[i].image;
            image.classList.add('d-50-media');
            image.classList.add('news-item-image');
            container.appendChild(image);

            /// image part ended

            let context = document.createElement('div');
            context.classList.add('d-50-media');
            context.classList.add('mobile-media-content');

            let tabTitle = document.createElement('h3');
            tabTitle.innerHTML = data[i].tabTitle;

            let title = document.createElement('h2');
            title.innerHTML = data[i].title;

            let body = document.createElement('p');
            body.innerHTML = data[i].body;

            context.appendChild(tabTitle);
            context.appendChild(title);
            context.appendChild(body);

            container.appendChild(context);

            parent.appendChild(container);
        }
    })
}