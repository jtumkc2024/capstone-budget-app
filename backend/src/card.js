const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Create a new card
router.post('/api/card/create', async (req, res) => {
  const { user_id, card_number } = req.body;

  if (!user_id || !card_number) {
    return res.status(400).json({ error: 'user_id and card_number are required' });
  }

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query(
      `INSERT INTO Card (user_id, card_number) VALUES (?, ?)`,
      [user_id, card_number]
    );

    res.status(201).json({ message: 'Card created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all cards
router.get('/api/card/all', async (req, res) => {
  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Card');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch cards by user ID
router.get('/api/card/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Card WHERE user_id = ?', [user_id]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'No cards found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a card by user ID and card number
router.put('/api/card/update/:user_id/:card_number', async (req, res) => {
  const { user_id, card_number } = req.params;
  const { new_card_number } = req.body;

  if (!new_card_number) {
    return res.status(400).json({ error: 'new_card_number is required' });
  }

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query(
      `UPDATE Card SET card_number = ? WHERE user_id = ? AND card_number = ?`,
      [new_card_number, user_id, card_number]
    );

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Card updated successfully' });
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a card by user ID and card number
router.delete('/api/card/delete/:user_id/:card_number', async (req, res) => {
  const { user_id, card_number } = req.params;

  try {
    const connection = await mysql.createConnection(req.app.locals.databaseConfig);
    const result = await connection.query('DELETE FROM Card WHERE user_id = ? AND card_number = ?', [user_id, card_number]);

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Card deleted successfully' });
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
