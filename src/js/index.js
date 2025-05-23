"use strict";
class piece {
    name;
    user;
    rank;
    movement;
    isAlive;
    image;
    row;
    col;
    color;
    id;
    constructor(name, user, rank, movement, isAlive, image, row, col, color, id) {
        this.name = name;
        this.user = user;
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
class ApiPiece {
    rank;
    user;
    visible;
    constructor(rank, user, visible) {
        this.rank = rank;
        this.user = user;
        this.visible = visible;
    }
}
class ApiBoard {
    board;
    constructor(board) {
        this.board = Array();
        for (let i = 0; i < 100; i++) {
            try {
                this.board[i] = new ApiPiece(board[i].piece.rank, board[i].piece.user, board[i].piece.isAlive);
            }
            catch {
                this.board[i] = new ApiPiece(0, "NONE", false);
            }
        }
    }
}
class cell {
    row; // 0 - 9
    col; // a - j
    isWater;
    piece;
    element;
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
    new piece("Red Flag", "", -2, 0, true, "./src/js/Red Pieces/Red Flag.png", 0, "l", "red", 11), // 0
    new piece("Red Bomb", "", -1, 0, true, "./src/js/Red Pieces/Red Bomb.png", 0, "k", "red", 10), // 1
    new piece("Red Spy", "", 0, 1, true, "./src/js/Red Pieces/Red Spy.png", 0, "j", "red", 9), // 2
    new piece("Red Marshal", "", 1, 1, true, "./src/js/Red Pieces/Red Marshall.png", 0, "i", "red", 8), // 3
    new piece("Red General", "", 2, 1, true, "./src/js/Red Pieces/Red General.png", 0, "h", "red", 7), // 4
    new piece("Red Colonel", "", 3, 1, true, "./src/js/Red Pieces/Red Colonel.png", 0, "g", "red", 6), // 5
    new piece("Red Major", "", 4, 1, true, "./src/js/Red Pieces/Red Major.png", 0, "f", "red", 5), // 6
    new piece("Red Captain", "", 5, 1, true, "./src/js/Red Pieces/Red Captain.png", 0, "e", "red", 4), // 7
    new piece("Red Lieutenant", "", 6, 1, true, "./src/js/Red Pieces/Red Lieutenant.png", 0, "d", "red", 3), // 8
    new piece("Red Sergeant", "", 7, 1, true, "./src/js/Red Pieces/Red Sergeant.png", 0, "c", "red", 2), // 9
    new piece("Red Miner", "", 8, 1, true, "./src/js/Red Pieces/Red Miner.png", 0, "b", "red", 1), // 10
    new piece("Red Scout", "", 9, 100, true, "./src/js/Red Pieces/Red Scout.png", 0, "a", "red", 0), // 11
    new piece("Piece", "", 99, 100, true, "./src/js/Red Pieces/Red Game Piece.png", 0, "a", "red", 0), // 12
];
let BluePieces = [
    new piece("Blue Flag", "", -2, 0, true, "./src/js/Blue Pieces/Blue Flag.png", 0, "l", "blue", 11),
    new piece("Blue Bomb", "", -1, 0, true, "./src/js/Blue Pieces/Blue Bomb.png", 0, "k", "blue", 10),
    new piece("Blue Spy", "", 0, 1, true, "./src/js/Blue Pieces/Blue Spy.png", 0, "j", "blue", 9),
    new piece("Blue Marshal", "", 1, 1, true, "./src/js/Blue Pieces/Blue Marshall.png", 0, "i", "blue", 8),
    new piece("Blue General", "", 2, 1, true, "./src/js/Blue Pieces/Blue General.png", 0, "h", "blue", 7),
    new piece("Blue Colonel", "", 3, 1, true, "./src/js/Blue Pieces/Blue Colonel.png", 0, "g", "blue", 6),
    new piece("Blue Major", "", 4, 1, true, "./src/js/Blue Pieces/Blue Major.png", 0, "f", "blue", 5),
    new piece("Blue Captain", "", 5, 1, true, "./src/js/Blue Pieces/Blue Captain.png", 0, "e", "blue", 4),
    new piece("Blue Lieutenant", "", 6, 1, true, "./src/js/Blue Pieces/Blue Lieutenant.png", 0, "d", "blue", 3),
    new piece("Blue Sergeant", "", 7, 1, true, "./src/js/Blue Pieces/Blue Sergeant.png", 0, "c", "blue", 2),
    new piece("Blue Miner", "", 8, 1, true, "./src/js/Blue Pieces/Blue Miner.png", 0, "b", "blue", 1),
    new piece("Blue Scout", "", 9, 100, true, "./src/js/Blue Pieces/Blue Scout.png", 0, "a", "blue", 0),
];
// INITAILIZE THE BOARD VISUALLY
main();
async function main() {
    if (joinedGame != "true") {
        buildJoin();
    }
    else {
        await buildBoard(board);
    }
    renderLoginForm();
    renderRegisterForm();
    buildLogout();
    buildOnClose();
}
// Call findGame() every second if joinedGame is true
// let gameInterval = null;
// if (localStorage.getItem("joinedGame") === "true") {
//     gameInterval = setInterval(async () => {
//         try {
//             let response = await findGame();
//             clearInterval(gameInterval!); // Reset the interval
//             if (response.status === 200 && response.isWin != null) {
//                 alert(response.message);
//                 localStorage.setItem("joinedGame", "false");
//             } else {
//                 alert(response.message);
//                 localStorage.setItem("joinedGame", "false");
//             }
//             console.log("Game state updated:", response);
//         } catch (error) {
//             console.error("Error fetching game state:", error);
//             clearInterval(gameInterval!); // Stop the interval on error
//         }
//     }, 1000);
// }
async function buildBoard(board) {
    board?.replaceChildren();
    board.classList = "filled_board";
    let response = await findGame();
    let currentGame = response.board;
    for (let i = 0; i < 100; i++) {
        let HTMLcell = document.createElement("div");
        let row = Math.floor(i / 10);
        let col = (i % 10);
        let isWater = false;
        HTMLcell.className = "cell";
        let a_piece = currentGame[i];
        let piece = null;
        if (currentGame[i] != null) {
            try {
                piece = a_piece.user == localStorage.getItem("currentUser") ? BluePieces[a_piece.rank + 2] : RedPieces[12];
                HTMLcell.innerHTML = `<img src="../${piece.image}" alt="${piece.name}"">`;
            }
            catch {
                HTMLcell.innerHTML = " ";
            }
        }
        else {
            console.log("NO PIECE FOUND");
            HTMLcell.innerHTML = " ";
        }
        board?.appendChild(HTMLcell);
        if (i > 40 && i < 60) {
            let loc = i % 10;
            if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                HTMLcell.className = "cell_water";
                isWater = true;
            }
        }
        HTMLcell.addEventListener("click", async (e) => {
            if (HTMLcell == currentCell?.element) {
                HTMLcell.classList.toggle("active");
                cells?.forEach((cell) => cell.classList.remove("valid_move"));
            }
            else {
                HTMLcell.classList.toggle("active");
                if (HTMLcell.classList.contains("valid_move")) {
                    let oldCell = currentCell;
                    let oldCellIndex = -1;
                    let index = -1;
                    let row = -1;
                    let col = -1;
                    for (let i = 0; i < cells?.length; i++) {
                        if (cells && cells[i] == HTMLcell) {
                            index = i;
                            row = Math.floor(i / 10);
                            col = (i % 10);
                        }
                    }
                    for (let i = 0; i < cellsObject.length; i++) {
                        if (cellsObject[i].element == currentCell?.element) {
                            oldCellIndex = i;
                            break;
                        }
                    }
                    await sendMove(oldCellIndex, index);
                    const newCell = cellsObject[index];
                    if (newCell.piece) {
                        newCell.piece.row = row;
                        newCell.piece.col = String(col);
                    }
                    if (oldCell) {
                        oldCell.piece = null;
                    }
                    console.log(newCell.piece);
                    window.location.reload();
                }
                cells?.forEach((cell) => {
                    cell.classList.remove("active");
                    cell.classList.remove("valid_move");
                });
            }
        });
        HTMLcell.addEventListener("click", function () {
            if (HTMLcell == currentCell?.element) {
                HTMLcell.classList.remove("active");
                cells?.forEach((e) => e.classList.remove("valid_move"));
            }
            else {
                cells?.forEach((e) => e.classList.remove("active"));
                cells?.forEach((e) => e.classList.remove("valid_move"));
                cellsObject.forEach((e) => {
                    if (e.element == HTMLcell) {
                        currentCell = e;
                        showMoves();
                    }
                });
                HTMLcell.classList.toggle("active");
            }
        });
        cellsObject.push(new cell(row, col, isWater, piece, HTMLcell));
        cells?.push(HTMLcell);
    }
}
async function buildJoin() {
    // <p><div id="box"><p id="join_game">Join Game</p></div></p>
    let parTag = document.createElement("p");
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";
    let innerP = document.createElement("p");
    innerP.id = "join_game";
    innerP.innerText = "Join Game";
    boxDiv.appendChild(innerP);
    parTag.appendChild(boxDiv);
    boxDiv.addEventListener("click", async (e) => {
        e.preventDefault();
        let response = await findGame();
        board.classList = "filled_board";
        await localStorage.setItem("joinedGame", "true");
        buildJoin();
        buildBoard(board);
    });
    if (localStorage.getItem("joinedGame") != "true")
        board?.replaceChildren(parTag);
    else {
        board?.replaceChildren();
    }
}
function showMoves() {
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
    let firstOpositePieceDown = true;
    let firstOpositePieceUp = true;
    let firstOpositePieceLeft = true;
    let firstOpositePieceRight = true;
    // for blue pieces
    if (currentCell?.piece?.color == "blue" &&
        currentCell.piece.isAlive == true &&
        currentCell.piece.rank != -2 &&
        currentCell.piece.rank != -1) {
        let validMoveCells = [];
        let validMoveCellObjects = [];
        if (currentCell.piece.rank != 2) {
            for (let i = 0; i < cells?.length; i++) {
                if (cells?.length > 0) {
                    if (cells && cells[i] == currentCell?.element) {
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
                if (validMoveCells[i] != null &&
                    validMoveCellObjects[i].isWater == false &&
                    validMoveCellObjects[i]?.piece?.color != "blue") {
                    validMoveCells[i].classList.add("valid_move");
                }
            }
        }
        else if (currentCell.piece.rank == 2) {
            for (let i = 0; i < cells?.length; i++) {
                if (cells && cells[i] == currentCell?.element) {
                    for (let j = 1; j <= 10; j++) {
                        //Can move down
                        if (i + j * 10 < cellsObject.length && i + j * 10 >= 0) {
                            if (cellsObject[i + j * 10].col == currentCell.col) {
                                if (cellsObject[i + j * 10].isWater == true) {
                                    ranIntoWaterDown = true;
                                }
                                if (cellsObject[i + j * 10].piece?.color == "blue") {
                                    ranIntoSameColorPieceDown = true;
                                }
                                if (cellsObject[i + j * 10].piece?.color == "red") {
                                    ranIntoOpositeColorPieceDown = true;
                                    if (!ranIntoWaterDown &&
                                        !ranIntoSameColorPieceDown &&
                                        firstOpositePieceDown) {
                                        validMoveCellObjects.push(cellsObject[i + j * 10]);
                                        validMoveCells.push(cells[i + j * 10]);
                                        firstOpositePieceDown = false;
                                    }
                                }
                                if (!ranIntoWaterDown && !ranIntoSameColorPieceDown) {
                                    validMoveCellObjects.push(cellsObject[i + j * 10]);
                                    validMoveCells.push(cells[i + j * 10]);
                                }
                            }
                        }
                        //Can move right
                        if (i + j < cellsObject.length && i + j >= 0) {
                            if (cellsObject[i + j].row == currentCell.row) {
                                if (cellsObject[i + j].isWater == true) {
                                    ranIntoWaterRight = true;
                                }
                                if (cellsObject[i + j].piece?.color == "blue") {
                                    ranIntoSameColorPieceRight = true;
                                }
                                if (cellsObject[i + j].piece?.color == "red") {
                                    ranIntoOpositeColorPieceRight = true;
                                    if (!ranIntoWaterRight &&
                                        !ranIntoSameColorPieceRight &&
                                        firstOpositePieceRight) {
                                        validMoveCellObjects.push(cellsObject[i + j]);
                                        validMoveCells.push(cells[i + j]);
                                        firstOpositePieceRight = false;
                                    }
                                }
                                if (!ranIntoWaterRight && !ranIntoSameColorPieceRight) {
                                    validMoveCellObjects.push(cellsObject[i + j]);
                                    validMoveCells.push(cells[i + j]);
                                }
                            }
                        }
                        // Can move left
                        if (i - j < cellsObject.length && i - j >= 0) {
                            if (cellsObject[i - j].row == currentCell.row) {
                                if (cellsObject[i - j].isWater) {
                                    ranIntoWaterLeft = true;
                                }
                                if (cellsObject[i - j].piece?.color == "blue") {
                                    ranIntoSameColorPieceLeft = true;
                                }
                                if (cellsObject[i - j].piece?.color == "red") {
                                    ranIntoOpositeColorPieceLeft = true;
                                    if (!ranIntoWaterLeft &&
                                        !ranIntoSameColorPieceLeft &&
                                        firstOpositePieceLeft) {
                                        validMoveCellObjects.push(cellsObject[i - j]);
                                        validMoveCells.push(cells[i - j]);
                                        firstOpositePieceLeft = false;
                                    }
                                }
                                if (!ranIntoWaterLeft && !ranIntoSameColorPieceLeft) {
                                    validMoveCellObjects.push(cellsObject[i - j]);
                                    validMoveCells.push(cells[i - j]);
                                }
                            }
                        }
                        //Can move up
                        if (i - j * 10 < cellsObject.length && i - j * 10 >= 0) {
                            if (cellsObject[i - j * 10].col == currentCell.col) {
                                if (cellsObject[i - j * 10].isWater) {
                                    ranIntoWaterUp = true;
                                }
                                if (cellsObject[i - j * 10].piece?.color == "blue") {
                                    ranIntoSameColorPieceUp = true;
                                }
                                if (cellsObject[i - j * 10].piece?.color == "red") {
                                    ranIntoOpositeColorPieceUp = true;
                                    if (!ranIntoWaterUp &&
                                        !ranIntoSameColorPieceUp &&
                                        ranIntoOpositeColorPieceUp &&
                                        firstOpositePieceUp) {
                                        validMoveCellObjects.push(cellsObject[i - j * 10]);
                                        validMoveCells.push(cells[i - j * 10]);
                                        firstOpositePieceUp = false;
                                    }
                                }
                                else if (!ranIntoWaterUp && !ranIntoSameColorPieceUp) {
                                    validMoveCellObjects.push(cellsObject[i - j * 10]);
                                    validMoveCells.push(cells[i - j * 10]);
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < validMoveCells.length; i++) {
                if (validMoveCells[i] != null &&
                    (validMoveCellObjects[i]?.piece?.color != "blue" ||
                        validMoveCellObjects[i]?.piece?.isAlive == false)) {
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
        login_form.addEventListener("submit", async (e) => {
            e.preventDefault();
            let response = await auth_login(usernameInput.value, passwordInput.value);
            console.log(response);
            if (typeof response !== "string" && response.status == 200) {
                localStorage.setItem("currentUser", usernameInput.value);
                localStorage.setItem("loggedIn", "true");
                window.location.replace("./index.html");
            }
            else {
                alert("Invalid login! Please try again!");
            }
        });
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
        register_form.addEventListener("submit", async (e) => {
            e.preventDefault();
            let response = await register(usernameInput.value, passwordInput.value, emailInput.value);
            console.log(response);
            await auth_login(usernameInput.value, passwordInput.value);
            window.location.replace("./index.html");
        });
        register_form.appendChild(registerButton);
    }
}
function buildOnClose() {
    window.addEventListener("beforeunload", async () => {
        await logout(localStorage.getItem("currentUser"));
        localStorage.removeItem("currentUser");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("joinedGame", "false");
    });
}
function buildLogout() {
    if (logout_button) {
        logout_button.addEventListener("click", async (e) => {
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
            alert("Logged out successfully!");
            window.location.replace("./index.html");
        });
    }
    else {
        console.error("Logout button not found!");
    }
}
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email: "" }),
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
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
    });
    if (!response.ok) {
        console.error("Registration failed:", await response.text());
        return response;
    }
    return response;
}
async function logout(username) {
    if (!username) {
        throw new Error("Username is required for logout.");
    }
    try {
        let response = await fetch(`${base_url}/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Logout failed:", errorData);
            throw new Error(`Logout failed with status ${response.status}`);
        }
        else {
            alert("Logged out successfully!");
            localStorage.remove("currentUser", "undefined");
            localStorage.setItem("loggedIn", "false");
            const responseData = await response.json();
            return response;
        }
    }
    catch (error) {
        console.error("An error occurred during logout:", error);
        throw error;
    }
}
async function findGame() {
    // Retrieve the username from localStorage
    let username = localStorage.getItem("currentUser");
    // Validate the username
    if (!username || username === "undefined") {
        console.error("No valid username found in localStorage.");
        throw new Error("No valid username found. Please log in first.");
    }
    // Use the username to find a game
    let response = await fetch(`${base_url}/api/game/findGame`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, Board: null }), // Fixed: Stringify the body
    });
    if (!response.ok) {
        console.log(await response.json());
        throw new Error("Failed to find game!");
    }
    let res = await response.json();
    return res;
}
async function sendMove(index_last, index) {
    let tmpBoard = new ApiBoard(cellsObject);
    let response = await fetch(`${base_url}/api/game/postMove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lobbyId: Number(localStorage.getItem("lobbyId")),
            user: localStorage.getItem("currentUser"),
            index_last: index_last,
            index: index,
            time: null,
        }),
    });
    return await response.json();
}
async function endGame(lobbyId) {
    let response = await fetch(`${base_url}/api/game/endGame`, {
        method: "POST",
        headers: {
            "Content-Type": "application/ason",
        },
        body: JSON.stringify(lobbyId),
    });
    return response.status;
}
async function getBoard() {
    let user = localStorage.getItem("currentUser") || "NONE";
    let response = await fetch(`${base_url}/api/game/getBoard`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lobbyId, user, turn }),
    });
    return await response.json();
}
async function isAuthenticated(username) {
    let response = await fetch(`${base_url}/api/auth/isAuthenticated`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(username),
    });
    if (response.status == 200) {
        return true;
    }
    else if (response.status == 404) {
        return false;
    }
    else {
        throw new Error(`${response.status}: SERVER ERROR\n${response.statusText}`);
    }
}
