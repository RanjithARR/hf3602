const express = require('express');
const cors = require('cors');  // Import the CORS package
const mysql = require('mysql2');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Enable CORS for the GitHub Pages frontend
app.use(cors({
    origin: 'https://ranjitharr.github.io','https://8db8-2405-201-e014-30a1-2c2d-119a-118b-454.ngrok-free.app' // Replace with your GitHub Pages URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const db = mysql.createConnection({
    host: 'localhost',   // Your MySQL host
    port: '3307',
    user: 'hftest',   // Your MySQL username
    password: 'hf@12test',   // Your MySQL password
    database: 'hf360',  // Your MySQL database
    
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});


// Example POST route for registration
app.post('/register', (req, res) => {
    const { name, email, country, package } = req.body;
    const sql = 'INSERT INTO users (name, email, country, package) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, country, package], (err, result) => {
        if (err) {
            res.status(500).send('Error saving the data');
            return;
        }
        res.send('We will get back to you with more details shortly');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
