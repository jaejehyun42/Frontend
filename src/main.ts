document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content")!;
    const buttons = document.querySelectorAll(".nav-btn");

    const pages: Record<string, string> = {
        home: `<h2 class="text-2xl font-semibold">🏠 홈</h2><p>환영합니다! 이곳은 홈 화면입니다.</p>`,
        stats: `<h2 class="text-2xl font-semibold">📊 통계</h2><p>여기에서 통계를 확인할 수 있습니다.</p>`,
        settings: `<h2 class="text-2xl font-semibold">⚙️ 설정</h2><p>설정 페이지에서 환경을 변경할 수 있습니다.</p>`,
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const page = (button as HTMLElement).dataset.page!;
            contentDiv.innerHTML = pages[page] || "<h2>페이지를 찾을 수 없습니다.</h2>";
        });
    });
});
