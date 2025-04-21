class piece {
    name: string;
    rank: number;
    movement: number;
    isAlive: boolean;
    image: string;
    row: number;
    col: string;
    color: string;
    id: number;

    constructor(name: string, rank: number, movement: number, isAlive: boolean, image: string, row: number, col: string, color: string, id: number) {
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

    validMoves(): string[] {
        let validmoves: string[] = [];
        if (this.rank === 2) {

        }
        else {

        }
        return [""]; // implement later
    }
    move(): boolean {
        return false; // implement later
    }
};

class cell {
    row: number; // 0 - 9
    col: ColEnum; // a - j
    isWater: boolean;
    piece: piece | null;
    element: HTMLDivElement;

    constructor(row: number, col: ColEnum, isWater: boolean = false, piece: piece | null = null, element: HTMLDivElement = document.createElement("div")) {
        this.row = row;
        this.col = col;
        this.isWater = isWater;
        this.piece = piece;
        this.element = element;
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
let currentCell: cell | null = null;
let board: HTMLElement | null = document.getElementById("game_board");
let title: HTMLElement | null = document.getElementById("title");
let box: HTMLElement | null = document.getElementById("box");
let cells: HTMLElement[] | null = [];
let cellsObject: cell[] = [];

var currentUser: any | null = null;
// let base_url: string = "http://localhost:5244";
let base_url: string = "https://strategogameserver-4vzb9wy5.b4a.run";
let login_form = document.getElementById("login")
let register_form = document.getElementById("register")
let logout_button = document.getElementById("logout_button")

if (logout_button) buildLogout();
if (!logout_button) console.log({
    "Test Accounts": [
        { "username": "admin", "password": "password", "email": "admin.123@fake.com" },
        { "username": "user", "password": "1234", "email": "guest@fake.com" },
        { "username": "guest", "password": "password", "email": "guest123@fake.com" },
    ]
});
renderLoginForm();
renderRegisterForm();
let RedPieces: piece[] = [
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
]

let BluePieces: piece[] = [
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
]

// INITAILIZE THE BOARD VISUALLY
buildEventListener();
buildBoard(board)
getGames()
findGame();

function buildBoard(board: HTMLElement | null) {
    let piece_index: number = 0;
    for (let i = 0; i < 100; i++) {
        let HTMLcell: HTMLDivElement = document.createElement("div");
        let row = Math.floor(i / 10);
        let col = i % 10 as ColEnum;
        let isWater = false;
        let piece = null;
        HTMLcell.className = "cell";
        board?.appendChild(HTMLcell);
        if (piece_index < BluePieces.length) {
            piece = BluePieces[piece_index];
            HTMLcell.className = "cell";
            HTMLcell.innerText = `${piece.rank} (ID: ${piece.id})`; // for debugging purposes, show the name of the piece in the cell
            HTMLcell.innerHTML = `<img src="${BluePieces[piece_index].image}" alt="${BluePieces[piece_index].name}">`;
            board?.appendChild(HTMLcell);
            piece_index++;
            HTMLcell.style.fontSize = "8px"; // make the text smaller to fit in the cell
        }

        if (i > 40 && i < 60) {
            let loc = i % 10
            if (loc == 2 || loc == 3 || loc == 6 || loc == 7) {
                HTMLcell.className = "cell_water"
                isWater = true;

            }
            else {
                HTMLcell.addEventListener("click", (e) => {
                    if (HTMLcell == currentCell?.element) {
                        HTMLcell.classList.toggle("active");
                        cells?.forEach(cell => cell.classList.remove("valid_move"));
                    }
                    else {
                        HTMLcell.classList.toggle("active");
                        cells?.forEach((cell) => {
                            cell.classList.remove("active");
                            cell.classList.remove("valid_move");
                        });
                        if(HTMLcell.classList.contains("valid_move"))
                        {   
                            let oldCell = currentCell;
                            let index = -1;
                            let row = -1;
                            let col = -1;
                            for(let i = 0; i < cells?.length!; i++)
                            {
                                if(cells && cells[i] == HTMLcell)
                                {
                                    index = i;
                                    row = Math.floor(i / 10);
                                    col = i % 10 as ColEnum;
                                }
                            }
                            await sendMove(Number(localStorage.getItem("lobbyId")), row, col, null);

                            const newCell = cellsObject[index];

                            if(newCell.piece)
                            {
                                newCell.piece.row = row;
                                newCell.piece.col = String(col);
                            }

                            if(oldCell)
                            {
                                oldCell.piece = null;
                            }
                        }
                    }
                })
            }
        }
        else {
            HTMLcell.addEventListener("click", function () {
                if (HTMLcell == currentCell?.element) {
                    HTMLcell.classList.remove("active");
                    cells?.forEach(e => e.classList.remove("valid_move"));

                }
                else {

                    cells?.forEach(e => e.classList.remove("active"));
                    cells?.forEach(e => e.classList.remove("valid_move"));
                    cellsObject.forEach(e => {
                        if (e.element == HTMLcell) {
                            currentCell = e;
                            showMoves();
                        }
                    });
                    HTMLcell.classList.toggle("active");
                }
            })
        }
        cellsObject.push(new cell(row, col, isWater, piece, HTMLcell));
        cells?.push(HTMLcell);
    }
}

function showMoves() {
    let ranIntoWaterDown = false;
    let ranIntoWaterUp = false;
    let ranIntoWaterRight = false;
    let ranIntoWaterLeft = false;
    // for blue pieces
    if (currentCell?.piece?.color == "blue" && currentCell.piece.isAlive == true && currentCell.piece.rank != -2 && currentCell.piece.rank != -1) {
        let validMoveCells: HTMLElement[] = [];
        let validMoveCellObjects: cell[] = [];
        if (currentCell.piece.rank != 2) {

            for (let i = 0; i < cells?.length!; i++) {
                if (cells?.length! > 0) {
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

                if (validMoveCells[i] != null && validMoveCellObjects[i].isWater == false && ((validMoveCellObjects[i]?.piece?.color != "blue"))) {
                    (validMoveCells[i] as HTMLElement).classList.add("valid_move");
                }
            }
        }
        else if (currentCell.piece.rank == 2) {
            for (let i = 0; i < cells?.length!; i++) {
                if (cells && cells[i] == currentCell?.element) {
                    for (let j = 1; j <= 10; j++) {
                        //Can move down
                        if(i+(j * 10) <= cellsObject.length && (i+(j*10)) >= 0)
                        {

                            if (cellsObject[i + (j * 10)].col == currentCell.col) {
                                if(cellsObject[i + (j * 10)].isWater == true)
                                {
                                    ranIntoWaterDown = true;
                                }
                                if(!ranIntoWaterDown)
                                {
                                    validMoveCellObjects.push(cellsObject[i + (j * 10)]);
                                    validMoveCells.push(cells[i + (j * 10)]);
                                }
                            }
                        }
                        //Can move right
                        if((i + j) <= cellsObject.length && (i+j) >= 0)
                        {

                            if (cellsObject[i + (j)].row == currentCell.row) {
                                if(cellsObject[i + (j)].isWater == true)
                                {
                                    ranIntoWaterRight = true;
                                }
                                if(!ranIntoWaterRight)
                                {
                                    validMoveCellObjects.push(cellsObject[i + (j)]);
                                    validMoveCells.push(cells[i + (j)]);
                                }
                            }
                        }
                            
                        // Can move left
                        if((i-j) <= cellsObject.length && (i-j) >= 0)
                        {

                            if (cellsObject[i - (j)].row == currentCell.row) {
                                if(cellsObject[i - (j)].isWater)
                                {
                                    ranIntoWaterLeft = true;
                                }
                                if(!ranIntoWaterLeft)
                                {
                                    validMoveCellObjects.push(cellsObject[i - (j)]);
                                    validMoveCells.push(cells[i - (j)]);
                                }
                            }
                        }
                        
                        //Can move up
                        if((i-(j *10)) <= cellsObject.length && (i-(j*10) >= 0))
                        {

                            if (cellsObject[i - (j * 10)].col == currentCell.col) {
                                if(cellsObject[i - (j * 10)].isWater)
                                {
                                    ranIntoWaterUp = true;
                                }
                                if(!ranIntoWaterUp)
                                {
                                    validMoveCellObjects.push(cellsObject[i - (j * 10)]);
                                    validMoveCells.push(cells[i - (j * 10)]);
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < validMoveCells.length; i++) {
                if (validMoveCells[i] != null && (validMoveCellObjects[i]?.piece?.color != "blue" || validMoveCellObjects[i]?.piece?.isAlive == false)) {
                    (validMoveCells[i] as HTMLElement).classList.add("valid_move");
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
            e.preventDefault()
            let response = await auth_login(usernameInput.value, passwordInput.value);
            console.log(response)
            if (typeof response !== "string" && response.ok) {
                localStorage.setItem("currentUser", usernameInput.value)
                localStorage.setItem("loggedIn", "true")
                window.location.replace("./index.html")
            } else {
                alert("Invalid login! Please try again!")
            }
        })

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
            e.preventDefault()
            let response = await register(usernameInput.value, passwordInput.value, emailInput.value)
            console.log(response)
            window.location.replace("./index.html")
        });

        register_form.appendChild(registerButton);
    }
}

function buildLogout() {
    if (logout_button) {
        logout_button.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("CLICKED");

            let currentUser = localStorage.getItem("currentUser");
            if (!currentUser || currentUser === "undefined") {
                alert("No user is currently logged in!");
                return;
            }

            let response = await logout(currentUser);
            if (response.ok) {
                localStorage.setItem("currentUser", "undefined");
                localStorage.setItem("loggedIn", "false");
                currentUser = null;
                alert("Logged out successfully!");
                window.location.replace("./index.html");
            } else {
                alert("Logout failed! Please try again.");
            }
        });
    } else {
        console.error("Logout button not found!");
    }
}

function buildEventListener()
{
    box?.addEventListener("click", async (e) => {
        e.preventDefault()
        let game = await findGame();
    })
}

async function auth_login(username: string, password: string) {
    if (localStorage.getItem("currentUser") != "undefined") {
        alert("User already logged in!");
        return "User already logged in!"
    }
    else {
        let response: Response = await fetch(`${base_url}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email: "" })
        });

        if (!response.ok) {
            console.error("Login failed:", await response.text());
            return response;
        }
        currentUser = response;
        console.log(response);
        alert("Login successful!");
        return response;
    }
}

async function register(username: string, password: string, email: string) {
    let response: Response = await fetch(`${base_url}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, email })
    });

    if (!response.ok) {
        console.error("Registration failed:", await response.text());
        return response;
    }

    return response;
}

async function logout(username: string | null) {
    if (!username) {
        throw new Error("Username is required for logout.");
    }

    try {
        let response: Response = await fetch(`${base_url}/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Logout failed:", errorData);
            throw new Error(`Logout failed with status ${response.status}`);
        }
        alert("Logged out successfully!")
        localStorage.setItem("currentUser", "undefined");
        localStorage.setItem("loggedIn", "false");
        const responseData = await response.json();
        return new Error(responseData);
    } catch (error) {
        console.error("An error occurred during logout:", error);
        throw error;
    }
}

async function getGames() {
    let response = await fetch(`${base_url}/api/game/getGames`)

    return await response.json();
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username }), // Fixed: Stringify the body
    });

    if (!response.ok) {
        console.log(await response.json())
        throw new Error("Failed to find game!");
    }

    let res = await response.json();
    console.log(res);
    return res;
}