const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;