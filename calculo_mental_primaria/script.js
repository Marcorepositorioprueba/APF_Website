// Referencias a elementos del DOM
const problemText = document.getElementById('problem-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackText = document.getElementById('feedback-text');
const scoreSpan = document.getElementById('score');
const operationSelect = document.getElementById('operation-select');
const difficultySelect = document.getElementById('difficulty-select');
const startButton = document.getElementById('start-button');

// Variables de estado del juego
let score = 0;
let currentProblem = {};

// Función para generar números aleatorios dentro de un rango
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un problema
function generateProblem() {
    const operation = operationSelect.value;
    const difficulty = difficultySelect.value;
    let num1, num2, correctAnswer;

    // Definir rangos según la dificultad
    let min = 0, max = 0;
    if (difficulty === 'easy') { min = 1; max = 10; }
    else if (difficulty === 'medium') { min = 10; max = 100; }
    else if (difficulty === 'hard') { min = 100; max = 1000; }

    num1 = getRandomNumber(min, max);
    num2 = getRandomNumber(min, max);

    // Asegurar que la resta no dé negativo y la división sea exacta
    if (operation === '-') {
        if (num1 < num2) [num1, num2] = [num2, num1]; // Intercambiar si num1 < num2
    } else if (operation === '/') {
        // Asegurar que num1 sea múltiplo de num2 y num2 no sea 0
        if (num2 === 0) num2 = getRandomNumber(1, max); // Evitar división por cero
        num1 = num1 * num2; // num1 ahora es un múltiplo de num2
    }

    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = num1 / num2;
            break;
    }

    currentProblem = { num1, num2, operation, correctAnswer };
    problemText.textContent = `${num1} ${operation} ${num2} = ?`;
    answerInput.value = '';
    answerInput.focus();
}

// Función para verificar la respuesta
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    if (isNaN(userAnswer)) {
        feedbackText.textContent = 'Por favor, introduce un número.';
        feedbackText.className = 'incorrect';
        return;
    }

    if (userAnswer === currentProblem.correctAnswer) {
        score++;
        feedbackText.textContent = '¡Correcto!';
        feedbackText.className = 'correct';
        answerInput.value = ''; // Limpiar input inmediatamente
        setTimeout(() => {
            feedbackText.textContent = ''; // Limpiar feedback después del retraso
            generateProblem(); // Generar nuevo problema
        }, 1000); // 1 segundo de retraso
    } else {
        score--;
        feedbackText.textContent = 'Inténtalo de nuevo.'; // Nuevo mensaje
        feedbackText.className = 'incorrect';
        answerInput.value = ''; // Limpiar input para nuevo intento
        answerInput.focus(); // Mantener foco para nuevo intento
    }
    scoreSpan.textContent = score;
}

// Función para iniciar/reiniciar el juego
function startGame() {
    score = 0;
    scoreSpan.textContent = score;
    generateProblem();
}

// Manejadores de eventos
submitButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
startButton.addEventListener('click', startGame);
operationSelect.addEventListener('change', startGame);
difficultySelect.addEventListener('change', startGame);

// Iniciar el juego al cargar la página
startGame();