function createItems() {
    console.log("clic")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fortnite-api.com/v2/shop/br", true);
    //xhttp.setRequestHeader("Authorization", "");
    xhttp.send();

    var jsondata;
    var sectiondata;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsondata = JSON.parse(xhttp.responseText);
            console.log(jsondata);

            var dropdown_list = document.getElementById("dropdown-shop-section");
            var section = dropdown_list.value;
            console.log(section);

            if (section == "daily") {
                sectiondata = jsondata.data.daily;
            } else if (section == "featured") {
                sectiondata = jsondata.data.featured;
            }

            var shop_items_div = document.getElementById("group-items");
            //remove all children
            while (shop_items_div.firstChild) {
                shop_items_div.removeChild(shop_items_div.firstChild);
            }

            for (var i = 0; i < sectiondata.entries.length; i++) {
                var items = sectiondata.entries[i].items;
                for (var j = 0; j < items.length; j++) {
                    var item = items[j];

                    var i_container = document.createElement("div");
                    i_container.classList.add("shop-row-item");
                    i_container.classList.add("splash-card");

                    var item_rarity_converted = item_rarity_convert(item.rarity.value);

                    i_container.setAttribute("data-rarity", item_rarity_converted);
                    i_container.innerHTML = item.name;
                    var i_image = document.createElement("img");
                    i_image.src = item.images.smallIcon;
                    i_image.setAttribute("title", item.name);
                    i_container.appendChild(i_image);

                    var name = item.name;
                    var url = window.location.href;
                    url = url.split("?")[0];

                    var url_split = url.split("/");
                    var url_new = url_split.slice(0, url_split.length - 1).join("/");
                    url = url_new + "/item.html?search=" + name;

                    i_container.setAttribute("href", url)
                    i_container.addEventListener("mouseover", function() {
                        this.style.cursor = "pointer";
                    });
                    i_container.onclick = function() {
                        window.location.href = this.getAttribute("href");
                    };
                    // make the div not use an individual line
                    i_container.style.display = "flex";

                    shop_items_div.appendChild(i_container);
                }
            }
        }
    }
}

//use this function to get splash card to work properly
function item_rarity_convert(rarity) {
    if (rarity == "common") {
        return "common";
    } else if (rarity == "uncommon") {
        return "uncommon";
    } else if (rarity == "rare") {
        return "rare";
    } else if (rarity == "epic") {
        return "epic";
    } else if (rarity == "legendary") {
        return "legendary";
    } else if (rarity == "icon") {
        return "icon_series";
    } else if (rarity == "gaminglegends") {
        return "gaming_legends";
    } else if (rarity == "marvel") {
        return "marvel";
    } else if (rarity == "starwars") {
        return "star_wars";
    } else return "common";
}

function createNews() {
    console.log("news loded!!")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fortnite-api.com/v2/news/br", true);
    //xhttp.setRequestHeader("Authorization", "");
    xhttp.send();

    var jsondata;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsondata = JSON.parse(xhttp.responseText);
            console.log(jsondata);

            var news_div = document.getElementById("group-news");
            for (var i = 0; i < jsondata.data.motds.length; i++) {
                var news = jsondata.data.motds[i];
                var news_container = document.createElement("div");
                news_container.classList.add("nav-news-item");
                news_container.innerHTML = news.title;
                news_container.setAttribute("data-id", news.id);

                var news_image = document.createElement("img");

                var resized_image = news.image.split("?")[0];
                resized_image = resized_image + "?width=400";
                news_image.src = resized_image;
                news_image.setAttribute("title", news.title);
                //make the image go below the text
                news_image.style.display = "block";

                news_container.appendChild(news_image);
                news_div.appendChild(news_container);
            }


        }
    }
}