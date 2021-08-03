const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const dbEmail = await client.query(`SELECT email,password FROM taskeruser WHERE email = '${email}'`);
        if (!bcrypt.compareSync(req.body.password, dbEmail.rows[0].password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid password'
            });
        }
        console.log("Logged in");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;