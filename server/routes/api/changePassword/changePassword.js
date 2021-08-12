const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.post('/', async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        console.log(newPassword);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;