//if enter key is pressed call search function
document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        search();
    }
});

function search() {
    var search = document.getElementById("search").value;
    var url = window.location.href;
    url = url.split("?")[0];

    //split the /
    var url_split = url.split("/");
    //use all of the url except the last one
    var url_new = url_split.slice(0, url_split.length - 1).join("/");
    //add the new url
    url = url_new + "/item.html?search=" + search;


    if (search == "" || search == null) {
        alert("Invalid search");
    } else {
        window.location.href = url;
    }
}