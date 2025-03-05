import { update } from "./game.js";
import { render } from "./draw.js";

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
