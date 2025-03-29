let board: HTMLElement | null = document.getElementById("game_board");

buildBoard()
console.log("Hello World!")

function buildBoard() {
    for (let i = 0; i < 100; i++) {
        let cell: HTMLDivElement = document.createElement("div");
        cell.className = "cell";
        board?.appendChild(cell);
        if ((i % 3 == 1 || i % 4) == 1 && (i > 40 && i < 60)) {
            cell.classList.add("active");
        }
        cell.addEventListener("click", function() {
            cell.classList.toggle("active");
        });
    }
}