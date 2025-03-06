import { startGameLoop } from "../games/loop.js";

export function render() {
	return `
		<h2 class="text-5xl mb-10 text-center font-semibold">🎮 GAME</h2>
		<div class="flex flex-col items-center gap-5 h-full p-5">
			<!-- 점수판 -->
			<div id="scoreBoard" class="text-2xl font-bold">Player 1: 0 | Player 2: 0</div>
			<!-- 게임 캔버스 -->
			<canvas id="gameCanvas" width="1200" height="600" class="border-2 border-black"></canvas>
		</div>
	`;
}

export function setupGameCanvas() {
	const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
	if (!canvas)
		throw new Error("🚨 Error: Cannot find gameCanvas element!");

	startGameLoop(canvas);
}
