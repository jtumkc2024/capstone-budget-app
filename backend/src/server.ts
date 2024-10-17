import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const dbConfig = {
  host: '192.168.215.2',
  port: 3306,
  user: 'root',
  password: '1234qwerASDF',
  database: 'sys'
};

app.get('/api/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM User');
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint to get the total number of users
app.get('/api/users/count', async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows]: any = await connection.query('SELECT COUNT(*) AS total_users FROM User');
      res.json(rows[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});