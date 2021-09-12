const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
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
                    console.log(err);
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
            const userPost = await client.query(`SELECT * FROM forumpost where forumpostId = ${forumid}`).catch(err => {
                if (err) {
                    console.log(err);
                }
            })
            return res.json(userPost.rows);
        }
    });
});

module.exports = router;