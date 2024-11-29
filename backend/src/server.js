const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Import route modules
const userRoutes = require('./user'); // Adjust the path if necessary
const projectRoutes = require('./project'); // Adjust the path if necessary
const cardRoutes = require('./card'); // Adjust the path if necessary
const mockupBankRoutes = require('./mockupbank'); // Adjust the path if necessary

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const databaseConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'xxxxxxxx',
  database: 'commerce-bank-db'
};

// Attach databaseConfig to app for shared use in route files
app.locals.databaseConfig = databaseConfig;

// Use the imported route modules
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', cardRoutes);
app.use('/', mockupBankRoutes);

// Example additional routes already present
app.get('/api/users', async (_, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM User');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/count', async (req, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT COUNT(*) AS total_users FROM User');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Project p WHERE p.user_id = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
