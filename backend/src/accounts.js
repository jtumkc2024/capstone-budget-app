const express = require('express');
const router = express.Router();

// Create a new transaction
router.post('/api/accounts/transaction', async (req, res) => {
  const { account_number, transaction_amount, transaction_type, transaction_date } = req.body;

  if (!account_number || !transaction_amount || !transaction_type || !transaction_date) {
    return res.status(400).json({
      error: 'account_number, transaction_amount, transaction_type, and transaction_date are required'
    });
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `INSERT INTO Accounts (account_number, transaction_amount, transaction_type, transaction_date) 
      VALUES (?, ?, ?, ?)`,
      [account_number, transaction_amount, transaction_type, transaction_date]
    );

    res.status(201).json({ message: 'Transaction recorded successfully', transactionId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all transactions
router.get('/api/accounts/transactions', async (_, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Accounts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch transactions by account number
router.get('/api/accounts/:account_number', async (req, res) => {
  const { account_number } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Accounts WHERE account_number = ?', [account_number]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'No transactions found for this account' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by ID
router.put('/api/accounts/update/:id', async (req, res) => {
  const { id } = req.params;
  const { transaction_amount, transaction_type, transaction_date } = req.body;

  if (!transaction_amount && !transaction_type && !transaction_date) {
    return res.status(400).json({ error: 'At least one field to update is required' });
  }

  const updates = [];
  const values = [];

  if (transaction_amount) {
    updates.push('transaction_amount = ?');
    values.push(transaction_amount);
  }
  if (transaction_type) {
    updates.push('transaction_type = ?');
    values.push(transaction_type);
  }
  if (transaction_date) {
    updates.push('transaction_date = ?');
    values.push(transaction_date);
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `UPDATE Accounts SET ${updates.join(', ')} WHERE id = ?`,
      [...values, id]
    );

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Transaction updated successfully' });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction by ID
router.delete('/api/accounts/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query('DELETE FROM Accounts WHERE id = ?', [id]);

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
