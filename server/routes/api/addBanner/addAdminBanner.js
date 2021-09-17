const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        await client.query(`UPDATE taskeruser
        SET Img_url = null`).catch(err => {
            if (err) {
                console.log(err);
            }
        });
        await client.query(`UPDATE taskeruser
        SET Img_url = '${req.body.bannerURL}'
        WHERE user_id = '${decoded.userId}'`).catch(err => {
            if (err) {
                console.log(err);
            }
        });
        return res.status(200).json({
            title: 'Category has been Created!!',
        })
    });
});

module.exports = router;