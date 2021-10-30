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
        if (req.headers.categoryid) {

            const categoryPosts = await client.query(`SELECT  forumpost.forumpostId, forumpost.title, forumpost.description, forumpost.created_at,
            forumpost.userId, forumpost.categoryId, taskeruser.username
            FROM forumpost 
            INNER JOIN taskeruser ON forumpost.userid = taskeruser.user_Id
            WHERE categoryid = ${req.headers.categoryid}`).catch(err => {
                if (err) {
                    return res.status(403).json({
                        error: "Can't get posts, please try again",
                    })
                }
            })
            const categoryTitle = await client.query(`SELECT DISTINCT category.title
            FROM forumpost 
            INNER JOIN category ON forumpost.categoryid = category.categoryid
            WHERE category.categoryid = ${req.headers.categoryid}`);


            const userPost = {
                title: categoryTitle.rows,
                userPosts: categoryPosts.rows
            }


            return res.json(userPost);
        } else {
            const userPostData = await client.query(`SELECT forumpost.forumpostId, forumpost.title, forumpost.description, forumpost.created_at,
            forumpost.userId, forumpost.categoryId, taskeruser.username
            FROM forumpost 
            INNER JOIN taskeruser ON forumpost.userid = taskeruser.user_Id
            WHERE forumpostid = ${forumid}`).catch(err => {
                if (err) {
                    return res.status(403).json({
                        error: "Can't get posts, please try again",
                    })
                }
            })
            const userPost = {
                currentUserid: decoded.userId,
                userPostInfo: userPostData.rows
            }
            return res.json(userPost);
        }
    });
});

module.exports = router;