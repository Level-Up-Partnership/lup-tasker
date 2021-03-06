const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to get the friends stats hours by month
 */

router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let tasksByMonth = []
        let error = false;
        for (let index = 0; index < 12; index++) {
            const last1Day = await client.query(`
            SELECT *
            FROM tasks
            WHERE EXTRACT(MONTH FROM update_at) = ${index + 1} and userid = '${req.headers.userid}' and isComplete = true; `).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get tasks hours by month, please refresh the page",
                    })
                }
            })
            tasksByMonth.push(last1Day.rows)
        }
        if (error === false) {
            return res.status(200).json({
                tasksByMonth: tasksByMonth,
            })
        }
    });
});


module.exports = router;