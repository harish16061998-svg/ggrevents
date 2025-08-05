const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to receive requests
app.post('/api/requests', (req, res) => {
  const { firstName, lastName, email, phone, serviceType, startDate, endDate, requirements } = req.body;

  if (!firstName || !lastName || !email || !phone || !serviceType || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `INSERT INTO requests 
    (first_name, last_name, email, phone, service_type, start_date, end_date, requirements) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [firstName, lastName, email, phone, serviceType, startDate, endDate, requirements || ''];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting request:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Request saved successfully', requestId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
