
const questions = [
    {
        question: "Commonly used data types DO NOT include",
        answers: [
            { text: "alerts", correct: true },
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "numbers", correct: false },
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ___.",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "parenthises", correct: true },
            { text: "square brackets", correct: false },
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true },
        ]
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly bracket", correct: false },
            { text: "quotes", correct: true },
            { text: "parenthises", correct: false },
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console log", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
let time = 60;
const countdownEl = document.getElementById("countDown");
const inputDiv = document.getElementById("initial-screen");
const initialButton = document.getElementById("initial-btn");
const initialForm = document.getElementById("initial-form");
const sect = document.querySelector("section");
const div = document.querySelector("div");
const viewScores = document.getElementById("view-scores");
const savedScores = document.getElementById("scores");
const paragraph = document.getElementById("paragragh");

initialButton.addEventListener("click", function (event) {
    saveScore(event);
});


let currentQuestionIndex = 0;
let score = 0;
let intervalHolder;

function startQuiz() {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    showQuestion();
    intervalHolder = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    time--;

   if(time <= 0) {
    clearInterval(intervalHolder);
    showScore();
   }

    countdownEl.innerHTML = time;
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!  Enter your initials to save your score`;
    inputDiv.removeAttribute("class");
}

//const newParagraph = document.createElement("p");
//paragraph.textContent = document.getElementById("scores");
//document.body.appendChild(newParagraph);

function saveScore(event) {
    event.preventDefault();
    var input = document.getElementById("initial-input").value;
    var userScore = {
        initials: input, 
        score: score
    };
    console.log(userScore);
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(scores));
    displayScores();
}

function displayScores() {
    var savedScores = localStorage.getItem("scores") || [];
    console.log(savedScores);
    }    

viewScores.addEventListener("click", function() {
    var savedScores = localStorage.getItem("scores") || [];
    alert(savedScores);
    console.log(savedScores);
});

  initialButton.addEventListener("click", (event) => {
    event.preventDefault();
    startScreen.classList.remove("hide");
    quizScreen.classList.add("hide");
    inputDiv.classList.add("hide");
    initialForm.classList.add("hide");
  });

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startBtn.addEventListener("click", startQuiz);