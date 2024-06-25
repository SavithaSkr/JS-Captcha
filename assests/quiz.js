//store the data of userinformation in a variable
const userData = {};

let allQuestions = [];
let selectedQuestion = [];
let currentQuestionidx = 0;
let userSelectedAnswer = [];
let mark = 0;

const ttlQuestionCount = 2;
//selecting 10 random question function
const selectRandomQuesiton = () => {
  //storing shuffledquestions in a variable
  let shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
  /* console.log(
    "shuffled random quesion",
    (selectedQuestion = shuffledQuestions.slice(0, ttlQuestionCount))
  ); */
  //this line returns first 10 questions
  selectedQuestion = shuffledQuestions.slice(0, ttlQuestionCount);
};

const showQuestions = () => {
  const currentQuestion = selectedQuestion[currentQuestionidx];
  console.log(currentQuestion, selectedQuestion);
  const question_container = document.getElementById("question_container");

  question_container.innerHTML = `
  <h4>Question ${currentQuestionidx + 1} : ${currentQuestion.question}</h4> 
  ${currentQuestion.answers.map((ans, idx) => {
    return `
    <div>
        <label>
            <input type="radio" name="answer" value="${idx}">${ans}</input>
        <br>
        </label>
    </div>`;
  })}
  `;
};
const showAnswer = () => {
  const answerContainer = document.getElementById("answerContainer");
  answerContainer.innerHTML = selectedQuestion
    .map(
      (question, qno) =>
        `
  <div>
    <p>Question ${qno + 1}:${question.question}</p>

   ${question.answers
     .map((ans, ansidx) => {
       var color = "black";

       if (question.correct == ansidx) {
         console.log(question.correct, ansidx);
         color = "green";
         console.log(color);
       } /* else if (userSelectedAnswer[qno] == ansidx);
       {
         color = "red";
       } */
       console.log(color);
       return `
    <p style="color:${color}">${ans}</p>
     `;
     })
     .join(" ")}
    </div>`
    )
    .join(" ");
};
//initialize the page
const initialiseApp = (path) => {
  if (path === "landing.html") {
    document.getElementById("userForm").addEventListener("submit", (event) => {
      event.preventDefault();
      let userName = document.getElementById("name").value;
      let userMail = document.getElementById("email").value;

      userData.name = userName;
      userData.mail = userMail;

      /* console.log("i m here"); */
      loadingPage("instruction.html");
    });
  } else if (path === "instruction.html") {
    document.getElementById("startQuiz").addEventListener("click", () => {
      //loading quiz app page
      loadingPage("quiz_question.html");
    });
  } else if (path === "quiz_question.html") {
    showQuestions();

    //next page
    document.getElementById("next").addEventListener("click", () => {
      let selectedAnswer = document.querySelector(
        'input[name = "answer"]:checked'
      );
      if (
        selectedAnswer.value == selectedQuestion[currentQuestionidx].correct
      ) {
        mark++;
        console.log("mark is", mark);
      } else {
        console.log("no mark mark", mark);
      }
      userSelectedAnswer[currentQuestionidx] = selectedAnswer.value;
      currentQuestionidx++;

      if (currentQuestionidx < ttlQuestionCount) {
        showQuestions();
      } else {
        console.log("i came here");
        loadingPage("result.html");
      }
    });

    //previous page
    /* document.getElementById("previous").addEventListener("click", () => {
    currentQuestionidx--;
    if (currentQuestionidx == ttlQuestionCount) {
      showQuestions();
    } else {
      loadingPage("result.html");
    }
  }); */
  } else if (path === "result.html") {
    console.log("mark is", mark);

    document.getElementById(
      "mark"
    ).textContent = `your score is ${mark} / ${ttlQuestionCount}`;
    console.log("result here");
    showAnswer();
  }
};
//getting the page
const loadingPage = (path) => {
  fetch(`./assests/pages/${path}`)
    .then((data) => data.text())
    .then((html) => {
      console.log("loading page html");
      document.getElementById("quizapp").innerHTML = html;
      initialiseApp(path);
    })
    .catch((err) => {
      console.log("error is", err);
    });
};

//loading the dom envirment
document.addEventListener("DOMContentLoaded", () => {
  loadingPage("landing.html");
  //loading the questions when the page is loaded
  fetch("questions.json").then((data) =>
    data.json().then((questions) => {
      console.log("questions", questions);
      allQuestions = questions;
      selectRandomQuesiton();
    })
  );
});
