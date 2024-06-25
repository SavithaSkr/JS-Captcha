var sidenavclose = document.querySelector(".sidenavclose");
var navbar = document.querySelector(".navbar");

function showNavbar() {
  navbar.style.left = "0px";
  sidenavclose.style.left = "25%";
  console.log("shownav bar");
}
function closenavbar() {
  sidenavclose.style.left = "-100%";
  navbar.style.left = "-60%";
  console.log("closenavbar");
}
