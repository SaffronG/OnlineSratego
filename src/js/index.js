"use strict";
class piece {
    constructor(name, rank, movement, isAlive, image, row, col) {
        this.name = name;
        this.rank = rank;
        this.movement = movement;
        this.isAlive = isAlive;
        this.image = image;
        this.row = row;
        this.col = col;
    }
    validMoves() {
        return [""]; // implement later
    }
    move() {
        return false; // implement later
    }
}
;
class cell {
    constructor(row, col, isWater = false, piece = null) {
        this.row = row;
        this.col = col;
        this.isWater = isWater;
        this.piece = piece;
    }
}
var ColEnum;
(function (ColEnum) {
    ColEnum[ColEnum["a"] = 1] = "a";
    ColEnum[ColEnum["b"] = 2] = "b";
    ColEnum[ColEnum["c"] = 3] = "c";
    ColEnum[ColEnum["d"] = 4] = "d";
    ColEnum[ColEnum["e"] = 5] = "e";
    ColEnum[ColEnum["f"] = 6] = "f";
    ColEnum[ColEnum["g"] = 7] = "g";
    ColEnum[ColEnum["h"] = 8] = "h";
    ColEnum[ColEnum["i"] = 9] = "i";
    ColEnum[ColEnum["j"] = 10] = "j";
})(ColEnum || (ColEnum = {}));
;
// GLOBAL VARIABLES
let board = document.getElementById("game_board");
let pieces = [
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
];
// INITAILIZE THE BOARD VISUALLY
buildBoard(board);
function buildBoard(board) {
    let piece_index = 0;
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        board === null || board === void 0 ? void 0 : board.appendChild(cell);
        if (piece_index < pieces.length) {
            cell.className = "cell";
            cell.innerText = `${pieces[piece_index].rank}`; // for debugging purposes, show the name of the piece in the cell
            // cell.innerHTML = `<img ssrc="images/${pieces[piece_index].image}" alt="${pieces[piece_index].name}">`;
            board === null || board === void 0 ? void 0 : board.appendChild(cell);
            piece_index++;
            cell.style.fontSize = "8px"; // make the text smaller to fit in the cell
        }
        if (i > 40 && i < 60) {
            let loc = i % 10;
            if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                cell.className = "cell_water";
            }
            else {
                cell.addEventListener("click", function () {
                    cell.classList.toggle("active");
                });
            }
        }
        else {
            cell.addEventListener("click", function () {
                cell.classList.toggle("active");
            });
        }
    }
}
;
