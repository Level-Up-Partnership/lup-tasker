const express = require('express');
const user = require('./routes/api/user');
const { Client } = require('pg');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const client = new Client({
    connectionString: process.env.CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

app.get('/users/', async (req, res) => {
    try {
        const foundID = await client.query(`SELECT * FROM TaskerUser`)
        res.json(foundID.rows);
    } catch (error) {
        console.log(error);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body
        const newUser = await client.query(`INSERT INTO taskeruser (username,password,email) VALUES ('${username}','${password}','${email}') RETURNING *`);
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${5000}`));