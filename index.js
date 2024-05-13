require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const userController = require('./controller');

// Parse JSON bodies
app.use(bodyParser.json());
  
// Test API

app.get('/ping', (req,res) => {
    res.json(userController.ping());
})

// Retrieve all records from the table
app.get('/api/records', async (req, res) => {
  try {
    
    const result = await userController.getRecords();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching records', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Insert a new record into the table
app.post('/api/records', async (req, res) => {
  try {

    const result = await userController.createRecord(req.body);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing record in the table
app.put('/api/records/:id', async (req, res) => {
  try {
    
    const result = await userController.updateRecord(req.params,req.body);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating record', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a record from the table
app.delete('/api/records/:id', async (req, res) => {
  try {
    await userController.deleteRecord(req.params);
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
