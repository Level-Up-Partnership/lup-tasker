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
        let error = false;

        const userInfo = await client.query(`SELECT SUM(totalfocusTimer + ${req.body.totalFocusTime}) as totalfocusTimer, 
        SUM(totalrestTimer + ${req.body.totalRestTime}) as totalrestTimer
        FROM tasks
        WHERE taskid = '${req.body.taskid}'
        GROUP BY totalfocusTimer, totalrestTimer`).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: 'Could not update task please try again',
                })
            }
        })
        var userFocusTimer = userInfo.rows[0].totalfocustimer;
        var userRestTimer = userInfo.rows[0].totalresttimer;

        await client.query(`UPDATE tasks SET totalfocustimer = ${userFocusTimer}, totalRestTimer = ${userRestTimer} WHERE taskid = '${req.body.taskid}'`)
        const totalTimer = await client.query(`SELECT SUM(totalfocusTimer + totalrestTimer) as totaltimer 
        FROM tasks
        WHERE taskid ='${req.body.taskid}'`).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: 'Could not update task please try again',
                })
            }
        })
        const totalUserTime = totalTimer.rows[0].totaltimer;
        await client.query(`UPDATE tasks SET totaltimer = ${totalUserTime} WHERE taskid = '${req.body.taskid}'`).catch(err => {
            if (err) {
                error = true;
                return res.status(400).json({
                    error: 'Could not update task please try again',
                })
            }
        })
        if (error === false) {
            var info = userInfo.rows;
            return res.status(200).json({
                info,
            })
        }
    });
});


module.exports = router;