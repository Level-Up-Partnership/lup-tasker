const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')

router.delete('/', async (req, res) => {
    let token = req.headers.token;
    let forumid = req.headers.forumid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })

        await client.query(`DELETE FROM topicreplies where forumpostId=${forumid}`).catch((err) => {
            if (err) {
                return res.status(403).json({
                    error: "Post can't be deleted, please try again",
                })
            }
        })
        await client.query(`DELETE FROM forumpost where forumpostId=${forumid}`)

        return res.status(200).json({
            title: 'Post has been deleted',
        })
    });
});


module.exports = router;