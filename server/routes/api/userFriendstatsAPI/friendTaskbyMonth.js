const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let tasksByMonth = []
        for (let index = 0; index < 12; index++) {
            const last1Day = await client.query(`
            SELECT *
            FROM tasks
            WHERE EXTRACT(MONTH FROM update_at) = ${index + 1} and userid = '${req.headers.userid}' and isComplete = true; `).catch(err => {
                console.log(err);
            })
            tasksByMonth.push(last1Day.rows)
        }
        return res.status(200).json({
            tasksByMonth: tasksByMonth,
        })
    });
});


module.exports = router;