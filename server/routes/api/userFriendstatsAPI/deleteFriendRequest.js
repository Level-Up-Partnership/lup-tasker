const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')

router.delete('/', async (req, res) => {
    let token = req.headers.token;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        if (req.headers.touser) {
            await client.query(`DELETE FROM friends WHERE touserId = '${req.headers.friendid}' AND fromuserid = '${decoded.userId}' `).catch(err => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not delete friends, please try again or refresh the page",
                    })
                }
            })
        } else {
            await client.query(`DELETE FROM friends WHERE fromuserid = '${req.headers.friendid}' AND touserId = '${decoded.userId}' `).catch(err => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not delete friends, please try again or refresh the page",
                    })
                }
            })
        }


        return res.status(200).json({
            title: 'Post has been deleted',
        })
    });
});


module.exports = router;