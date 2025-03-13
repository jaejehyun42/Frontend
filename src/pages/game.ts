import { setupTournament } from "./tournament.js";
import { startGameLoop, stopGameLoop } from "../games/loop.js";

document.addEventListener("showGameOptions", () => {
	render();
});

// 게임 옵션 선택 화면 렌더링
export function render()
{
	const contentDiv = document.getElementById("content");
	if (!contentDiv)
		throw new Error("Error: Cannot find content element!");

	contentDiv.innerHTML = `
		<div class="relative flex flex-col items-center h-full">
			<!-- 헤더 -->
			<h2 class="text-5xl font-semibold absolute top-3 left-1/2 transform -translate-x-1/2">
				🎮 Select Mode
			</h2>
			
			<!-- 버튼 -->
			<div class="flex flex-col space-y-6 justify-center items-center flex-grow">
				<button id="local-mode" class="btn bg-blue-500 text-white text-xl py-6 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
					🕹️ Local Match
				</button>
				<button id="ai-mode" class="btn bg-green-500 text-white text-xl py-6 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
					🤖 AI Match
				</button>
				<button id="tournament-mode" class="btn bg-red-500 text-white text-xl py-6 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
					🏆 Tournament
				</button>
			</div>
		</div>
	`;

	// 버튼 이벤트 추가
	document.getElementById("local-mode")!.addEventListener("click", () => startGame("local", "local"));
	document.getElementById("ai-mode")!.addEventListener("click", () => startGame("local", "AI"));
	document.getElementById("tournament-mode")!.addEventListener("click", () => setupTournament());
}

export async function startGame(player1: string, player2: string): Promise<string>
{
	stopGameLoop();
	const contentDiv = document.getElementById("content");
	if (!contentDiv)
		throw new Error("Error: Cannot find content element!");

	contentDiv.innerHTML = `
		<div class="relative flex flex-col items-center h-full">
			<!-- 헤더 -->
			<h2 class="text-5xl font-semibold absolute top-3 left-1/2 transform -translate-x-1/2">
				🎮 Game
			</h2>

			<div class="flex flex-col space-y-6 justify-center items-center flex-grow">
				<!-- 플레이어 닉네임 -->
				<div id="scoreBoard" class="text-2xl font-bold">${player1} | ${player2}</div>
				<!-- 게임 캔버스 -->
				<canvas id="gameCanvas" width="1200" height="600" class="border-2 border-black"></canvas>
			</div>
		</div>
	`;

	const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
	if (!canvas)
		throw new Error("🚨 Error: Cannot find gameCanvas element!");

	if (player1.startsWith("AI"))
		return await startGameLoop(canvas, player2, player1, "PvE");
	else if (player2.startsWith("AI"))
		return await startGameLoop(canvas, player1, player2, "PvE");
	else
		return await startGameLoop(canvas, player1, player2, "PvP");
}
