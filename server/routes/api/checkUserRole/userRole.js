const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to check whether the user is an admin or not
 */
router.get('/', (req, res, next) => {
    let token = req.headers.token;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        return res.status(200).json({
            userRole: decoded.roleId
        })
    });
});

module.exports = router;