const express = require('express');
const app = express();
const port = 4000;
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const mysql = require('mysql2');
const methodOverride = require("method-override");
const cors = require('cors');  // Import the CORS module
const bodyParser = require('body-parser');
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require('bcrypt');

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dailyWage',
    password: 'Ninad@8767046619',
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to database.");

    // Call updatePassword only after a successful connection
    updatePassword(2205, 'Ninad@6619');
});

async function updatePassword(userId, newPassword) {
    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // SQL query to update the password in the database
        const sql = `UPDATE users SET password = ? WHERE userId = ?`;

        // Use the correct connection variable
        connection.query(sql, [hashedPassword, userId], (err, result) => {
            if (err) throw err;
            console.log('Password updated successfully');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
