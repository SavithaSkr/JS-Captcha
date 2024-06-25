/* function img_event(event) {
  var image = event.target.src;
  document.getElementById("ctr_gallery").style.display = "none";
  document.getElementById("popup").style.display = "block";
  document.getElementById("popimg").src = "./assests/images/g1.jpg";
}

function closehandel() {
  document.getElementById("ctr_gallery").style.display = "block";
  document.getElementById("popup").style.display = "none";
}
 */
var popup = document.querySelector(".popup");
var close = document.querySelector(".close");
var popimg = document.getElementById("popimg");
var item = document.querySelectorAll(".gallery_item");
for (let i = 0; i < item.length; i++) {
  const element = item[i];
  console.log("this is element", element);
  element.addEventListener("click", function () {
    console.log("hi i m clicked", element.src);
    popup.style.display = "flex";
    popimg.setAttribute("src", element.src);
  });
}
function closehandle() {
  popup.style.display = "none";
}
