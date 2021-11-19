const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')
/**
 * The purpose of this is to delete a forum reply that the user wants to delete
 */
router.delete('/', async (req, res) => {
    let token = req.headers.token;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        await client.query(`DELETE FROM topicreplies WHERE userid = '${decoded.userId}' and topicreplyid = ${req.headers.topicreplyids}`).catch(err => {
            if (err) {
                error = true;
                return res.status(403).json({
                    error: "Reply can't be deleted, please try again",
                })
            }
        })

        if (error === false) {
            return res.status(200).json({
                title: 'Post has been deleted',
            })
        }
    });
});


module.exports = router;