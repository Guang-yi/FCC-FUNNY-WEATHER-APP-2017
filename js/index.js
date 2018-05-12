var key = "e7c2eabcf16f1911285b98fd0f7d1f62";
var rain = 'https://media.giphy.com/media/Mgq7EMQUrhcvC/giphy.gif';
var clearDay = "https://media.giphy.com/media/12cZxUP4HYi6zu/giphy.gif?response_id=5924cedff54c166c419a212a";
var clearNight = "https://media.giphy.com/media/Xhk7wLBHwP8gU/giphy.gif?response_id=5924cf3f32b1581bc4d1bfb1";
var snow = "https://media.giphy.com/media/xTcnTehwgRcbgymhTW/giphy.gif?response_id=5924cf8e604212b917c6324f";
var sleet = "https://media.giphy.com/media/JX4yOeoaPGoNy/giphy.gif?response_id=5924cfaa9ce8ddf001b79462";
var wind = "https://media.giphy.com/media/maJwVB74NsV8Y/giphy.gif?response_id=5924cfe739e49803ea76168b";
var fog = "https://media.giphy.com/media/AIGF7ljcNKZI4/giphy.gif?response_id=5924d0062cad9997e465eed1";
var cloudy = "https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif?response_id=5924d01d93a4562036c91bd3";
var defaultPic = "https://media.giphy.com/media/rIRG1ZBCVmrba/giphy.gif";

function flipTemperature(isFarenheit){
    var temperature = Number($("#temperature").text());
    var newTemp = isFarenheit? (temperature-32)*(5/9) : (9/5)*temperature + 32;
    newTemp= newTemp.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    $("#temperature").text(newTemp);
    isFarenheit ? $('#degree').html("&degC") : $('#degree').html("&degF");
}
    
function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  
  $.ajax({
    url: "https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude,
    dataType: "jsonp",
    success: setData
  }); 
}

function setData(data){
  $("#temperature").text(data.currently.temperature);
  $("#weather").text(", "+data.currently.summary);
  setBackground(data.currently.icon);
}

function setBackground(icon){
  switch(icon){
    case "clear-day":
      $("body").css('background-image', 'url(' + clearDay + ')');
      break;
    case "clear-night":
      $("body").css('background-image', 'url(' + clearNight + ')');
      break;
    case "rain":
      $("body").css('background-image', 'url(' + rain + ')');
      break;
    case "snow":
      $("body").css('background-image', 'url(' + snow + ')');
      break;
    case "sleet":
      $("body").css('background-image', 'url(' + sleet + ')');
      break;
    case "wind":
      $("body").css('background-image', 'url(' + wind + ')');
      break;
    case "fog":
      $("body").css('background-image', 'url(' + fog + ')');
      break;
    case "cloudy":
      $("body").css('background-image', 'url(' + cloudy + ')');
      break;
    default:
      $("body").css('background-image', 'url(' + defaultPic + ')');
  }
}

$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  $("#degree").click(function(){
     flipTemperature($("#degree").text().slice(-1) == "F");
  });
  
});