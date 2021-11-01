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
        const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}' and iscomplete = false `).catch(err => {
            console.log(err);
        })
        if (userTask.rows.length == 3) {
            return res.status(400).json({
                error: '3 task limit reached. Delete a task or finish to create more',
            })
        } else {
            let yourDate = new Date().toLocaleDateString();
            await client.query(`INSERT INTO tasks (taskname,category,iscomplete,focustimer,resttimer,userid,created_at) VALUES 
            ('${req.body.taskName}','${req.body.taskCategory}',${req.body.isComplete},${req.body.focusTimer},${req.body.restTimer},'${decoded.userId}','${yourDate}')`).catch(err => {
                if (err) {
                    return res.status(400).json({
                        error: 'Sorry but the task could not be created please try again or refresh the page',
                    })
                }
            })

            return res.status(200).json({
                title: 'Success',
            })
        }
    });
});


module.exports = router;