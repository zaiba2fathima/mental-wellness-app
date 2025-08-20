const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'journal.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('❌ Failed to connect to DB', err);
    else console.log('✅ Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mood TEXT,
        text TEXT,
        date TEXT
    )`);
});

module.exports = db;
