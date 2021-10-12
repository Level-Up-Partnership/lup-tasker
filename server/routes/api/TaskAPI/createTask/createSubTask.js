const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.post('/', async (req, res) => {

    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        await client.query(`INSERT INTO subtasks (subtaskname,taskid) VALUES 
        ('${req.body.taskname}',${req.body.taskid})`)

        return res.status(200).json({
            title: 'Success',
        })
    });
});


module.exports = router;