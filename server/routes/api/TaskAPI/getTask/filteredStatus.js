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
        if (req.query.filteredby == "All") {
            if (req.query.category == "All") {
                const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}'`).catch(err => {
                    console.log(err);
                })
                return res.status(200).json({
                    userTask: userTask.rows
                })
            }
            const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}' AND category = '${req.query.category}'`).catch(err => {
                console.log(err);
            })
            return res.status(200).json({
                userTask: userTask.rows
            })
        } else if (req.query.category == "All") {
            const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}' AND iscomplete = '${req.query.filteredby}'`).catch(err => {
                console.log(err);
            })
            return res.status(200).json({
                userTask: userTask.rows
            })
        } else {
            const userTask = await client.query(`SELECT * FROM tasks where userid = '${decoded.userId}' AND iscomplete = '${req.query.filteredby}' AND category = '${req.query.category}'`).catch(err => {
                console.log(err);
            })
            return res.status(200).json({
                userTask: userTask.rows
            })
        }
    });
});


module.exports = router;