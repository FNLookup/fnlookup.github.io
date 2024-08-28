function loadBlogData() {
    let params = new URLSearchParams(window.location.search)

    let blogId = params.get('id')

    fetch('https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/' + blogId + '/BLOG_DATA.md')
    .then(response => response.text())
    .then(text => {
        const content = document.getElementById('blog-data');
        content.innerHTML = marked.parse(text);

        for (let child of content.children) {
            for (let childrenofthechild of child.children) {
                let nodename = childrenofthechild.nodeName

                if (nodename == 'IMG') {
                    let stupidSplit = childrenofthechild.src.split('/')
                    childrenofthechild.src = 'https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/' + blogId + '/' + stupidSplit[stupidSplit.length - 1]
                }
            }

        }
    })

    fetch('https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/' + blogId + '/info.json')
    .then(response => response.json())
    .then(r => {
        document.getElementById('blog-banner').src = 'https://raw.githubusercontent.com/FNLookup/fnlookup-blog/main/' + blogId + '/' + r['header-image']
    })
    .catch(error => console.error(error));
}