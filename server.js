const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors({
  orgin: '*'
}));

// Opret en databasepool
const pool = new Pool({
  user: 'bssuxilu',
  host: 'horton.db.elephantsql.com',
  database: 'bssuxilu',
  password: 'OQ1PJt6-3Ici0A7nQkyMse5pNI2p7QXz',
  port: 5432,
});

//Mappen serveren finder de statiske filer i 
app.use(express.static(__dirname));

// Hent data fra databasen og send det som JSON
app.get('/electricity_rates', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM electricity_rates');
    const rows = result.rows;
    client.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Start serveren
app.listen(port, () => {
  console.log(`Appen kører på http://localhost:${port}`);
});