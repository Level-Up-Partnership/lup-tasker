const { Client } = require('pg');
require('dotenv').config();
/**
 * The purpose of this for seting up the database url from heroku with PG package
 */
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;