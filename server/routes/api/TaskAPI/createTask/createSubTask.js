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
        const userTask = await client.query(`SELECT * FROM subtasks where userid = '${decoded.userId}' and taskid = '${req.body.taskid}'`).catch(err => {
            console.log(err);
        })
        if (userTask.rows.length == 5) {
            return res.status(400).send('Sorry, but you have exceeded your subtask limit for this task')
        } else {

            await client.query(`INSERT INTO subtasks (subtaskname,taskid,userid) VALUES 
                ('${req.body.subTaskName}',(SELECT taskid from tasks WHERE taskid = '${req.body.taskid}'), (SELECT user_id from taskeruser WHERE user_id = '${decoded.userId}' ))`)

            return res.status(200).json({
                title: 'Success',
            })
        }
    });
});


module.exports = router;