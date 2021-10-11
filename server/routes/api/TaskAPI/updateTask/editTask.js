const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    req.body.token
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        console.log(req.body);
        const userInfo = await client.query(`UPDATE tasks SET taskname = '${req.body.newTaskName}', category = '${req.body.newTaskCategory}',
        focustimer = ${req.body.newFocusTimer}, resttimer = ${req.body.newRestTimer} where taskid = ${req.body.taskId}`)
        return res.status(200).json({
            title: "success",
        })
    });
});


module.exports = router;