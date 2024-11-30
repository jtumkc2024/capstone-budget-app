const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Register a new user
router.post('/api/user/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query(
      'INSERT INTO User (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all users
router.get('/api/user/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const [rows] = await connection.query('SELECT * FROM User');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch a user by username for login
router.get('/api/user/login/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const [rows] = await connection.query('SELECT * FROM User WHERE username = ?', [username]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by username
router.put('/api/user/update/:username', async (req, res) => {
  const { username } = req.params;
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: 'Password and email are required' });
  }

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query(
      'UPDATE User SET password = ?, email = ? WHERE username = ?',
      [password, email, username]
    );

    if (result[0].affectedRows > 0) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by username
router.delete('/api/user/delete/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query('DELETE FROM User WHERE username = ?', [username]);

    if (result[0].affectedRows > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
