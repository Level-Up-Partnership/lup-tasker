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

        const finishedTask = await client.query(`UPDATE tasks set iscomplete = ${req.body.isComplete} where taskid = ${req.body.taskid}`)
        console.log(finishedTask.rows);
        // return res.status(200).json({
        //     isComplete: true,
        // })

    });
});


module.exports = router;