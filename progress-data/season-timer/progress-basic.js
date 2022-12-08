function initialize() {
    fetch('../seasonData.json').then(response=>response.json()).then(response => {
        var start = response.thisSeason.startDate;
        var end = response.thisSeason.endDate;

        doCalc(start, end);
        var timer = setInterval(function() {
            doCalc(start, end);
        }, 1000);
    });
}

function doCalc(startDate, endDate) {
    var end = new Date(endDate);
    var start = new Date(startDate);
    var now = new Date();
    var dif = end.getTime() - now.getTime();
    
    var Seconds = Math.floor(dif / 1000);
    var time = formatTime(Seconds);

    document.getElementById("countdown-text").innerHTML = time;
}

function formatTime(seconds)
{
    var numdays = zeroBefore(Math.floor((seconds % 31536000) / 86400)); 
    var numhours = zeroBefore(Math.floor(((seconds % 31536000) % 86400) / 3600));
    var numminutes = zeroBefore(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60));
    var numseconds = zeroBefore((((seconds % 31536000) % 86400) % 3600) % 60);
    return numdays + ':' + numhours + ':' + numminutes + ':' + numseconds;
}

function zeroBefore(num) {
    return (num < 10 ? '0' + num : num);
}