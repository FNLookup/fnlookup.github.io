var endDate = "2022-12-05";
var startDate = "2022-06-05";

var end = new Date(endDate);
var start = new Date(startDate);

//start a 1 second timer
var timer = setInterval(function() {
  calculateTimeBetweenDates();
}, 1000);

function calculateTimeBetweenDates() {
  var now = new Date();
  var dif = end.getTime() - now.getTime();
  
  var Seconds = Math.floor(dif / 1000);
  var time = formatTime(Seconds);

  document.getElementById("countdown").innerHTML = time;
  var fS = (end.getTime() - start.getTime()) / 1000;
  var sS = (now.getTime() - start.getTime()) / 1000;

  var sp1 = (sS / fS) * 100;
  var ro = trueRound(sp1, 2);
  var content = ro + "%";

  document.getElementById("progressBar").style.width = content;
  document.getElementById("progressBar").innerHTML = content;
}

function formatTime(seconds)
{
  var numdays = zeroBefore(Math.floor((seconds % 31536000) / 86400)); 
  var numhours = zeroBefore(Math.floor(((seconds % 31536000) % 86400) / 3600));
  var numminutes = zeroBefore(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60));
  var numseconds = zeroBefore((((seconds % 31536000) % 86400) % 3600) % 60);
  return numdays + ':' + numhours + ':' + numminutes + ':' + numseconds;
}

function trueRound(value, digits){
  return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
}

function zeroBefore(num) {
  return (num < 10 ? '0' + num : num);
}