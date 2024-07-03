const userData = {};

let allQuestions = [];
let selectedQuestion = [];
let currentQuestionidx = 0;
let userSelectedAnswer = [];
let mark = 0;
const ttlQuestionCount = 10;
let timer;
const totalQuizTime = 120; // Total time in seconds for the entire quiz
let remainingTime = totalQuizTime;

// Select 10 random questions function
const selectRandomQuesiton = () => {
  let shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
  selectedQuestion = shuffledQuestions.slice(0, ttlQuestionCount);
};

const startQuizTimer = () => {
  const timerElement = document.getElementById("timer");
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      loadingPage("result.html");
    } else {
      remainingTime--;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timerElement.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
  }, 1000);
};

const showQuestions = () => {
  const currentQuestion = selectedQuestion[currentQuestionidx];
  const question_container = document.getElementById("question_container");

  question_container.innerHTML = `
    <h4>Question ${currentQuestionidx + 1} : ${currentQuestion.question}</h4> 
    ${currentQuestion.answers
      .map((ans, idx) => {
        return `
      <div class="quiz_ques">
          <label>
              <input type="radio" name="answer" value="${idx}">${ans}</input>
          <br>
          </label>
      </div>`;
      })
      .join("")}
    <div>
      <button id="previous" ${
        currentQuestionidx === 0 ? "disabled" : ""
      }>Previous</button>
      <button id="next">${
        currentQuestionidx === ttlQuestionCount - 1 ? "Finish" : "Next"
      }</button>
    </div>
  `;

  document.getElementById("next").addEventListener("click", () => {
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (
      selectedAnswer &&
      selectedAnswer.value == selectedQuestion[currentQuestionidx].correct
    ) {
      mark++;
    }
    userSelectedAnswer[currentQuestionidx] = selectedAnswer
      ? selectedAnswer.value
      : null;
    currentQuestionidx++;
    if (currentQuestionidx < ttlQuestionCount) {
      showQuestions();
    } else {
      loadingPage("result.html");
    }
  });

  document.getElementById("previous").addEventListener("click", () => {
    currentQuestionidx--;
    showQuestions();
  });
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
              color = "green";
            } else if (userSelectedAnswer[qno] == ansidx) {
              color = "red";
            }
            return `<p style="color:${color}">${ans}</p>`;
          })
          .join(" ")}
      </div>`
    )
    .join(" ");
};

const initialiseApp = (path) => {
  if (path === "landing.html") {
    document.getElementById("userForm").addEventListener("submit", (event) => {
      event.preventDefault();
      let userName = document.getElementById("name").value;
      let userMail = document.getElementById("email").value;

      userData.name = userName;
      userData.mail = userMail;
      loadingPage("instruction.html");
    });
  } else if (path === "instruction.html") {
    document.getElementById("startQuiz").addEventListener("click", () => {
      loadingPage("quiz_question.html");
    });
  } else if (path === "quiz_question.html") {
    startQuizTimer(); // Start the timer when the quiz page loads
    showQuestions();
  } else if (path === "result.html") {
    document.getElementById(
      "mark"
    ).textContent = `Your score is ${mark} / ${ttlQuestionCount}`;
    showAnswer();
  }
};

const loadingPage = (path) => {
  fetch(`./assests/pages/${path}`)
    .then((data) => data.text())
    .then((html) => {
      document.getElementById("quizapp").innerHTML = html;
      initialiseApp(path);
    })
    .catch((err) => {
      console.log("error is", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  loadingPage("landing.html");
  fetch("questions.json").then((data) =>
    data.json().then((questions) => {
      allQuestions = questions;
      selectRandomQuesiton();
    })
  );
});
