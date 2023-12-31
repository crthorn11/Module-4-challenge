
const questions = [
    {
        question: "Commonly used data types DO NOT include",
        answers: [
            { text: "alerts", correct: true},
            { text: "strings", correct: false},
            { text: "booleans", correct: false},
            { text: "numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ___.",
        answers: [
            { text: "quotes", correct: true},
            { text: "curly brackets", correct: false},
            { text: "parenthises", correct: false},
            { text: "square brackets", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        answers: [
            { text: "numbers and strings", correct: false},
            { text: "other arrays", correct: false},
            { text: "booleans", correct: true},
            { text: "all of the above", correct: false},
        ]
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false},
            { text: "curly bracket", correct: false},
            { text: "quotes", correct: true},
            { text: "parenthises", correct: false},
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false},
            { text: "terminal/bash", correct: false},
            { text: "for loops", correct: false},
            { text: "console log", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startingMinutes = 1;
let time = startingMinutes * 60;
const countdownEl = document.getElementById("countdown");

let currentQuestionIndex = 0;
let score = 0; 



function startQuiz(){
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    //goodplace for timer here and should be done next, then try focusing on questions next
    showQuestion();
    setInterval(updateCountdown, 1000);
}
function updateCountdown(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

        seconds = seconds < 1 ? "0" + seconds : seconds;
        
        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;
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
if(answer.correct){
    button.dataset.correct = answer.correct;
}
button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored ${score} out of ${questions.length}!";
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startBtn.addEventListener("click", startQuiz);