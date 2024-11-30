const express = require('express');
const router = express.Router();

// Register a new user
router.post('/api/user/register', async (req, res) => {
  const { username, password, email, profile_picture } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'username, password, and email are required' });
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `INSERT INTO User (username, password, email, profile_picture) 
      VALUES (?, ?, ?, ?)`,
      [username, password, email, profile_picture || null]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all users
router.get('/api/user/all', async (_, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT user_id, username, email, profile_picture FROM User');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch a user by username
router.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT user_id, username, email, profile_picture FROM User WHERE username = ?', [username]);

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
  const { password, email, profile_picture } = req.body;

  if (!password && !email && !profile_picture) {
    return res.status(400).json({ error: 'At least one field (password, email, profile_picture) is required to update' });
  }

  const updates = [];
  const values = [];

  if (password) {
    updates.push('password = ?');
    values.push(password);
  }
  if (email) {
    updates.push('email = ?');
    values.push(email);
  }
  if (profile_picture) {
    updates.push('profile_picture = ?');
    values.push(profile_picture);
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `UPDATE User SET ${updates.join(', ')} WHERE username = ?`,
      [...values, username]
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
    const connection = await mysql.createConnection(databaseConfig);
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
