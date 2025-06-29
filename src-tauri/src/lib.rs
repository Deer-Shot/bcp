// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create pal table",
            sql: include_str!("../migrations/pal.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create breeding table",
            sql: include_str!("../migrations/breeding.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_idx_breeding_parent1_id",
            sql: "CREATE INDEX idx_breeding_parent1_id ON breeding (parent1_id);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "add_idx_breeding_parent2_id",
            sql: "CREATE INDEX idx_breeding_parent2_id ON breeding (parent2_id);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "add_idx_breeding_child_id",
            sql: "CREATE INDEX idx_breeding_child_id ON breeding (child_id);",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:bcp.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
