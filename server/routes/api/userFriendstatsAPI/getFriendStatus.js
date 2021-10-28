const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const friendStatus = await client.query(`SELECT * FROM friends WHERE fromuserid = '${decoded.userId}' AND touserid = '${req.headers.friendid}'`).catch(err => {
            console.log(err);
        })

        return res.status(200).json({
            friendStatus: friendStatus,
        })

    });
});


module.exports = router;