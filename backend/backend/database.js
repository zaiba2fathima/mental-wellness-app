const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./entries.db'); // adjust path if needed

db.run("ALTER TABLE entries ADD COLUMN date TEXT", (err) => {
    if (err) {
        console.log("Column probably already exists:", err.message);
    } else {
        console.log("✅ Date column added successfully");
    }
});

db.close();
