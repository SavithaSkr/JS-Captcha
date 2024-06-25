var bbox = document.getElementsByName("bbox");
var correct1 = document.getElementById("correct1");
var pass = document.getElementById("pass");
var result = document.getElementById("result");
var score = 0;
function submit_handle() {
  for (let index = 0; index < bbox.length; index++) {
    const element = bbox[index];

    if (element.checked) {
      if (element.value == "orange") {
        console.log(element.value);
        score = score + 1;
      } else {
        /* console.log("wrong"); */
      }
    } else {
      /* console.log("toptally wrong"); */
    }
  }
  pass.textContent = score;
  //if score lesstna 2 sorry msg
  result.style.display = "block";
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  /*  */
}
