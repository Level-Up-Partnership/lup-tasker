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
        let error = false;
        const friendRequestsFrom = await client.query(`SELECT username, friends.fromuserId, friends.status
        FROM friends INNER JOIN taskeruser ON (friends.fromuserId = taskeruser.user_id) 
        WHERE touserId = '${decoded.userId}' and friends.status = 1
        `).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: "Could not get friends, please try again or refresh the page",
                })
            }
        })
        const friendRequestsTo = await client.query(`SELECT username, friends.touserid, friends.status
        FROM friends INNER JOIN taskeruser ON (friends.touserid = taskeruser.user_id)  
        WHERE fromuserid =  '${decoded.userId}' AND status = 1
        `).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: "Could not get friends, please try again or refresh the page",
                })
            }
        })
        if (error === false) {
            return res.status(200).json({
                friendRequests: friendRequestsFrom.rows,
                friendRequestsTo: friendRequestsTo.rows
            })
        }

    });
});


module.exports = router;