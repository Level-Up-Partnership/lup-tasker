const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.post('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        console.log(req.body);
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const userTask = await client.query(`INSERT INTO friends (fromuserid, touserid) VALUES ('${decoded.userId}','${req.body.friendId}')`).catch(err => {
            console.log(err);
        })

        return res.status(200).json({
            title: 'Success',
        })

    });
});


module.exports = router;