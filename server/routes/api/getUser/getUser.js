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
        try {
            let error = true;
            const userInfo = await client.query(`SELECT * FROM taskeruser WHERE user_id = '${req.headers.userid}'`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Can't get User, please try again or contact the owner of the page"
                    })
                }
            });
            const singleUserInfo = userInfo.rows[0];
            if (error === false) {
                return res.status(200).json({
                    userInfo: singleUserInfo
                })
            }

        } catch (error) {
            console.log("yeet");
        }
    });
});

module.exports = router;