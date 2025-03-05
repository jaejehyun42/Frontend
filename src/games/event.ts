// event.ts
import { startGame, restartGame, showStartButton, showRestartButton } from "./game.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

export const keys: { [key: string]: boolean } = {};
export const buttonWidth = 200, buttonHeight = 50;
export const buttonX = canvas.width / 2 - buttonWidth / 2;
export const buttonY = canvas.height - buttonHeight * 2;

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (showStartButton && isInsideButton(mouseX, mouseY)) startGame();
    if (showRestartButton && isInsideButton(mouseX, mouseY)) restartGame();
});

function isInsideButton(x: number, y: number): boolean
{
    return x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight;
}
