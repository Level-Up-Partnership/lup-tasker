const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is getting the forum replies but paginated 
 */
router.get('/', async (req, res, next) => {
    let token = req.headers.token;
    let forumid = req.headers.forumid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const userReply = await client.query(`SELECT topicreplies.topicreplyid, topicreplies.replycomment, topicreplies.created_at, topicreplies.forumpostid, topicreplies.userId, taskeruser.username
            FROM topicreplies 
            INNER JOIN taskeruser ON topicreplies.userId = taskeruser.user_Id
            WHERE forumpostId = ${forumid}  OFFSET ${req.headers.pageoffset}
            LIMIT ${req.headers.limit}
            `).catch(err => {
            if (err) {
                error = true;
                return res.status(403).json({
                    error: "Can't get posts, please try again",
                })
            }
        })
        if (error = true) {
            return res.json(userReply.rows);
        }
    });
});

module.exports = router;