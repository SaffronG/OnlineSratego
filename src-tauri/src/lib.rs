pub mod requests;
use requests::LoginRequest;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let ACCOUNTS: Vec<LoginRequest> = vec!(
    LoginRequest { username: "ADMIN".to_string(), password: "password".to_string() },
    LoginRequest { username: "USER".to_string(), password: "password".to_string() },
  );  // TEST VALUES FOR ASYNC REQUESTS

  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

