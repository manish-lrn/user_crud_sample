require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000 ;

// Parse JSON bodies
app.use(bodyParser.json());

// PostgreSQL client instance
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database', err));
  
// Test API

app.get('/ping', (req,res) => {
    res.json("pong !!!");
})

// Retrieve all records from the table
app.get('/api/records', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "user"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Insert a new record into the table
app.post('/api/records', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const result = await client.query('INSERT INTO "user" (name, age, email) VALUES ($1, $2, $3) RETURNING *', [name, age, email]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing record in the table
app.put('/api/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const result = await client.query('UPDATE "user" SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *', [name, age, email, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a record from the table
app.delete('/api/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
