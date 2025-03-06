import { stopGameLoop } from "./games/loop.js";

document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const navButtons = document.querySelectorAll(".nav-btn");

    if (!contentDiv) return;

    let currentPage = "";
    let preCanvas: HTMLCanvasElement | null = null;

    navButtons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const target = event.target as HTMLElement;
            const page = target.getAttribute("data-page");

            if (page === currentPage)
                return;
            if (page)
                currentPage = page;
            contentDiv.innerHTML = "";

            try {
                if (preCanvas) {
                    preCanvas.remove();
                    preCanvas = null;
                }

                const module = await import(`./pages/${page}.js`);
                contentDiv.innerHTML = module.render();
                if (page === "game") {
                    stopGameLoop();
                    module.setupGameCanvas();
                }
            }
            catch (error) {
                contentDiv.innerHTML = `<h2 class="text-5xl mb-10 text-center font-semibold text-red-500">🚨 Error</h2>
                <p class="text-xl text-center">Fail to loading ${page}.js</p>`;
                console.error(`Error loading ${page}.js`, error);
            }
        });
    });
});
