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
        const friendRequests = await client.query(`SELECT username, friends.fromuserId, friends.status
        FROM friends INNER JOIN taskeruser ON (friends.fromuserId = taskeruser.user_id) 
        WHERE touserId = '${decoded.userId}' and friends.status = 1
        `).catch(err => {
            console.log(err);
        })
        return res.status(200).json({
            friendRequests: friendRequests.rows,
        })

    });
});


module.exports = router;