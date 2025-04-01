class piece {
    name: string;
    rank: number;
    movement: number;
    isAlive: boolean;
    image: string;
    row: number;
    col: string;
    
    constructor(name: string, rank: number, movement: number, isAlive: boolean, image: string, row: number, col: string) {
        this.name = name;
        this.rank = rank;
        this.movement = movement;
        this.isAlive = isAlive;
        this.image = image;
        this.row = row;
        this.col = col;
    }

    validMoves(): string[] {

        return [""]; // implement later
    }
    move(): boolean {
        return false; // implement later
    }
};

class cell{
    
    row: number; // 0 - 9
    col: ColEnum; // a - j
    isWater: boolean;
    piece: piece | null;

    constructor(row: number, col: ColEnum, isWater: boolean = false, piece: piece | null = null) {
        this.row = row;
        this.col = col;
        this.isWater = isWater;
        this.piece = piece;
    }
}

enum ColEnum {
    "a" = 1,
    "b" = 2,
    "c" = 3,
    "d" = 4,
    "e" = 5,
    "f" = 6,
    "g" = 7,
    "h" = 8,
    "i" = 9,
    "j" = 10,
};

// GLOBAL VARIABLES
let board: HTMLElement | null = document.getElementById("game_board");
let pieces: piece[] = [
    new piece("scout", 9, 100, true, "scout.png", 0, "a"),
    new piece("miner", 8, 1, true, "miner.png", 0, "b"),
    new piece("sergeant", 7, 1, true, "sergeant.png", 0, "c"),
    new piece("lieutenant", 6, 1, true, "lieutenant.png", 0, "d"),
    new piece("captain", 5, 1, true, "captain.png", 0, "e"),
    new piece("major", 4, 1, true, "major.png", 0, "f"),
    new piece("colonel", 3, 1, true, "colonel.png", 0, "g"),
    new piece("general", 2, 1, true, "general.png", 0, "h"),
    new piece("marshal", 1, 1, true, "marshal.png", 0, "i"),
    new piece("spy", 0, 1, true, "spy.png", 0, "j"),
    new piece("bomb", -1, 0, true, "bomb.png", 0, "k"),
    new piece("flag", -2, 0, true, "flag.png", 0, "l"),
]

// INITAILIZE THE BOARD VISUALLY
buildBoard(board)

function buildBoard(board: HTMLElement | null) {
    let piece_index: number = 0;
    for (let i = 0; i < 100; i++) {
        let cell: HTMLDivElement = document.createElement("div");
        cell.className = "cell";
        board?.appendChild(cell);
        if (piece_index < pieces.length) {
            cell.className = "cell";
            cell.innerText = `${pieces[piece_index].rank}`; // for debugging purposes, show the name of the piece in the cell
            // cell.innerHTML = `<img ssrc="images/${pieces[piece_index].image}" alt="${pieces[piece_index].name}">`;
            board?.appendChild(cell);
            piece_index++;
            cell.style.fontSize = "8px"; // make the text smaller to fit in the cell
        }
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
};