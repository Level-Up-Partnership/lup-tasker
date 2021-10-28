const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt'); require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        await client.query(`UPDATE friends SET status = 1 WHERE fromuserid = '${req.body.friendId}' AND touserId = '${decoded.userId}' `)
        return res.status(200).json({
            title: "Friend Accepted",
        })
    });
});


module.exports = router;