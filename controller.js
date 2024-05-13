const { Client } = require('pg');

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


function ping() {
    return "Pong !!!";
}

// Logic for retrieving records
async function getRecords() {
    // Your implementation for retrieving records
    const result = await client.query('SELECT * FROM "user"');
    return result;
}

// Logic for creating a record
async function createRecord(body) {
    // Your implementation for creating a record
    const { name, age, email } = body;
    const result = await client.query('INSERT INTO "user" (name, age, email) VALUES ($1, $2, $3) RETURNING *', [name, age, email]);
    return result;
}

// Logic for updating a record
async function updateRecord(params,body) {
    // Your implementation for updating a record
    const { id } = params;
    const { name, age, email } = body;
    const result = await client.query('UPDATE "user" SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *', [name, age, email, id]);
    return result;
}

// Logic for deleting a record
async function deleteRecord(params) {
    // Your implementation for deleting a record
    const { id } = params;
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
    return result;
}

module.exports = {
    ping,
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord
}
  