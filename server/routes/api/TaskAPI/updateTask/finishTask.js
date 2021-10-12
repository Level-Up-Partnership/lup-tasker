const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    JWT.verify(req.body.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        await client.query(`UPDATE tasks set iscomplete = ${req.body.headers.isComplete} where taskid = '${req.body.headers.taskid}'`)
        return res.status(200).json({
            message: "ok",
        })
    });
});


module.exports = router;