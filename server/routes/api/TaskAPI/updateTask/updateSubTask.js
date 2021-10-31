const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const userInfo = await client.query(`UPDATE subtasks SET ischecked = true WHERE subtaskid = '${req.body.currentsubtask}'`).catch(err => {
            if (err) {

                return res.status(400).json({
                    error: "Could not update subtask, please try again or refresh the page",
                })
            }
        })
        return res.status(200).json({
            title: "comment saved",
        })
    });
});


module.exports = router;