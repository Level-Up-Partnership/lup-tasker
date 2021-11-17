const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.put('/', async (req, res) => {
    console.log(req.body);
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const categoryInfo = await client.query(`UPDATE category SET title = '${req.body.adminTitle}', description = '${req.body.adminDescription}'
         where categoryid = '${req.body.categoryId}'`).catch(err => {
            error = true;
            return res.status(400).json({
                error: "Could not edit task, please try again or refresh the page",
            })
        })
        if (error === false) {
            return res.status(200).json({
                title: "success",
            })

        }
    });
});


module.exports = router;