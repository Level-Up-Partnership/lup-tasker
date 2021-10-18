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
        const userTask = await client.query(`SELECT * FROM subtasks where userid = '${decoded.userId}' AND taskid = '${req.headers.taskid}' AND isChecked = false`).catch(err => {
            console.log(err);
        })
        return res.status(200).json({
            userTask: userTask.rows
        })
    });
});


module.exports = router;