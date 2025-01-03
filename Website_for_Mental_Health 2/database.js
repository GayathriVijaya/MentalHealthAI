const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./chat_for_change_db.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite DB:', err.message);
    } else {
        console.log('Connected to SQLite database "chat_for_change.db".');
    }
});

module.exports = db;
