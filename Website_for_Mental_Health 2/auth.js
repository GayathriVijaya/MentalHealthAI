const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5500' 
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'frontend')));

const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('Could not connect to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.configure('busyTimeout', 5000); 
db.run("PRAGMA journal_mode = WAL;"); 

function insertContactForm(data, callback) {
    const query = 'INSERT INTO contact (Name, Email, Phone, Reason, Message) VALUES (?, ?, ?, ?, ?)';
    const params = [data.name, data.email, data.phone || null, data.reason, data.message];

    let retries = 5; 

    function attempt() {
        db.run(query, params, function (err) {
            if (err && err.code === 'SQLITE_BUSY' && retries > 0) {
                retries--;
                console.warn('Database is busy, retrying...');
                setTimeout(attempt, 100); 
            } else if (err) {
                console.error('Failed to submit contact form:', err.message);
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    attempt();
}

app.post('/submit-contact', (req, res) => {
    const { name, email, phone, reason, message } = req.body;

    console.log('Contact form submission:', { name, email, phone, reason, message });

    insertContactForm(req.body, (err) => {
        if (err) {
            return res.status(500).send('Failed to submit contact form. Please try again.');
        }
        return res.send('Thank you for your message! We will get back to you soon.');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
