// The package for the web server
const express = require('express');

// Additional package for logging of HTTP requests/responses
const morgan = require('morgan');

// Added to support access to file system paths
const path = require('path');

// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Create an instance of the Express application
const app = express();

let sqlite3 = require('sqlite3').verbose();

// persistent file database "mySurveyDB".
let db = new sqlite3.Database('mySurveyDB.db');

// Define the port the server will listen to
const port = 3000;

// Add middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include logging for all HTTP requests in 'common' format
app.use(morgan('common'));

// Serve all static files under the 'public_html' directory
app.use(express.static('public_html'));

// Add root route handler
app.get('/', (req, res) => {
    res.redirect('/demo.html');
});

app.post('/submitregister', async (req, res) => {
    const { username, password } = req.body;

    try {
        // First check if username already exists
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error occurred' });
            }

            if (row) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash the password with bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            db.run('INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashedPassword],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create user' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add bcrypt encryption endpoint
app.post('/encrypt', async (req, res) => {
    const { password, costFactor } = req.body;
    
    try {
        const hashedResult = await bcrypt.hash(password, parseInt(costFactor));
        res.json({ result: hashedResult });
    } catch (error) {
        res.status(500).json({ error: 'Encryption failed' });
    }
});

// Add endpoint to get all users
app.get('/users', (req, res) => {
    db.all('SELECT username, password FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(rows);
    });
});

// Add endpoint to clear all users
app.delete('/users', (req, res) => {
    db.run('DELETE FROM users', [], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to clear users' });
        }
        res.json({});
    });
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
});