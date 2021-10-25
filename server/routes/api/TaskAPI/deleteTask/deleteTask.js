const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../../connection/pg')

router.delete('/', async (req, res) => {
    let token = req.headers.token;
    let taskid = req.headers.taskid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        await client.query(`DELETE FROM subtasks where taskid='${taskid}'`)
        await client.query(`DELETE FROM tasks where taskid='${taskid}'`)

        return res.status(200).json({
            title: 'Post has been deleted',
        })
    });
});


module.exports = router;