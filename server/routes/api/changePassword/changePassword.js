const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to let the user change their password, the current password has to match the one in the DB and if they match, only then
 * can the user change the password
 */
router.post('/', async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const token = req.body.token;
        const currentPassword = req.body.currentPassword;

        JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({
                title: 'unauthroized'
            })

            const userPassword = await client.query(`SELECT password FROM taskeruser WHERE user_id = '${decoded.userId}'`);

            const match = await bcrypt.compare(currentPassword, userPassword.rows[0].password);
            if (match) {
                const password = bcrypt.hashSync(newPassword, 10);
                const newUserPassword = await client.query(`UPDATE taskeruser SET password = '${password}' WHERE user_id = '${decoded.userId}'`);
                return res.status(200).json({
                    success: "Password has been changed"
                });
            } else {
                return res.status(401).json({
                    error: "Passwords Don't Match. Please Try Again."
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;