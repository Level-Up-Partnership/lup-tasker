const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res, next) => {

    const adminImg = await client.query(`SELECT img_url FROM taskeruser WHERE img_url IS NOT NULL AND role_id = 1`).catch(err => {
        if (err) {
            console.log(err);
        }
    });
    return res.json(adminImg.rows[0]);
});

module.exports = router;