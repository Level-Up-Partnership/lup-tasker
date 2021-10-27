const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res, next) => {
    let token = req.headers.token;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const userInfo = await client.query(`SELECT user_id, username FROM taskeruser`).catch(err => {
            if (err) {
                console.log(err);
            }
        });
        return res.status(200).json({
            userInfo: userInfo.rows
        })
    });
});

module.exports = router;