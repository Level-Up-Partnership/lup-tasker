const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../../connection/pg')

router.delete('/', async (req, res) => {
    let token = req.headers.token;
    let subtaskid = req.headers.subtaskid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        await client.query(`DELETE FROM subtasks where subtaskid='${subtaskid}'`).catch(err => {
            error = true;
            if (err) {
                return res.status(400).json({
                    error: 'Could not delete subtask please try again',
                })
            }
        })
        if (error === false) {
            return res.status(200).json({
                title: 'Post has been deleted',
            })
        }
    });
});


module.exports = router;