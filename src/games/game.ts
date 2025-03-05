// game.ts
import { keys } from "./event.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

// 게임 요소 설정
export const paddleWidth = 10, paddleHeight = 100;
export const paddleSpeed = 6;
export const ballSize = 10;

export let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
export let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
export let ballX = canvas.width / 2, ballY = canvas.height / 2;
export let ballSpeedX = 5, ballSpeedY = 3;

// 점수 관리
export const WINNING_SCORE = 11;
export let leftScore = 0, rightScore = 0;
export let gameRunning = false;
export let gameOver = false;

// 카운트다운 총 시간
export const countdownDuration = 1500;
export let countdownEndTime: number | null = null;

// 버튼 영역 정의 (게임 시작 & 재시작)
export let showStartButton = true;
export let showRestartButton = false;

// 게임 시작 (변수 초기화)
export function startGame()
{
    showStartButton = false;
    showRestartButton = false;
    gameRunning = true;
    gameOver = false;
    leftScore = 0;
    rightScore = 0;
    leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    rightPaddleY = canvas.height / 2 - paddleHeight / 2;
}

// 게임 다시 시작
export function restartGame()
{
    showRestartButton = false;
    startGame();
}

// 게임 업데이트 (패들 움직임, 공 위치 및 충돌 처리, 득점 및 승리 체크)
export function update()
{
    // 카운트다운 진행 중이거나 게임 정지 상태면 업데이트하지 않음
    if (!gameRunning || gameOver || countdownEndTime !== null)
        return;

    // 패들 움직임
    if ((keys["w"] || keys["W"]) && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
    if ((keys["s"] || keys["S"]) && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
    if (keys["ArrowUp"] && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
    if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;

    // 공 이동
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 벽 충돌 (위, 아래)
    if (ballY <= 0 || ballY >= canvas.height - ballSize)
        ballSpeedY *= -1;

    // 패들 충돌 (공 전체 크기 고려)
    if (ballX <= paddleWidth && ballY + ballSize >= leftPaddleY && ballY <= leftPaddleY + paddleHeight)
        ballSpeedX = Math.abs(ballSpeedX);
    if (ballX + ballSize >= canvas.width - paddleWidth && ballY + ballSize >= rightPaddleY && ballY <= rightPaddleY + paddleHeight)
        ballSpeedX = -Math.abs(ballSpeedX);

    // 득점 판정
    if (ballX <= 0)
    {
        rightScore++;
        if (!checkGameEnd())
            setCountdown();
    }
    if (ballX >= canvas.width)
    {
        leftScore++;
        if (!checkGameEnd())
            setCountdown();
    }
}

// 게임 종료 조건 체크
function checkGameEnd(): boolean
{
    if (leftScore >= 10 && rightScore >= 10)
    {
        if (Math.abs(leftScore - rightScore) >= 2)
        {
            gameOver = true;
            gameRunning = false;
            showRestartButton = true;
            return true;
        }
    }
    else if (leftScore >= WINNING_SCORE || rightScore >= WINNING_SCORE)
    {
        gameOver = true;
        gameRunning = false;
        showRestartButton = true;
        return true;
    }
    return false;
}

// 카운트다운 시간 설정
function setCountdown()
{
    countdownEndTime = performance.now() + countdownDuration;
    gameRunning = false;
}

// 공 리셋 및 게임 재개
export function resumeGame()
{
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() > 0.5 ? 3 : -3;
    countdownEndTime = null;
    gameRunning = true;
}
