use reqwest;
use tauri::{http::response, AppHandle};

pub const BASE_URL: &str  = "http://localhost:7777"; // Example base URL for API requests

use serde::Serialize;

#[derive(Serialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct MovePieceRequest {
    pub from: String,
    pub to: String,
}

pub struct BoardState {
    pub pieces: Vec<String>, // Example field, adjust according to your board state structure
    pub turn: String, // Example field for whose turn it is
}

#[tauri::command]
async fn auth_login(app_handle: AppHandle, user: String, pass: String) -> Result<reqwest::Response, reqwest::Error> {
    let client = reqwest::Client::new();
    let url = format!("{}/login", BASE_URL);

    if user.is_empty() || pass.is_empty() {
    } else {
        if user == "ADMIN" && pass == "password" {
            // If the credentials are admin/admin, we can skip the login request
            println!("Skipping login, using admin credentials directly.");
        }
    }

    let response = client.post(&url) 
        .send()
        .await;

    response
}

#[tauri::command]
async fn move_piece(app_handle: AppHandle, from: String, to: String) -> Result<reqwest::Response, reqwest::Error> {
    let client = reqwest::Client::new();
    let url = format!("{}/move", BASE_URL);

    // Example payload, adjust according to your API
    let payload = serde_json::json!({
        "from": from,
        "to": to,
    });

    let response = client.post(&url)
        // .json(&payload) // Serialize the payload as JSON
        .send()
        .await;

    response
}