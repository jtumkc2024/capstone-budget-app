const express = require('express');
const router = express.Router();

// Create a new project
router.post('/api/project/create', async (req, res) => {
  const { user_id, project_title, project_description, renewable, priority, deadline } = req.body;

  if (!user_id || !project_title || !deadline) {
    return res.status(400).json({ error: 'user_id, project_title, and deadline are required' });
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `INSERT INTO Project (user_id, project_title, project_description, renewable, priority, deadline) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, project_title, project_description || null, renewable || false, priority || 'Normal', deadline]
    );

    res.status(201).json({ message: 'Project created successfully', projectId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all projects
router.get('/api/project/all', async (_, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Project');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch projects by user ID
router.get('/api/project/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [rows] = await connection.query('SELECT * FROM Project WHERE user_id = ?', [user_id]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'No projects found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a project by project ID
router.put('/api/project/update/:project_id', async (req, res) => {
  const { project_id } = req.params;
  const { project_title, project_description, renewable, priority, deadline } = req.body;

  if (!project_title && !project_description && !renewable && !priority && !deadline) {
    return res.status(400).json({ error: 'At least one field to update is required' });
  }

  const updates = [];
  const values = [];

  if (project_title) {
    updates.push('project_title = ?');
    values.push(project_title);
  }
  if (project_description) {
    updates.push('project_description = ?');
    values.push(project_description);
  }
  if (renewable !== undefined) {
    updates.push('renewable = ?');
    values.push(renewable);
  }
  if (priority) {
    updates.push('priority = ?');
    values.push(priority);
  }
  if (deadline) {
    updates.push('deadline = ?');
    values.push(deadline);
  }

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query(
      `UPDATE Project SET ${updates.join(', ')} WHERE project_id = ?`,
      [...values, project_id]
    );

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Project updated successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a project by project ID
router.delete('/api/project/delete/:project_id', async (req, res) => {
  const { project_id } = req.params;

  try {
    const connection = await mysql.createConnection(databaseConfig);
    const result = await connection.query('DELETE FROM Project WHERE project_id = ?', [project_id]);

    if (result[0].affectedRows > 0) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
