document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const navButtons = document.querySelectorAll(".nav-btn");
    if (!contentDiv) return;

    navButtons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const target = event.target as HTMLElement;
            const page = target.getAttribute("data-page");
            contentDiv.innerHTML = "";

            try {
                const module = await import(`./pages/${page}.js`);
                if (page === "game") {
                    module.render();
                }
                else {
                    contentDiv.innerHTML = module.render();
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
