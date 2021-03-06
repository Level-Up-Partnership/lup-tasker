const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is creating a post in a forum category
 */
router.post('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        if (req.body.category) {

            const description = req.body.description;
            const descriptionSingleQuotes = description.replace(/'/g, "''");
            const userPost = await client.query(`INSERT INTO forumpost (title,description,userid,categoryid) VALUES 
            ('${req.body.title}','${descriptionSingleQuotes}','${decoded.userId}','${req.body.category}')`).catch(err => {
                if (err) {
                    return res.status(401).json({
                        error: "Can't create post, please try again",
                    })
                }
            });
            return res.status(200).json({
                title: 'Success',
                userPost: userPost
            })
        } else {
            const forumid = req.body.forumid
            const replycomment = req.body.replycomment;
            const replyCommentSingleQuotes = replycomment.replace(/'/g, "''");
            const userPost = await client.query(`INSERT INTO topicreplies (replycomment,forumpostid,userid) VALUES 
            ('${replyCommentSingleQuotes}','${forumid}','${decoded.userId}')`).catch(err => {
                if (err) {
                    return res.status(401).json({
                        error: "Can't create post, please try again",
                    })
                }
            });
            return res.status(200).json({
                title: 'Success',
                userPost: userPost
            })
        }
    });
});


module.exports = router;