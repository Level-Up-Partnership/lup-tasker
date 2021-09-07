const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res, next) => {
    let token = req.headers.token;
    let route = req.headers.route;

    JWT.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const categoryPosts = await client.query(`SELECT * FROM forumpost where categoryid = ${req.headers.categoryid}`).catch(err => {
            if (err) {
                console.log(err);
            }
        })
        return res.json(categoryPosts.rows);
    });
});

module.exports = router;