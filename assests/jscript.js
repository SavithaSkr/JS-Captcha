/* Captcha*/
var character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var currentcaptcha;

var captch = "";
function rand() {
  for (let i = 0; i < 6; i++) {
    var x = Math.floor(Math.random() * character.length);
    captch = captch + character[x];
  }
  console.log(captch);
  currentcaptcha = captch;
  document.getElementById("currentcaptcha").innerText = currentcaptcha;
}
rand();

function verifyCaptcha() {
  document.getElementById("currentcaptcha").innerText = currentcaptcha;
  var getinput = document.getElementById("userInput").value;
  var message_element = document.getElementById("message");
  if (getinput === currentcaptcha) {
    message_element.innerText = "Captcha matched ";
    message_element.style.color = "green";
  } else {
    message_element.innerText = "Captcha Doesnt Match.!!Try Again";
    message_element.style.color = "Red";
  }
}
