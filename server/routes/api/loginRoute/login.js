const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const dbEmail = await client.query(`SELECT user_id,email,password FROM taskeruser WHERE email = '${email}'`);
        if (dbEmail.rowCount === 0) {
            return res.status(401).json({
                title: 'User does not exist',
                error: 'User does not exisit'
            })
        }
        if (!bcrypt.compareSync(req.body.password, dbEmail.rows[0].password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid password'
            });
        }
        let token = JWT.sign({ userId: dbEmail.rows[0].user_id, }, process.env.JWT_SECRET)
        return res.status(200).json({
            title: 'Logged in',
            user: dbEmail.rows[0].user_id,
            token: token
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;