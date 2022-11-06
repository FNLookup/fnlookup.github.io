var params = new URLSearchParams(window.location.search);
if (params.get("search") != null) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fortnite-api.com/v2/cosmetics/br/search?name=" + params.get("search"), true);
    //xhttp.setRequestHeader("Authorization", "");
    xhttp.send();

    var jsondata;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsondata = JSON.parse(xhttp.responseText);
            console.log(jsondata);

            var image_background = document.getElementById("item-background");
            var item_image = document.getElementById("item-image");
            var item_type = document.getElementById("item-type");
            var item_rarity = document.getElementById("item-rarity-label");
            var item_title = document.getElementById("item-title");
            var item_description = document.getElementById("item-description");
            var item_set = document.getElementById("item-set");
            var item_introduction = document.getElementById("item-introduction");
            var item_release = document.getElementById("item-release");

            item_type.innerHTML = jsondata.data.type.displayValue;
            image_background.setAttribute("data-rarity", item_rarity_convert(jsondata.data.rarity.value));
            item_image.setAttribute("src", jsondata.data.images.icon);
            item_introduction.innerHTML = "Introduced in: Chapter " + jsondata.data.introduction.chapter + ", Season " + jsondata.data.introduction.season;
            item_rarity.innerHTML = jsondata.data.rarity.displayValue;
            item_rarity.setAttribute("data-rarity", item_rarity_convert(jsondata.data.rarity.value));
            item_title.textContent = jsondata.data.name;
            item_description.innerHTML = jsondata.data.description;

            var first_release = jsondata.data.added;
            var formats = first_release.split("T")[0];
            var date_array = formats.split("-");                    
            var rel_time = checkDay(getMonth(date_array[1]) + ' ' + getDay(date_array[2]) + ', ' + date_array[0], formats);

            var ocurrences = jsondata.data.shopHistory.length;
            if (jsondata.data.shopHistory != null) {
                item_release.innerHTML = "Release: " + rel_time + " (" + ocurrences + " ocurrences since)";
            } else {
                item_release.style.display = "none";
            }
            if (jsondata.data.set != null) {
                item_set.innerHTML = "Set: " + jsondata.data.set.value;
            } else {
                item_set.style.display = "none";
            }

            var i_sh = document.getElementById("shopHistory");
            var shopHistory = jsondata.data.shopHistory;
            if (shopHistory != null && shopHistory.length > 0) {
                for (var i = 0; i < shopHistory.length; i++) {
                    var date = shopHistory[i];
                    var format = date.split("T")[0];
                    var dates = format.split("-");                    
                    var time = checkDay(getMonth(dates[1]) + ' ' + getDay(dates[2]) + ', ' + dates[0], format, i);
                    
                    var text = document.createElement("p");
                    text.classList.add('item-description');
                    text.style.fontSize = "20px";
                    text.innerHTML = time;
                    i_sh.appendChild(text);
                }
            }
        }
    }
} else {
    var image_background = document.getElementById("item-background");
    var item_image = document.getElementById("item-image");
    var item_type = document.getElementById("item-type");
    var item_rarity = document.getElementById("item-rarity-label");
    var item_title = document.getElementById("item-title");
    var item_description = document.getElementById("item-description");
    var item_set = document.getElementById("item-set");

    var left_col = document.getElementById("main-leftcol").style.display = "none";
    var d_heading = document.getElementById("description-heading").style.display = "none";
    var i_description = document.getElementById("item-description").style.display = "none";
    var i_set = document.getElementById("item-set").style.display = "none";
    var i_rarity = document.getElementById("item-release").style.display = "none";
    var i_introduction = document.getElementById("item-introduction").style.display = "none";
    var i_sh = document.getElementById("item-shopHistory").style.display = "none";

    image_background.style.display = "none";
    item_image.style.display = "none";
    item_type.innerHTML = "Notice";
    item_rarity.style.display = "none";
    item_title.innerHTML = "No item specified";
    item_description.style.display = "none";
    item_set.style.display = "none";
}

function checkDay(ogStr, date, iterator) {
    var day = new Date(date);
    var now = new Date();

    var tags = [];
    if (iterator == 0) {
        tags.push("release");
    }
    console.log(tags);

    var theday = [
        day.getUTCDate(),
        day.getUTCMonth(),
        day.getUTCFullYear()
    ];
    var today = [
        now.getUTCDate(),
        now.getUTCMonth(),
        now.getUTCFullYear()
    ];

    if (
        theday[0] == today[0] &&
        theday[1] == today[1] &&
        theday[2] == today[2]
    ) {
        tags.push("today");
    }

    var final = "";
    if (tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
            final += "(" + tags[i] + ") ";
        }
    }
    final += ogStr;
    return final;
}

function getMonth(month) {
    var m = "";
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    m = months[parseInt(month - 1)];
    return m;
}

function getDay(day) {
    return parseInt(day);
}