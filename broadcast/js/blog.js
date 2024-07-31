function loadBlog() {
    let data = getApiRequestData('https://fnlookup-apiv2.vercel.app/api?broadcast=true');
    fetch(data.url, data.data)
    .then(response => response.json())
    .then(json => {
        for (blog of json.directory) {
            async function createBlog() {
                let information = await fetch('https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/' + blog.id + '/info.json')
                let infofile = await information.json()

                document.getElementById('blog-entries').innerHTML += `            <a href="read/?id=${blog.id}" class="blog-post d-30-media fortnite-button-border">
                <img src="https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/${blog.id}/${infofile['header-image']}" alt="Design" class="image">
                <div class="information">
                    <h3 class="header-text-bold">${blog.shortTitle}</h3>
                    <h4 class="header-text-bold">${infofile['written-by']}</h4>
                </div>
            </a>`
            }

            createBlog()
        }
    })
    .catch(error => console.error(error));
}