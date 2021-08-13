const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.post('/', async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const userId = req.body.userId;
        const currentPassword = req.body.currentPassword;

        const userPassword = await client.query(`SELECT password FROM taskeruser WHERE user_id = ${userId}`);

        const match = await bcrypt.compare(currentPassword, userPassword.rows[0].password);
        if (match) {
            const password = bcrypt.hashSync(newPassword, 10);
            const newUserPassword = await client.query(`UPDATE taskeruser SET password = '${password}' WHERE user_id = ${userId}`);
        } else {
            return res.status(401).json({
                error: "Passwords Don't Match. Please Try Again."
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;