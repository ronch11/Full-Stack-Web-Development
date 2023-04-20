const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = []

initGame();

function initGame() {
    fetch("questions.json").then((res) => {
        return res.json();
    })
        .then((loadedQuestions) => {
            questions = loadedQuestions.results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: loadedQuestion.question
                };

                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                );

                answerChoices.forEach((choice, index) => {
                    formattedQuestion['choice' + (index + 1)] = choice;
                });

                return formattedQuestion;
            });
            startGame();
        })
        .catch((err) => {
            console.error(err);
        });

}




//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 100;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

};

getNewQuestion = () => {
    if (questionCounter == 10) {
        document.getElementById("game-over").style.visibility = "visible";

        //save score
        let user_logged_in = JSON.parse(localStorage.getItem("userLoggedIn"));
        if (user_logged_in) {
            let loggedIn_user = JSON.parse(localStorage.getItem(user_logged_in["username"]));
            loggedIn_user["score"] = parseInt(loggedIn_user["score"]) + score;
            localStorage.setItem(loggedIn_user["username"], JSON.stringify(loggedIn_user));
        }
        return;
    }
    questionCounter++;


    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

function restart() {
    currentQuestion = {};
    acceptingAnswers = false;
    score = 0;
    questionCounter = 0;
    availableQuesions = [];

    questions = []
    scoreText.innerText = score;
    document.getElementById("game-over").style.visibility = "hidden";

    initGame();
}

