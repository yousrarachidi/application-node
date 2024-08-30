CREATE DATABASE IF NOT EXISTS notes_manager;

USE notes_manager;

GRANT ALL PRIVILEGES ON notes_manager.* TO 'notes_user1'@'%' WITH GRANT OPTION;

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    importance INT NOT NULL CHECK (importance >= 1 AND importance <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);