const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


/**
 * The purpose of this is to get friends with the user relation if they're friends or awating response
 */
router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const friendStatus = await client.query(`SELECT * FROM friends WHERE fromuserid = '${decoded.userId}' AND touserid = '${req.headers.friendid}' 
        OR fromuserid = '${req.headers.friendid}' AND touserid = '${decoded.userId}'`).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: "Could not get friend status please refresh the page",
                })
            }
        })
        if (error === false) {

            return res.status(200).json({
                friendStatus: friendStatus.rows,
            })
        }

    });
});


module.exports = router;