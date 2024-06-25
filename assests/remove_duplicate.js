function removeduplicate() {
  const inputstring = document.getElementById("arrayfield").value;

  const num = inputstring.split(",").map(Number);

  const uniquenumbers = [...new Set(num)]; // this will copy the all the numbers in side the array
  console.log(uniquenumbers);
  document.getElementById("output").textContent = uniquenumbers.join(" , ");
}
