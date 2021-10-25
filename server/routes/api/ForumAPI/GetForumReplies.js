const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res, next) => {
    let token = req.headers.token;
    let forumid = req.headers.forumid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const userReply = await client.query(`SELECT topicreplies.topicreplyid, topicreplies.replycomment, topicreplies.created_at, topicreplies.forumpostid, topicreplies.userId, taskeruser.username
            FROM topicreplies 
            INNER JOIN taskeruser ON topicreplies.userId = taskeruser.user_Id
            WHERE forumpostId = ${forumid}
            `).catch(err => {
            if (err) {
                console.log(err);
            }
        })
        return res.json(userReply.rows);
    });
});

module.exports = router;