use reqwest;
use tauri::{http::request, AppHandle, Emitter};

pub const BASE_URL: &str  = "http://localhost:7777"; // Example base URL for API requests

use serde::Serialize;

#[derive(Serialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[tauri::command]
async fn auth_login(app_handle: AppHandle, user: String, pass: String) -> Result<reqwest::Response, reqwest::Error> {
    let client = reqwest::Client::new();
    let url = format!("{}/login", BASE_URL);

    let response = client.post(&url) 
        .send()
        .await;

    response
}