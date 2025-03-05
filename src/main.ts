document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content")!;
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const page = (button as HTMLElement).dataset.page!;
            try {
                // 동적으로 해당 페이지의 JS 파일 로드
                if (page === "game") {
                    const module = await import(`./games/${page}.js`);
                    contentDiv.innerHTML = module.renderPage();
                    module.gameLoop();
                }
                else {
                    const module = await import(`./pages/${page}.js`);
                    contentDiv.innerHTML = module.render();
                }
            } catch (error) {
                contentDiv.innerHTML = `<h2 class="text-5xl mb-10 text-center font-semibold text-red-500">🚨 Error</h2>
                <p class="text-xl text-center">Fail to loading ${page}.js</p>`;
                console.error(`Error loading ${page}.js`, error);
            }
        });
    });
});
