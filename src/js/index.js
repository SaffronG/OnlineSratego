var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class piece {
    constructor(name, rank, movement, isAlive, image, row, col, color, id) {
        this.name = name;
        this.rank = rank;
        this.movement = movement;
        this.isAlive = isAlive;
        this.image = image;
        this.row = row;
        this.col = col;
        this.color = color;
        this.id = id;
    }
    validMoves() {
        let validmoves = [];
        if (this.rank === 2) {
        }
        else {
        }
        return [""]; // implement later
    }
    move() {
        return false; // implement later
    }
}
;
class ApiPiece {
    constructor(rank, team) {
        this.rank = rank;
        this.team = team;
    }
}
class ApiBoard {
    constructor(board) {
        this.board = Array();
        for (let i = 0; i < 100; i++) {
            try {
                this.board[i] = new ApiPiece(board[i].piece.rank, board[i].piece.color);
            }
            catch (_a) {
                this.board[i] = new ApiPiece(0, "NONE");
            }
        }
    }
}
class cell {
    constructor(row, col, isWater = false, piece = null, element = document.createElement("div")) {
        this.row = row;
        this.col = col;
        this.isWater = isWater;
        this.piece = piece;
        this.element = element;
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
let currentCell = null;
let board = document.getElementById("game_board");
let title = document.getElementById("title");
let cells = [];
let cellsObject = [];
let lobbyId;
let turn;
let joinedGame = localStorage.getItem("joinedGame");
var currentUser = null;
// let base_url: string = "http://localhost:5244";
let base_url = "https://strategogameserver-4vzb9wy5.b4a.run";
let login_form = document.getElementById("login");
let register_form = document.getElementById("register");
let logout_button = document.getElementById("logout_button");
if (logout_button)
    buildLogout();
let RedPieces = [
    new piece("Red Flag", -2, 0, true, "./src/js/Red Pieces/Red Flag.png", 0, "l", "red", 11), // 0
    new piece("Red Bomb", -1, 0, true, "./src/js/Red Pieces/Red Bomb.png", 0, "k", "red", 10), // 1
    new piece("Red Spy", 0, 1, true, "./src/js/Red Pieces/Red Spy.png", 0, "j", "red", 9), // 2
    new piece("Red Marshal", 1, 1, true, "./src/js/Red Pieces/Red Marshall.png", 0, "i", "red", 8), // 3
    new piece("Red General", 2, 1, true, "./src/js/Red Pieces/Red General.png", 0, "h", "red", 7), // 4
    new piece("Red Colonel", 3, 1, true, "./src/js/Red Pieces/Red Colonel.png", 0, "g", "red", 6), // 5
    new piece("Red Major", 4, 1, true, "./src/js/Red Pieces/Red Major.png", 0, "f", "red", 5), // 6
    new piece("Red Captain", 5, 1, true, "./src/js/Red Pieces/Red Captain.png", 0, "e", "red", 4), // 7
    new piece("Red Lieutenant", 6, 1, true, "./src/js/Red Pieces/Red Lieutenant.png", 0, "d", "red", 3), // 8
    new piece("Red Sergeant", 7, 1, true, "./src/js/Red Pieces/Red Sergeant.png", 0, "c", "red", 2), // 9
    new piece("Red Miner", 8, 1, true, "./src/js/Red Pieces/Red Miner.png", 0, "b", "red", 1), // 10
    new piece("Red Scout", 9, 100, true, "./src/js/Red Pieces/Red Scout.png", 0, "a", "red", 0), // 11
    new piece("Piece", 99, 100, true, "./src/js/Red Pieces/Red Game Piece.png", 0, "a", "red", 0), // 12
];
let BluePieces = [
    new piece("Blue Flag", -2, 0, true, "./src/js/Blue Pieces/Blue Flag.png", 0, "l", "blue", 11),
    new piece("Blue Bomb", -1, 0, true, "./src/js/Blue Pieces/Blue Bomb.png", 0, "k", "blue", 10),
    new piece("Blue Spy", 0, 1, true, "./src/js/Blue Pieces/Blue Spy.png", 0, "j", "blue", 9),
    new piece("Blue Marshal", 1, 1, true, "./src/js/Blue Pieces/Blue Marshall.png", 0, "i", "blue", 8),
    new piece("Blue General", 2, 1, true, "./src/js/Blue Pieces/Blue General.png", 0, "h", "blue", 7),
    new piece("Blue Colonel", 3, 1, true, "./src/js/Blue Pieces/Blue Colonel.png", 0, "g", "blue", 6),
    new piece("Blue Major", 4, 1, true, "./src/js/Blue Pieces/Blue Major.png", 0, "f", "blue", 5),
    new piece("Blue Captain", 5, 1, true, "./src/js/Blue Pieces/Blue Captain.png", 0, "e", "blue", 4),
    new piece("Blue Lieutenant", 6, 1, true, "./src/js/Blue Pieces/Blue Lieutenant.png", 0, "d", "blue", 3),
    new piece("Blue Sergeant", 7, 1, true, "./src/js/Blue Pieces/Blue Sergeant.png", 0, "c", "blue", 2),
    new piece("Blue Miner", 8, 1, true, "./src/js/Blue Pieces/Blue Miner.png", 0, "b", "blue", 1),
    new piece("Blue Scout", 9, 100, true, "./src/js/Blue Pieces/Blue Scout.png", 0, "a", "blue", 0),
];
// INITAILIZE THE BOARD VISUALLY
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (joinedGame != "true") {
            buildJoin();
        }
        else {
            yield buildBoard(board);
        }
        renderLoginForm();
        renderRegisterForm();
        buildLogout();
        buildOnClose();
        endGame(1);
    });
}
function buildBoard(board) {
    return __awaiter(this, void 0, void 0, function* () {
        board === null || board === void 0 ? void 0 : board.replaceChildren();
        board.classList = "filled_board";
        let response = yield findGame();
        let currentGame = response.board;
        for (let i = 0; i < 100; i++) {
            let HTMLcell = document.createElement("div");
            let row = Math.floor(i / 10);
            let col = i % 10;
            let isWater = false;
            HTMLcell.className = "cell";
            let a_piece = currentGame[i];
            let piece = null;
            if (currentGame[i] != null) {
                try {
                    if (i < 41) {
                        piece = RedPieces[a_piece.rank + 2];
                    }
                    else if (i > 60) {
                        piece = BluePieces[a_piece.rank + 2];
                    }
                    HTMLcell.innerHTML = `<img src="../${piece.image}" alt="${piece.name}"">`;
                }
                catch (_a) {
                    HTMLcell.innerHTML = " ";
                }
            }
            else {
                HTMLcell.innerHTML = " ";
            }
            HTMLcell.className = "cell";
            board === null || board === void 0 ? void 0 : board.appendChild(HTMLcell);
            if (i > 40 && i < 60) {
                let loc = i % 10;
                if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                    HTMLcell.className = "cell_water";
                    isWater = true;
                }
                else {
                    HTMLcell.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                        if (HTMLcell == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                            HTMLcell.classList.toggle("active");
                            cells === null || cells === void 0 ? void 0 : cells.forEach(cell => cell.classList.remove("valid_move"));
                        }
                        else {
                            HTMLcell.classList.toggle("active");
                            cells === null || cells === void 0 ? void 0 : cells.forEach((cell) => {
                                cell.classList.remove("active");
                                cell.classList.remove("valid_move");
                            });
                            if (HTMLcell.classList.contains("valid_move")) {
                                let oldCell = currentCell;
                                let index = -1;
                                let row = -1;
                                let col = -1;
                                for (let i = 0; i < (cells === null || cells === void 0 ? void 0 : cells.length); i++) {
                                    if (cells && cells[i] == HTMLcell) {
                                        index = i;
                                        row = Math.floor(i / 10);
                                        col = i % 10;
                                    }
                                }
                                yield sendMove();
                                const newCell = cellsObject[index];
                                if (newCell.piece) {
                                    newCell.piece.row = row;
                                    newCell.piece.col = String(col);
                                }
                                if (oldCell) {
                                    oldCell.piece = null;
                                }
                            }
                        }
                    }));
                }
            }
            else {
                HTMLcell.addEventListener("click", function () {
                    if (HTMLcell == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                        HTMLcell.classList.remove("active");
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("valid_move"));
                    }
                    else {
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("active"));
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("valid_move"));
                        cellsObject.forEach(e => {
                            if (e.element == HTMLcell) {
                                currentCell = e;
                                showMoves();
                            }
                        });
                        HTMLcell.classList.toggle("active");
                    }
                });
            }
            cellsObject.push(new cell(row, col, isWater, piece, HTMLcell));
            cells === null || cells === void 0 ? void 0 : cells.push(HTMLcell);
        }
    });
}
function buildJoin() {
    // <p><div id="box"><p id="join_game">Join Game</p></div></p>
    let parTag = document.createElement('p');
    let boxDiv = document.createElement('div');
    boxDiv.id = "box";
    let innerP = document.createElement('p');
    innerP.id = 'join_game';
    innerP.innerText = 'Join Game';
    boxDiv.appendChild(innerP);
    parTag.appendChild(boxDiv);
    boxDiv.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let response = yield findGame();
        board.classList = "filled_board";
        yield localStorage.setItem("joinedGame", "true");
        buildJoin();
        buildBoard(board);
    }));
    if (localStorage.getItem("joinedGame") != "true")
        board === null || board === void 0 ? void 0 : board.replaceChildren(parTag);
    else {
        board === null || board === void 0 ? void 0 : board.replaceChildren();
    }
}
function showMoves() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    let ranIntoWaterDown = false;
    let ranIntoWaterUp = false;
    let ranIntoWaterRight = false;
    let ranIntoWaterLeft = false;
    let ranIntoSameColorPieceUp = false;
    let ranIntoSameColorPieceDown = false;
    let ranIntoSameColorPieceRight = false;
    let ranIntoSameColorPieceLeft = false;
    let ranIntoOpositeColorPieceLeft = false;
    let ranIntoOpositeColorPieceRight = false;
    let ranIntoOpositeColorPieceUp = false;
    let ranIntoOpositeColorPieceDown = false;
    // for blue pieces
    if (((_a = currentCell === null || currentCell === void 0 ? void 0 : currentCell.piece) === null || _a === void 0 ? void 0 : _a.color) == "blue" && currentCell.piece.isAlive == true && currentCell.piece.rank != -2 && currentCell.piece.rank != -1) {
        let validMoveCells = [];
        let validMoveCellObjects = [];
        if (currentCell.piece.rank != 9) {
            for (let i = 0; i < (cells === null || cells === void 0 ? void 0 : cells.length); i++) {
                if ((cells === null || cells === void 0 ? void 0 : cells.length) > 0) {
                    if (cells && cells[i] == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                        validMoveCells.push(cells[i + 10]);
                        validMoveCells.push(cells[i + 1]);
                        validMoveCells.push(cells[i - 1]);
                        validMoveCells.push(cells[i - 10]);
                        validMoveCellObjects.push(cellsObject[i + 10]);
                        validMoveCellObjects.push(cellsObject[i + 1]);
                        validMoveCellObjects.push(cellsObject[i - 1]);
                        validMoveCellObjects.push(cellsObject[i - 10]);
                    }
                }
            }
            for (let i = 0; i < validMoveCells.length; i++) {
                if (validMoveCells[i] != null && validMoveCellObjects[i].isWater == false && ((((_c = (_b = validMoveCellObjects[i]) === null || _b === void 0 ? void 0 : _b.piece) === null || _c === void 0 ? void 0 : _c.color) != "blue"))) {
                    validMoveCells[i].classList.add("valid_move");
                }
            }
        }
        else if (currentCell.piece.rank == 9) {
            let firstOpositePieceDown = true;
            let firstOpositePieceUp = true;
            let firstOpositePieceLeft = true;
            let firstOpositePieceRight = true;
            for (let i = 0; i < (cells === null || cells === void 0 ? void 0 : cells.length); i++) {
                if (cells && cells[i] == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                    for (let j = 1; j <= 10; j++) {
                        //Can move down
                        if (i + (j * 10) <= cellsObject.length && (i + (j * 10)) >= 0) {
                            if (cellsObject[i + (j * 10)].col == currentCell.col) {
                                if (cellsObject[i + (j * 10)].isWater == true) {
                                    ranIntoWaterDown = true;
                                }
                                if (((_d = cellsObject[i + (j * 10)].piece) === null || _d === void 0 ? void 0 : _d.color) == "blue") {
                                    ranIntoSameColorPieceDown = true;
                                }
                                if (((_e = cellsObject[i + (j * 10)].piece) === null || _e === void 0 ? void 0 : _e.color) == "red") {
                                    ranIntoOpositeColorPieceDown = true;
                                    if (!ranIntoWaterDown && !ranIntoSameColorPieceDown && firstOpositePieceDown) {
                                        validMoveCellObjects.push(cellsObject[i + (j * 10)]);
                                        validMoveCells.push(cells[i + (j * 10)]);
                                        firstOpositePieceDown = false;
                                    }
                                }
                                if (!ranIntoWaterDown && !ranIntoSameColorPieceDown) {
                                    validMoveCellObjects.push(cellsObject[i + (j * 10)]);
                                    validMoveCells.push(cells[i + (j * 10)]);
                                }
                            }
                        }
                        //Can move right
                        if ((i + j) <= cellsObject.length && (i + j) >= 0) {
                            if (cellsObject[i + (j)].row == currentCell.row) {
                                if (cellsObject[i + (j)].isWater == true) {
                                    ranIntoWaterRight = true;
                                }
                                if (((_f = cellsObject[i + (j)].piece) === null || _f === void 0 ? void 0 : _f.color) == "blue") {
                                    ranIntoSameColorPieceRight = true;
                                }
                                if (((_g = cellsObject[i + (j)].piece) === null || _g === void 0 ? void 0 : _g.color) == "red") {
                                    ranIntoOpositeColorPieceRight = true;
                                    if (!ranIntoWaterRight && !ranIntoSameColorPieceRight && firstOpositePieceRight) {
                                        validMoveCellObjects.push(cellsObject[i + (j)]);
                                        validMoveCells.push(cells[i + (j)]);
                                        firstOpositePieceRight = false;
                                    }
                                }
                                if (!ranIntoWaterRight && !ranIntoSameColorPieceRight) {
                                    validMoveCellObjects.push(cellsObject[i + (j)]);
                                    validMoveCells.push(cells[i + (j)]);
                                }
                            }
                        }
                        // Can move left
                        if ((i - j) <= cellsObject.length && (i - j) >= 0) {
                            if (cellsObject[i - (j)].row == currentCell.row) {
                                if (cellsObject[i - (j)].isWater) {
                                    ranIntoWaterLeft = true;
                                }
                                if (((_h = cellsObject[i - (j)].piece) === null || _h === void 0 ? void 0 : _h.color) == "blue") {
                                    ranIntoSameColorPieceLeft = true;
                                }
                                if (((_j = cellsObject[i - (j)].piece) === null || _j === void 0 ? void 0 : _j.color) == "red") {
                                    ranIntoOpositeColorPieceLeft = true;
                                    if (!ranIntoWaterLeft && !ranIntoSameColorPieceLeft && firstOpositePieceLeft) {
                                        validMoveCellObjects.push(cellsObject[i - (j)]);
                                        validMoveCells.push(cells[i - (j)]);
                                        firstOpositePieceLeft = false;
                                    }
                                }
                                if (!ranIntoWaterLeft && !ranIntoSameColorPieceLeft) {
                                    validMoveCellObjects.push(cellsObject[i - (j)]);
                                    validMoveCells.push(cells[i - (j)]);
                                }
                            }
                        }
                        //Can move up
                        if ((i - (j * 10)) <= cellsObject.length && (i - (j * 10) >= 0)) {
                            if (cellsObject[i - (j * 10)].col == currentCell.col) {
                                if (cellsObject[i - (j * 10)].isWater) {
                                    ranIntoWaterUp = true;
                                }
                                if (((_k = cellsObject[i - (j * 10)].piece) === null || _k === void 0 ? void 0 : _k.color) == "blue") {
                                    ranIntoSameColorPieceUp = true;
                                }
                                if (((_l = cellsObject[i - (j * 10)].piece) === null || _l === void 0 ? void 0 : _l.color) == "red") {
                                    ranIntoOpositeColorPieceUp = true;
                                    if (!ranIntoWaterUp && !ranIntoSameColorPieceUp && firstOpositePieceUp) {
                                        validMoveCellObjects.push(cellsObject[i - (j * 10)]);
                                        validMoveCells.push(cells[i - (j * 10)]);
                                        firstOpositePieceUp = false;
                                    }
                                }
                                if (!ranIntoWaterUp && !ranIntoSameColorPieceUp) {
                                    validMoveCellObjects.push(cellsObject[i - (j * 10)]);
                                    validMoveCells.push(cells[i - (j * 10)]);
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < validMoveCells.length; i++) {
                if (validMoveCells[i] != null && (((_o = (_m = validMoveCellObjects[i]) === null || _m === void 0 ? void 0 : _m.piece) === null || _o === void 0 ? void 0 : _o.color) != "blue" || ((_q = (_p = validMoveCellObjects[i]) === null || _p === void 0 ? void 0 : _p.piece) === null || _q === void 0 ? void 0 : _q.isAlive) == false)) {
                    validMoveCells[i].classList.add("valid_move");
                }
            }
        }
    }
}
function renderLoginForm() {
    if (login_form) {
        login_form.innerHTML = ""; // Clear existing content
        const usernameLabel = document.createElement("label");
        usernameLabel.setAttribute("for", "username");
        usernameLabel.textContent = "Username:";
        login_form.appendChild(usernameLabel);
        const usernameInput = document.createElement("input");
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("id", "username");
        usernameInput.setAttribute("name", "username");
        usernameInput.required = true;
        login_form.appendChild(usernameInput);
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for", "password");
        passwordLabel.textContent = "Password:";
        login_form.appendChild(passwordLabel);
        const passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("id", "password");
        passwordInput.setAttribute("name", "password");
        passwordInput.required = true;
        login_form.appendChild(passwordInput);
        const loginButton = document.createElement("button");
        loginButton.setAttribute("type", "submit");
        loginButton.textContent = "Login";
        login_form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let response = yield auth_login(usernameInput.value, passwordInput.value);
            console.log(response);
            if (typeof response !== "string" && response.status == 200) {
                localStorage.setItem("currentUser", usernameInput.value);
                localStorage.setItem("loggedIn", "true");
                window.location.replace("./index.html");
            }
            else {
                alert("Invalid login! Please try again!");
            }
        }));
        login_form.appendChild(loginButton);
    }
}
function renderRegisterForm() {
    if (register_form) {
        register_form.innerHTML = ""; // Clear existing content
        const usernameLabel = document.createElement("label");
        usernameLabel.setAttribute("for", "reg_username");
        usernameLabel.textContent = "Username:";
        register_form.appendChild(usernameLabel);
        const usernameInput = document.createElement("input");
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("id", "reg_username");
        usernameInput.setAttribute("name", "username");
        usernameInput.required = true;
        register_form.appendChild(usernameInput);
        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("for", "reg_email");
        emailLabel.textContent = "Email:";
        register_form.appendChild(emailLabel);
        const emailInput = document.createElement("input");
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("id", "reg_email");
        emailInput.setAttribute("name", "email");
        emailInput.required = true;
        register_form.appendChild(emailInput);
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for", "reg_password");
        passwordLabel.textContent = "Password:";
        register_form.appendChild(passwordLabel);
        const passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("id", "reg_password");
        passwordInput.setAttribute("name", "password");
        passwordInput.required = true;
        register_form.appendChild(passwordInput);
        const confirmPasswordLabel = document.createElement("label");
        confirmPasswordLabel.setAttribute("for", "reg_confirm_password");
        confirmPasswordLabel.textContent = "Confirm Password:";
        register_form.appendChild(confirmPasswordLabel);
        const confirmPasswordInput = document.createElement("input");
        confirmPasswordInput.setAttribute("type", "password");
        confirmPasswordInput.setAttribute("id", "reg_confirm_password");
        confirmPasswordInput.setAttribute("name", "confirm_password");
        confirmPasswordInput.required = true;
        register_form.appendChild(confirmPasswordInput);
        const registerButton = document.createElement("button");
        registerButton.setAttribute("type", "submit");
        registerButton.textContent = "Register";
        register_form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let response = yield register(usernameInput.value, passwordInput.value, emailInput.value);
            console.log(response);
            window.location.replace("./index.html");
        }));
        register_form.appendChild(registerButton);
    }
}
function buildOnClose() {
    window.addEventListener("beforeunload", async () => {
        await logout(localStorage.getItem("currentUser"));
        localStorage.setItem("currentUser", "undefined");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("joinedGame", "false");
    }));
}
function buildLogout() {
    if (logout_button) {
        logout_button.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            console.log("CLICKED");
            let currentUser = localStorage.getItem("currentUser");
            if (!currentUser || currentUser == undefined) {
                return "NO USER CURRENTLY LOGGED IN";
            }
            localStorage.removeItem("currentUser");
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("joinedGame", "false");
            let response = await logout(currentUser);
            if (!response) {
                localStorage.setItem("currentUser", "undefined");
                localStorage.setItem("loggedIn", "false");
                localStorage.setItem("joinedGame", "false");
                currentUser = null;
                alert("Logged out successfully!");
                window.location.replace("./index.html");
            }
            else {
                alert("Logout failed! Please try again.");
            }
        });
    }
    else {
        console.error("Logout button not found!");
    }
}
<<<<<<< Updated upstream
async function auth_login(username, password) {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser != null) {
        alert("User already logged in!");
        return `CurrentUser, ${currentUser} already logged in!`;
    }
    else {
        let response = await fetch(`${base_url}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email: "" })
        });
        if (response.status != 200) {
            console.error("Login failed:", await response.text());
            return response;
        }
        console.log(response);
        alert("Login successful!");
        return response;
    }
}
async function register(username, password, email) {
    let response = await fetch(`${base_url}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, email })
=======
function auth_login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (localStorage.getItem("currentUser") != "undefined" || localStorage.getItem("currentUser") == null) {
            alert("User already logged in!");
            return "User already logged in!";
        }
        else {
            let response = yield fetch(`${base_url}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, email: "" })
            });
            if (!response.ok) {
                console.error("Login failed:", yield response.text());
                return response;
            }
            currentUser = response;
            console.log(response);
            alert("Login successful!");
            return response;
        }
>>>>>>> Stashed changes
    });
}
function register(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`${base_url}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email })
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Logout failed:", errorData);
            throw new Error(`Logout failed with status ${response.status}`);
        }
        alert("Logged out successfully!");
        localStorage.setItem("currentUser", "undefined");
        localStorage.setItem("loggedIn", "false");
        const responseData = await response.json();
        return new Error(responseData);
    }
    catch (error) {
        console.error("An error occurred during logout:", error);
        throw error;
    }
}
function findGame() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve the username from localStorage
        let username = localStorage.getItem("currentUser");
        // Validate the username
        if (!username || username === "undefined") {
            console.error("No valid username found in localStorage.");
            throw new Error("No valid username found. Please log in first.");
        }
        // Use the username to find a game
        let response = yield fetch(`${base_url}/api/game/findGame`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username }), // Fixed: Stringify the body
        });
        if (!response.ok) {
            console.log(yield response.json());
            throw new Error("Failed to find game!");
        }
        let res = yield response.json();
        return res;
    });
}
async function sendMove() {
    let tmpBoard = new ApiBoard(cellsObject);
    let response = await fetch(`${base_url}/api/game/postMove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lobbyId: Number(localStorage.getItem("lobbyId")),
            board: tmpBoard.board,
            currentUser: localStorage.getItem("currentUser"),
            currentTurn: localStorage.getItem("currentTurn"),
            isWin: Boolean(localStorage.getItem("isWin"))
        }), // Fixed: Properly structure the JSON body
    });
    return await response.json();
}
function endGame(lobbyId) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`${base_url}/api/game/endGame`, {
            method: "POST",
            headers: {
                "Content-Type": "application/ason"
            },
            body: JSON.stringify(lobbyId),
        });
        return response.status;
    });
}
function getBoard() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = localStorage.getItem("currentUser") || "NONE";
        let response = yield fetch(`${base_url}/api/game/getBoard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lobbyId, user, turn })
        });
        return yield response.json();
    });
}
