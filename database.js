
const Database = require("better-sqlite3");
const path = require("path");

// Skapa eller öppna databasen
const db = new Database(path.join(__dirname, "players.db"));

// Skapa tabellen om den inte redan finns
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score REAL NOT NULL DEFAULT 0
  )
`);

module.exports = db;
