const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        //Creates orginial Task, VALUES are determined 
        //When user starts Task, hold the amount of times the pomodoro timer is pressed, so if its 2 cycles, 3 million miliseconds. when the user clicks done,
        //EVERYTIME the user presses "Start timer" a total timer will run along the regular pomodoro timer that will be used to add the totalFocusTimer, that will be
        // the Main focus timer. If the user stops at a certain point it will get that amount in miliseconds.
        const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}'`).catch(err => {
            console.log(err);
        })
        return res.status(200).json({
            userTask: userTask.rows
        })
    });
});


module.exports = router;