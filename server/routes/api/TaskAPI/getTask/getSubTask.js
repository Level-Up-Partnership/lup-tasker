const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to get the subtasks of the user
 */
router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        if (req.headers.subtasks == "All") {
            const userTask = await client.query(`SELECT * FROM subtasks where userid = '${decoded.userId}' AND taskid = '${req.headers.taskid}'`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get subtask, please try again or refresh the page",
                    })
                }
            })
            if (error === false) {
                return res.status(200).json({
                    userTask: userTask.rows
                })
            }
        } else {
            const userTask = await client.query(`SELECT * FROM subtasks where userid = '${decoded.userId}' AND taskid = '${req.headers.taskid}' AND isChecked = false`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get subtask, please try again or refresh the page",
                    })
                }
            })
            if (error === false) {

                return res.status(200).json({
                    userTask: userTask.rows
                })
            }
        }
    });
});


module.exports = router;