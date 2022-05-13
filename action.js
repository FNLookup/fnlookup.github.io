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

            item_type.innerHTML = jsondata.data.type.displayValue;
            image_background.setAttribute("data-rarity", item_rarity_convert(jsondata.data.rarity.value));
            item_image.setAttribute("src", jsondata.data.images.icon);
            item_rarity.innerHTML = jsondata.data.rarity.displayValue;
            item_rarity.setAttribute("data-rarity", item_rarity_convert(jsondata.data.rarity.value));
            item_title.textContent = jsondata.data.name;
            item_description.innerHTML = jsondata.data.description;

            if (jsondata.data.set != null) {
                item_set.innerHTML = "Set: " + jsondata.data.set.value;
            } else {
                item_set.style.display = "none";
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
    image_background.style.display = "none";
    item_image.style.display = "none";
    item_type.innerHTML = "Warning";
    item_rarity.style.display = "none";
    item_title.innerHTML = "No item found";
    item_description.style.display = "none";
    item_set.style.display = "none";
}