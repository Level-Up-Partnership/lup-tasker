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
        let error = false;
        if (req.query.category == 'All') {
            const userTask = await client.query(`SELECT * FROM tasks where taskName ILIKE '%${req.query.taskName}%' AND userid = '${decoded.userId}' `).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get search filter, please try again or refresh the page",
                    })
                }
            })
            if (error === false) {

                return res.status(200).json({
                    userTask: userTask.rows
                })
            }
        } else if (req.query.status == "All") {
            const userTask = await client.query(`SELECT * FROM tasks where taskName ILIKE '%${req.query.taskName}%' AND userid = '${decoded.userId}'`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get search filter, please try again or refresh the page",
                    })
                }
            })
            if (error === false) {

                return res.status(200).json({
                    userTask: userTask.rows
                })
            }
        } else {
            const userTask = await client.query(`SELECT * FROM tasks where taskName ILIKE '%${req.query.taskName}%' AND category = '${req.query.category}' AND iscomplete = '${req.query.status}' AND userid = '${decoded.userId}'`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get search filter, please try again or refresh the page",
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