var params = new URLSearchParams(window.location.search);
if (params.get("search") != null) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fortnite-api.com/v2/cosmetics/br/search?name=" + params.get("search"), true);
    //xhttp.setRequestHeader("Authorization", "");
    xhttp.send();

    var jsondata;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jsondata = JSON.parse(xhttp.responseText);
            console.log(jsondata);

            var main = document.createElement("div");
            main.setAttribute("id", "main");

            var item_name = document.createElement("a");
            item_name.innerHTML = jsondata.data.name;
            item_name.style.fontWeight = "bold";
            item_name.style.fontSize = "20px";

            var item_rarity = document.createElement("a");
            var rarity = jsondata.data.rarity.displayValue;
            item_rarity.innerHTML = " (" + jsondata.data.rarity.displayValue + ")";
            if (rarity == "Common") {
                item_rarity.style.color = "#bcbfc1";
            } else if (rarity == "Uncommon") {
                item_rarity.style.color = "#88ef00";
            } else if (rarity == "Rare") {
                item_rarity.style.color = "#00dffb";
            } else if (rarity == "Epic") {
                item_rarity.style.color = "#df3fff";
            } else if (rarity == "Legendary") {
                item_rarity.style.color = "#fba74e";
            }

            item_rarity.style.fontWeight = "bold";
            item_rarity.style.fontSize = "20px";    

            var item_desc = document.createElement("p");
            item_desc.innerHTML = jsondata.data.description;
            item_desc.style.fontWeight = "10px";
            item_desc.style.fontSize = "18px";
            item_desc.style.marginLeft = "10px";

            main.appendChild(item_name);
            main.appendChild(item_rarity);
            main.appendChild(item_desc);

            if (jsondata.data.set != null) {
                var item_set = document.createElement("p");
                item_set.innerHTML = jsondata.data.set.text;
                item_set.style.fontWeight = "10px";
                item_set.style.fontSize = "18px";
                item_set.style.marginLeft = "10px";
                main.appendChild(item_set);
            }

            if (jsondata.data.introduction != null) {
                var item_intro = document.createElement("p");
                item_intro.innerHTML = jsondata.data.introduction.text;
                item_intro.style.fontWeight = "10px";
                item_intro.style.fontSize = "18px";
                item_intro.style.marginLeft = "10px";
                main.appendChild(item_intro);
            }

            var img = document.createElement("img");
            img.src = jsondata.data.images.icon;

            var div = document.createElement("div");
            div.setAttribute("id", "icon");
            div.style.textAlign = "center";
            div.style.fontWeight = "bold";
            div.style.borderRadius = "10px";
            div.style.border = "10px solid black";
            div.style.width = 1024 / 4 + "px";

            if (rarity == "Common") {
                div.style.backgroundColor = "#bcbfc1";
            } else if (rarity == "Uncommon") {
                div.style.backgroundColor = "#88ef00";
            } else if (rarity == "Rare") {
                div.style.backgroundColor = "#00dffb";
            } else if (rarity == "Epic") {
                div.style.backgroundColor = "#df3fff";
            } else if (rarity == "Legendary") {
                div.style.backgroundColor = "#fba74e";
            }

            div.appendChild(img);

            img_px = 1024 / 4;
            img.style.width = img_px + "px";
            img.style.height = img_px + "px";

            main.appendChild(div);

            if (jsondata.data.images.featured != null) {
                var img = document.createElement("img");
                img.src = jsondata.data.images.featured;
    
                var div = document.createElement("div");
                div.setAttribute("id", "featured_image");
                div.style.textAlign = "center";
                div.style.fontWeight = "bold";
                div.style.borderRadius = "10px";
                div.appendChild(img);
                div.style.border = "10px solid black";
                div.style.width = 1024 / 4 + "px";
    
                if (rarity == "Common") {
                    div.style.backgroundColor = "#bcbfc1";
                } else if (rarity == "Uncommon") {
                    div.style.backgroundColor = "#88ef00";
                } else if (rarity == "Rare") {
                    div.style.backgroundColor = "#00dffb";
                } else if (rarity == "Epic") {
                    div.style.backgroundColor = "#df3fff";
                } else if (rarity == "Legendary") {
                    div.style.backgroundColor = "#fba74e";
                }
    
                img_px = 1024 / 4;
                img.style.width = img_px + "px";
                img.style.height = img_px + "px";
    
                main.appendChild(div);
            }


            // styles

            if (jsondata.data.variants != null) {
                for (var i = 0; i < jsondata.data.variants.length; i++) {
                    var variant = jsondata.data.variants[i];
                    var name = variant.type;

                    var div = document.createElement("div");
                    div.innerHTML = name;
                    div.style.fontWeight = "bold";
                    div.style.fontSize = "20px";

                    main.appendChild(div);

                    var list = document.createElement("ul");
                    list.style.listStyle = "expand";
                    list.style.marginLeft = "10px";
                    list.style.fontWeight = "10px";
                    list.style.fontSize = "18px";

                    for (var j = 0; j < variant.options.length; j++) {
                        //create an expandable list

                        var option = variant.options[j];
                        var option_name = option.name;
                        var image = option.image;

                        var div = document.createElement("div");
                        div.setAttribute("id", "variant" + i + j);
                        div.style.textAlign = "center";
                        div.innerHTML = option_name;
                        div.style.fontWeight = "bold";
                        div.style.borderRadius = "10px";
                        div.style.border = "5px solid black";
                        
                        var img = document.createElement("img");
                        img.src = image;

                        div.style.width = 148 + "px";
                        div.style.height = 148 + "px";
                        div.appendChild(img);

                        list.appendChild(div);

                        main.appendChild(list);
                    }
                }
            }
 
            document.body.appendChild(main);
            //add text "At the item shop the:"


            if (jsondata.data.shopHistory != null) {
                var tx = document.createElement("div");
                tx.innerHTML = "At the item shop ";
                tx.style.fontWeight = "bold";
                tx.style.fontSize = "20px";
                tx.style.marginLeft = "10px";
                main.appendChild(tx);

                var shopHistory = jsondata.data.shopHistory;
                var div = document.createElement("ul");

                for (var i = 0; i < shopHistory.length; i++) {
                    var shop = shopHistory[i];
                    shop = shop.split("T")[0];

                    var date = new Date(shop);
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var year = date.getFullYear();

                    var day_suffix = "th";
                    if (day == 1 || day == 21 || day == 31) {
                        day_suffix = "st";
                    } else if (day == 2 || day == 22) {
                        day_suffix = "nd";
                    } else if (day == 3 || day == 23) {
                        day_suffix = "rd";
                    }

                    //get the month as its name
                    var month_name = "";
                    if (month == 1) {
                        month_name = "January";
                    } else if (month == 2) {
                        month_name = "February";
                    } else if (month == 3) {
                        month_name = "March";
                    } else if (month == 4) {
                        month_name = "April";
                    } else if (month == 5) {
                        month_name = "May";
                    } else if (month == 6) {
                        month_name = "June";
                    } else if (month == 7) {
                        month_name = "July";
                    } else if (month == 8) {
                        month_name = "August";
                    } else if (month == 9) {
                        month_name = "September";
                    } else if (month == 10) {
                        month_name = "October";
                    } else if (month == 11) {
                        month_name = "November";
                    } else if (month == 12) {
                        month_name = "December";
                    }
                    var date_str = month_name + " " + day + day_suffix + ", " + year;
                    var text = document.createElement("li");
                    text.innerHTML = date_str;
                    div.appendChild(text);
                }

                main.appendChild(div);
            }
        }
    }

}

function search() { 
    var search = document.getElementById("search").value;
    var url = window.location.href;
    url = url.split("?")[0];
    window.location.href = url + "?search=" + search;
}