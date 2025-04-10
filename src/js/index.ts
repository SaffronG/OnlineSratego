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
let title: HTMLElement | null = document.getElementById("title");
// let base_url: string = "http://localhost:5244";
let base_url: string = "https://strategogameserver-4vzb9wy5.b4a.run";
let login_form = document.getElementById("login")
let register_form = document.getElementById("register")
let logout_button = document.getElementById("logout_button")

if (logout_button) buildLogout();
if (!logout_button) console.log({"Test Accounts": [
    {"username": "admin", "password": "password", "email": "admin.123@fake.com"},
    {"username": "user", "password": "1234", "email": "guest@fake.com"},
    {"username": "guest", "password": "password", "email": "guest123@fake.com"},
]});
renderLoginForm();
renderRegisterForm();
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
            cell.innerText = `${pieces[piece_index].rank}`; // for debugging purposes, show the name of the 
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

            const currentUser = localStorage.getItem("currentUser");
            if (!currentUser || currentUser === "undefined") {
                alert("No user is currently logged in!");
                return;
            }

            let response = await logout(currentUser);
            if (response.ok) {
                localStorage.setItem("currentUser", "undefined");
                localStorage.setItem("loggedIn", "false");
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
            body: JSON.stringify({ username, password, email:"" })
        });
    
        if (!response.ok) {
            console.error("Login failed:", await response.text());
            return response;
        }
    
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
        localStorage.setItem("currentUser", "undefined");
        localStorage.setItem("loggedIn", "false");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error("An error occurred during logout:", error);
        throw error;
    }
}