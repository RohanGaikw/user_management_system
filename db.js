const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Replace with your MySQL username
    password: 'admin123', // Replace with your MySQL password
    database: 'signup'        // The database you just created
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = db;
