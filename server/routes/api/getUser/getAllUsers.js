const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')
/**
 * The purpose of this is to get all users, used for searching for a user
 */
router.get('/', async (req, res, next) => {
    let token = req.headers.token;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const userInfo = await client.query(`SELECT user_id, username FROM taskeruser`).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: "Can't get Users, please try again or contact the owner of the page"
                })
            }
        });
        if (error === false) {

            return res.status(200).json({
                userInfo: userInfo.rows
            })
        }
    });
});

module.exports = router;