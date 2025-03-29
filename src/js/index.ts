let board: HTMLElement | null = document.getElementById("game_board");

buildBoard()

function buildBoard() {
    for (let i = 0; i < 100; i++) {
        let cell: HTMLDivElement = document.createElement("div");
        cell.className = "cell";
        board?.appendChild(cell);
        if (i > 40 && i < 60) {
            let loc = i % 10
            if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                cell.className = "cell_water"
            }
            else {
                cell.addEventListener("click", function() {
                    cell.classList.toggle("active");
                })
            }
        }
        else {
            cell.addEventListener("click", function() {
                cell.classList.toggle("active");
            })
        }
    }
}