const express = require('express');
const router = express.Router();

// Create a new card in mockupbank
router.post('/api/mockupbank/create', async (req, res) => {
  const { card_number, card_owner, expiration, security_code, account_number } = req.body;

  if (!card_number || !card_owner || !expiration || !security_code || !account_number) {
    return res.status(400).json({
      error: 'card_number, card_owner, expiration, security_code, and account_number are required'
    });
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `INSERT INTO MockupBank (card_number, card_owner, expiration, security_code, account_number) 
      VALUES (?, ?, ?, ?, ?)`,
      [card_number, card_owner, expiration, security_code, account_number]
    );

    res.status(201).json({ message: 'Card added to MockupBank successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all cards in mockupbank
router.get('/api/mockupbank/all', async (_, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM MockupBank');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch a card by card number
router.get('/api/mockupbank/:card_number', async (req, res) => {
  const { card_number } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM MockupBank WHERE card_number = ?', [card_number]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Card not found in MockupBank' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a card in mockupbank by card number
router.put('/api/mockupbank/update/:card_number', async (req, res) => {
  const { card_number } = req.params;
  const { card_owner, expiration, security_code, account_number } = req.body;

  if (!card_owner && !expiration && !security_code && !account_number) {
    return res.status(400).json({ error: 'At least one field to update is required' });
  }

  const updates = [];
  const values = [];

  if (card_owner) {
    updates.push('card_owner = ?');
    values.push(card_owner);
  }
  if (expiration) {
    updates.push('expiration = ?');
    values.push(expiration);
  }
  if (security_code) {
    updates.push('security_code = ?');
    values.push(security_code);
  }
  if (account_number) {
    updates.push('account_number = ?');
    values.push(account_number);
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `UPDATE MockupBank SET ${updates.join(', ')} WHERE card_number = ?`,
      [...values, card_number]
    );

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Card updated successfully in MockupBank' });
    } else {
      res.status(404).json({ error: 'Card not found in MockupBank' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a card from mockupbank by card number
router.delete('/api/mockupbank/delete/:card_number', async (req, res) => {
  const { card_number } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query('DELETE FROM MockupBank WHERE card_number = ?', [card_number]);

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Card deleted from MockupBank successfully' });
    } else {
      res.status(404).json({ error: 'Card not found in MockupBank' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
