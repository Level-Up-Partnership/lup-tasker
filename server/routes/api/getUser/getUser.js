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
        const userInfo = await client.query(`SELECT * FROM taskeruser WHERE user_id = '${decoded.userId}'`).catch(err => {
            if (err) {
                console.log(err);
            }
        });
        const singleUserInfo = userInfo.rows[0];
        return res.status(200).json({
            userInfo: singleUserInfo
        })
    });
});

module.exports = router;