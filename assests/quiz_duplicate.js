const quizData = [
  {
    Question: "What is the largest social media network in the world?",
    a: "Red",
    b: "Orange",
    c: "Black",
    Correct: "b",
  },
  {
    Question:
      "Which of the following is not a primitive data type in JavaScript?",
    a: "Number",
    b: "String",
    c: "Object",
    Correct: "c",
  },
  {
    Question: "What does the “typeof” operator do in JavaScript?",
    a: " Returns the data type of a variable",
    b: "Checks if a variable is defined",
    c: "Assigns a value to a variable",
    Correct: "a",
  },
  {
    Question:
      "Which of the following is not a comparison operator in JavaScript?",
    a: "==",
    b: "=<",
    c: "===",
    Correct: "b",
  },
  {
    Question: "What does the “NaN” value represent in JavaScript?",
    a: "Not a number",
    b: "Null value",
    c: "Undefined value",
    Correct: "a",
  },
  {
    Question: "What does the “this” keyword refer to in JavaScript?",
    a: "The current function",
    b: "The parent object of the current object",
    c: "The object that the function belongs to",
    Correct: "c",
  },
  {
    Question: "What does the “forEach” method do in JavaScript?",
    a: "Executes a function once for each element in an array",
    b: "Removes an element from the beginning of an array",
    c: "Adds a new element to the end of an array",
    Correct: "a",
  },
];

var landingpage = document.querySelector(".landingpage");
var instructionPage = document.querySelector(".instructionPage");
var userform = document.getElementById("userform");
var readyforQuiz = document.querySelector(".readyforQuiz");
var quiz_container = document.querySelector(".quiz_container");
var instructionPageClick = document.querySelector(".instructionPageClick");
var quiz_header = document.getElementById("quiz_header");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var answerEls = document.querySelectorAll(".answer");
var a_text = document.getElementById("a_text");
var b_text = document.getElementById("b_text");
var c_text = document.getElementById("c_text");
var result = document.getElementById("result");
var score = document.getElementById("score");

let currentQuiz = 0;
let score = 0;

instructionPageClick.addEventListener("click", function (event) {
  event.preventDefault();
  landingpage.style.display = "none";
  instructionPage.style.display = "block";
});
readyforQuiz.addEventListener("click", (event) => {
  event.preventDefault();
  instructionPage.style.display = "none";
  quiz_container.style.display = "block";
  quiz_header.style.display = "block";
  console.log("hi i m here");
});

loadQuiz();
function loadQuiz() {
  deselectAnswers();
}
