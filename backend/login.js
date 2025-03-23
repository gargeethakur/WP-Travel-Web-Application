require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "M4fuyuxyz";

app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
        return;
    }
    console.log("✅ MySQL Connected Successfully!");
});

module.exports = db;

// User Signup (Register)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(insertQuery, [email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error registering user', error: err });
            res.json({ message: 'User registered successfully' });
        });
    });
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


