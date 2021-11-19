const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The prupose of this is to get the friend request of the user
 */
router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const friendRequests = await client.query(`SELECT username, friends.fromuserId, friends.status
        FROM friends INNER JOIN taskeruser ON (friends.fromuserId = taskeruser.user_id) 
        WHERE touserId = '${decoded.userId}' and friends.status = 2
        `).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: "Could not get friend request, please try again or refresh the page",
                })
            }
        })
        if (error === false) {

            return res.status(200).json({
                friendRequests: friendRequests.rows,
            })
        }

    });
});


module.exports = router;