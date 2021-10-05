const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    req.body.token
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        console.log(req.body);
        // await client.query(`INSERT INTO tasks (taskname,category,iscomplete,focustimer,resttimer,userid) VALUES ('${req.body.taskName}','${req.body.taskCategory}',${req.body.isComplete},${req.body.focusTimer},${req.body.restTimer},'${decoded.userId}')`)

        return res.status(200).json({
            title: 'Success',
        })
    });
});


module.exports = router;