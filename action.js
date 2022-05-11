//if enter key is pressed call search function
document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        search();
    }
});


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
            image_background.setAttribute("data-rarity", jsondata.data.rarity.value);
            item_image.setAttribute("src", jsondata.data.images.icon);
            item_rarity.innerHTML = jsondata.data.rarity.displayValue;
            item_rarity.setAttribute("data-rarity", jsondata.data.rarity.value);
            item_title.textContent = jsondata.data.name;
            item_description.innerHTML = jsondata.data.description;

            if (jsondata.data.set != null) {
                item_set.innerHTML = "Set: " + jsondata.data.set.value;
            } else {
                item_set.style.display = "none";
            }
        }
    }
}

function search() {
    var search = document.getElementById("search").value;
    var url = window.location.href;
    url = url.split("?")[0];


    if (search == "" || search == null) {
        alert("Invalid search");
    } else {
        window.location.href = url + "?search=" + search;
    }
}