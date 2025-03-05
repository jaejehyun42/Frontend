// draw.ts
import { buttonX, buttonY, buttonWidth, buttonHeight } from "./event.js";
import { showStartButton, showRestartButton, leftScore, rightScore, leftPaddleY, rightPaddleY, paddleWidth, paddleHeight, ballX, ballY, ballSize, countdownEndTime, resumeGame } from "./game.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// 랜더링 함수
export function render()
{
    // 배경
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 시작/재시작 버튼
    if (showStartButton)
    {
        writeText("Pong Game", canvas.width / 2, canvas.height / 2 - 20);
        drawButton("Start Game", buttonX, buttonY);
        return;
    }
    if (showRestartButton)
    {
        writeText(leftScore > rightScore ? "Player 1 Win!" : "Player 2 Win!", canvas.width / 2, canvas.height / 2 - 20);
        drawButton("Restart Game", buttonX, buttonY);
        return;
    }

    // 오브젝트 (공, 패들)
    ctx.fillStyle = "red";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX + ballSize / 2, ballY + ballSize / 2, ballSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // 카운트다운
    if (countdownEndTime !== null)
		drawCountdown(countdownEndTime);

    updateScore();
}

// 카운트 다운 그리기
function drawCountdown(duration: number)
{
    const remaining = duration - performance.now();
    const elapsed = 1500 - remaining;
    const count = 3 - Math.floor((elapsed / 1500) * 3);

    if (remaining > 0)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${count}`, canvas.width / 2, canvas.height / 2);
    }
    else
        resumeGame();
}

// 점수 업데이트
function updateScore()
{
    const scoreBoard = document.getElementById("scoreBoard");
    if (scoreBoard) 
        scoreBoard.textContent = `Player 1: ${leftScore} | Player 2: ${rightScore}`;
}

// 택스트 출력
function writeText(text: string, x: number, y: number)
{
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

// 버튼 그리기
function drawButton(text: string, x: number, y: number)
{
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x + buttonWidth / 2, y + buttonHeight / 2 + 8);
}
