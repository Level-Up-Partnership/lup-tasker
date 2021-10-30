const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')

router.delete('/', async (req, res) => {
    let token = req.headers.token;
    let topicreplyid = req.headers.topicreplyid;
    console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        console.log(topicreplyid);
        // await client.query(`DELETE FROM topicreplies where forumpostId=${forumid}`).catch((err) => {
        //     if (err) {
        //         return res.status(403).json({
        //             error: "Post can't be deleted, please try again",
        //         })
        //     }
        // })

        return res.status(200).json({
            title: 'Post has been deleted',
        })
    });
});


module.exports = router;