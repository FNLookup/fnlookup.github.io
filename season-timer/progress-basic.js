function initialize() {
    fetch(geturllang('https://fortniteapi.io/v1/seasons/list', 1), {
        headers: {'Authorization': '***REMOVED***'}
    }).then(response=>response.json()).then(response => {
        let seasons = [
            response.seasons[response.seasons.length - 2],
            response.seasons[response.seasons.length - 1]
        ]
        var start = seasons[0].startDate;
        var end = seasons[0].endDate;
        doCalc(start, end);
        window.seasonTimer = setInterval(function() {
            doCalc(start, end);
        }, 500);
    });
}

function doCalc(startDate, endDate) {
    var end = new Date(endDate);
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