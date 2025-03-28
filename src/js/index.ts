let board: HTMLElement | null = document.getElementById("game_board");

buildBoard()
console.log("Hello World!")

function buildBoard() {
    for (let i = 0; i < 100; i++) {
        let cell: HTMLDivElement = document.createElement("div");
        cell.className = "cell";
        board?.appendChild(cell);
    }
}