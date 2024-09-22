const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let circleX, circleY, circleRadius;

startButton.addEventListener('click', startGame);
canvas.addEventListener('mousedown', checkCircle);

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startButton.disabled = true;
    drawCircle();
    countdown();
}

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circleRadius = Math.floor(Math.random() * 50) + 20;
    circleX = Math.random() * (canvas.width - 2 * circleRadius) + circleRadius;
    circleY = Math.random() * (canvas.height - 2 * circleRadius) + circleRadius;

    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function checkCircle(event) {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);

    if (distance <= circleRadius) {
        score++;
        scoreDisplay.textContent = score;
        drawCircle();
    }
}

function countdown() {
    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    startButton.disabled = false;
    alert(`Game over! Your score: ${score}`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
