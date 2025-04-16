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
// let base_url: string = "http://localhost:5244";
let base_url = "https://strategogameserver-4vzb9wy5.b4a.run";
let login_form = document.getElementById("login");
let register_form = document.getElementById("register");
let logout_button = document.getElementById("logout_button");
if (logout_button)
    buildLogout();
if (!logout_button)
    console.log({
        "Test Accounts": [
            { "username": "admin", "password": "password", "email": "admin.123@fake.com" },
            { "username": "user", "password": "1234", "email": "guest@fake.com" },
            { "username": "guest", "password": "password", "email": "guest123@fake.com" },
        ]
    });
renderLoginForm();
renderRegisterForm();
let RedPieces = [
    new piece("Red Scout", 9, 100, true, "./js/Red Pieces/Red Scout.png", 0, "a", "red", 0),
    new piece("Red Miner", 8, 1, true, "./js/Red Pieces/Red Miner.png", 0, "b", "red", 1),
    new piece("Red Sergeant", 7, 1, true, "./js/Red Pieces/Red Sergeant.png", 0, "c", "red", 2),
    new piece("Red Lieutenant", 6, 1, true, "./js/Red Pieces/Red Lieutenant.png", 0, "d", "red", 3),
    new piece("Red Captain", 5, 1, true, "./js/Red Pieces/Red Captain.png", 0, "e", "red", 4),
    new piece("Red Major", 4, 1, true, "./js/Red Pieces/Red Major.png", 0, "f", "red", 5),
    new piece("Red Colonel", 3, 1, true, "./js/Red Pieces/Red Colonel.png", 0, "g", "red", 6),
    new piece("Red General", 2, 1, true, "./js/Red Pieces/Red General.png", 0, "h", "red", 7),
    new piece("Red Marshal", 1, 1, true, "./js/Red Pieces/Red Marshall.png", 0, "i", "red", 8),
    new piece("Red Spy", 0, 1, true, "./js/Red Pieces/Red Spy.png", 0, "j", "red", 9),
    new piece("Red Bomb", -1, 0, true, "./js/Red Pieces/Red Bomb.png", 0, "k", "red", 10),
    new piece("Red Flag", -2, 0, true, "./js/Red Pieces/Red Flag.png", 0, "l", "red", 11),
];
let BluePieces = [
    new piece("Blue Scout", 9, 100, true, "./js/Blue Pieces/Blue Scout.png", 0, "a", "blue", 0),
    new piece("Blue Miner", 8, 1, true, "./js/Blue Pieces/Blue Miner.png", 0, "b", "blue", 1),
    new piece("Blue Sergeant", 7, 1, true, "./js/Blue Pieces/Blue Sergeant.png", 0, "c", "blue", 2),
    new piece("Blue Lieutenant", 6, 1, true, "./js/Blue Pieces/Blue Lieutenant.png", 0, "d", "blue", 3),
    new piece("Blue Captain", 5, 1, true, "./js/Blue Pieces/Blue Captain.png", 0, "e", "blue", 4),
    new piece("Blue Major", 4, 1, true, "./js/Blue Pieces/Blue Major.png", 0, "f", "blue", 5),
    new piece("Blue Colonel", 3, 1, true, "./js/Blue Pieces/Blue Colonel.png", 0, "g", "blue", 6),
    new piece("Blue General", 2, 1, true, "./js/Blue Pieces/Blue General.png", 0, "h", "blue", 7),
    new piece("Blue Marshal", 1, 1, true, "./js/Blue Pieces/Blue Marshall.png", 0, "i", "blue", 8),
    new piece("Blue Spy", 0, 1, true, "./js/Blue Pieces/Blue Spy.png", 0, "j", "blue", 9),
    new piece("Blue Bomb", -1, 0, true, "./js/Blue Pieces/Blue Bomb.png", 0, "k", "blue", 10),
    new piece("Blue Flag", -2, 0, true, "./js/Blue Pieces/Blue Flag.png", 0, "l", "blue", 11),
];
// INITAILIZE THE BOARD VISUALLY
buildBoard(board);
function buildBoard(board) {
    let piece_index = 0;
    for (let i = 0; i < 100; i++) {
        let HTMLcell = document.createElement("div");
        let row = Math.floor(i / 10);
        let col = i % 10;
        let isWater = false;
        let piece = null;
        HTMLcell.className = "cell";
        board === null || board === void 0 ? void 0 : board.appendChild(HTMLcell);
        if (piece_index < BluePieces.length) {
            piece = BluePieces[piece_index];
            HTMLcell.className = "cell";
            HTMLcell.innerText = `${piece.rank} (ID: ${piece.id})`; // for debugging purposes, show the name of the piece in the cell
            HTMLcell.innerHTML = `<img src="${BluePieces[piece_index].image}" alt="${BluePieces[piece_index].name}">`;
            board === null || board === void 0 ? void 0 : board.appendChild(HTMLcell);
            piece_index++;
            HTMLcell.style.fontSize = "8px"; // make the text smaller to fit in the cell
        }
        if (i > 40 && i < 60) {
            let loc = i % 10;
            if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                HTMLcell.className = "cell_water";
                isWater = true;
            }
            else {
                HTMLcell.addEventListener("click", (e) => {
                    if (HTMLcell == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                        HTMLcell.classList.remove("active");
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("valid_move"));
                    }
                    else {
                        console.log(e);
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("active"));
                        cells === null || cells === void 0 ? void 0 : cells.forEach(e => e.classList.remove("valid_move"));
                        HTMLcell.classList.toggle("active");
                        cellsObject.forEach(e => {
                            if (e.element == HTMLcell) {
                                currentCell = e;
                                showMoves();
                            }
                        });
                    }
                });
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
}
function showMoves() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // for blue pieces
    if (((_a = currentCell === null || currentCell === void 0 ? void 0 : currentCell.piece) === null || _a === void 0 ? void 0 : _a.color) == "blue" && currentCell.piece.isAlive == true && currentCell.piece.rank != -2 && currentCell.piece.rank != -1) {
        let validMoveCells = [];
        let validMoveCellObjects = [];
        if (currentCell.piece.rank != 2) {
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
                if (validMoveCells[i] != null && (((_c = (_b = validMoveCellObjects[i]) === null || _b === void 0 ? void 0 : _b.piece) === null || _c === void 0 ? void 0 : _c.color) != "blue" || ((_e = (_d = validMoveCellObjects[i]) === null || _d === void 0 ? void 0 : _d.piece) === null || _e === void 0 ? void 0 : _e.isAlive) == false || validMoveCellObjects[i].piece == null)) {
                    validMoveCells[i].classList.add("valid_move");
                }
            }
        }
        else if (currentCell.piece.rank == 2) {
            for (let i = 0; i < (cells === null || cells === void 0 ? void 0 : cells.length); i++) {
                if ((cells === null || cells === void 0 ? void 0 : cells.length) > 0) {
                    if (cells && cells[i] == (currentCell === null || currentCell === void 0 ? void 0 : currentCell.element)) {
                        for (let j = 1; j <= 10; j++) {
                            validMoveCells.push(cells[i + (j * 10)]);
                            validMoveCells.push(cells[i + (j)]);
                            validMoveCells.push(cells[i - (j)]);
                            validMoveCells.push(cells[i - (j * 10)]);
                            validMoveCellObjects.push(cellsObject[i + (j * 10)]);
                            validMoveCellObjects.push(cellsObject[i + (j)]);
                            validMoveCellObjects.push(cellsObject[i - (j)]);
                            validMoveCellObjects.push(cellsObject[i - (j * 10)]);
                        }
                    }
                }
            }
            for (let i = 0; i < validMoveCells.length; i++) {
                if (validMoveCells[i] != null && (((_g = (_f = validMoveCellObjects[i]) === null || _f === void 0 ? void 0 : _f.piece) === null || _g === void 0 ? void 0 : _g.color) != "blue" || ((_j = (_h = validMoveCellObjects[i]) === null || _h === void 0 ? void 0 : _h.piece) === null || _j === void 0 ? void 0 : _j.isAlive) == false)) {
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
            if (typeof response !== "string" && response.ok) {
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
function buildLogout() {
    if (logout_button) {
        logout_button.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            console.log("CLICKED");
            const currentUser = localStorage.getItem("currentUser");
            if (!currentUser || currentUser === "undefined") {
                alert("No user is currently logged in!");
                return;
            }
            let response = yield logout(currentUser);
            if (response.ok) {
                localStorage.setItem("currentUser", "undefined");
                localStorage.setItem("loggedIn", "false");
                alert("Logged out successfully!");
                window.location.replace("./index.html");
            }
            else {
                alert("Logout failed! Please try again.");
            }
        }));
    }
    else {
        console.error("Logout button not found!");
    }
}
function auth_login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (localStorage.getItem("currentUser") != "undefined") {
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
            return response;
        }
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
            console.error("Registration failed:", yield response.text());
            return response;
        }
        return response;
    });
}
function logout(username) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username) {
            throw new Error("Username is required for logout.");
        }
        try {
            let response = yield fetch(`${base_url}/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            });
            if (!response.ok) {
                const errorData = yield response.text();
                console.error("Logout failed:", errorData);
                throw new Error(`Logout failed with status ${response.status}`);
            }
            localStorage.setItem("currentUser", "undefined");
            localStorage.setItem("loggedIn", "false");
            const responseData = yield response.json();
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            console.error("An error occurred during logout:", error);
            throw error;
        }
    });
}
