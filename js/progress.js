let seasonSlug = '';

function initialize() {
    let requestData = getRequestData('seasons');
    fetch(requestData.url, requestData.data).then(response=>response.json()).then(response => {
        let seasons = [
            response.seasons[response.seasons.length - 2],
            response.seasons[response.seasons.length - 1]
        ]

        document.getElementById('fn-season').innerHTML = seasons[0].displayName;
        var start = seasons[0].startDate;
        var end = seasons[0].endDate;
        var next_start = seasons[1].startDate;

        document.getElementById('end-date').innerHTML = 'Ends ' + getFormatDate(new Date(end));

        document.getElementById('fn-season-next').innerHTML = seasons[1].displayName;
        document.getElementById('start-date-next').innerHTML = 'Starts ' + getFormatDate(new Date(next_start));

        seasonSlug = 'C' + seasons[0].chapter + 'S' + seasons[0].seasonInChapter;

        doCalc(start, end);
        window.seasonTimer = setInterval(function() {
            doCalc(start, end);
        }, 500);
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
    var fS = (end.getTime() - start.getTime()) / 1000;
    var sS = (now.getTime() - start.getTime()) / 1000;

    var sp1 = (sS / fS) * 100;
    var ro = trueRound(sp1, 2);

    document.title = 'FNLookup - ' + seasonSlug + ': ' + ro + '%';

    if (ro >= 100) {
        document.getElementById("countdown-text").innerHTML = 'Downtime';
        document.getElementById("progress-bar").style.width = '100%';
        document.getElementById("percentage").innerHTML = 'Season complete';
        clearInterval(seasonTimer);
    } else {
        document.getElementById("progress-bar").style.width = ro + "%";
        document.getElementById("percentage").innerHTML = ro + "%";
    }
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