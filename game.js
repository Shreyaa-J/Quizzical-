const loader = document.getElementById('loader');
const startScreen = document.getElementById('start-screen');
const game = document.getElementById('game');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionElement = document.getElementById('question');
const choicesElement = document.querySelector('.choices');
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const finalScore = document.getElementById('final-score');

let questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Mark Twain", "William Shakespeare", "Leo Tolstoy", "Charles Dickens"],
    answer: 1
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

function startGame() {
  startScreen.classList.add('hidden');
  game.classList.remove('hidden');
  loader.classList.add('hidden');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  updateHud();
}

function showQuestion() {
  nextBtn.classList.add('hidden');
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.classList.add('choice-container');
    button.innerHTML = `<span class="choice-text" data-number="${index}">${choice}</span>`;
    button.addEventListener('click', selectAnswer);
    choicesElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target.closest('.choice-container');
  const selectedAnswer = selectedButton.querySelector('.choice-text').dataset.number;

  if (selectedAnswer == questions[currentQuestionIndex].answer) {
    score += 10;
  }

  Array.from(choicesElement.children).forEach(button => {
    button.disabled = true;
    const choiceNum = button.querySelector('.choice-text').dataset.number;
    if (choiceNum == questions[currentQuestionIndex].answer) {
      button.classList.add('btn-success');
    } else {
      button.classList.add('btn-danger');
    }
  });

  nextBtn.classList.remove('hidden');
  updateHud();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    finishGame();
  } else {
    showQuestion();
    updateHud();
  }
}

function finishGame() {
  game.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScore.textContent = `Your Score: ${score}`;
}

function restartGame() {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

function updateHud() {
  progressText.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  progressBarFull.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
  scoreText.textContent = score;
}

// Initially show only loader, then after 2 seconds show start screen
window.onload = () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    startScreen.classList.remove('hidden');
  }, 1500);
};
