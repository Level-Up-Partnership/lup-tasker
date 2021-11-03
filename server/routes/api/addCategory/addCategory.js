const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.post('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const description = req.body.description;
        const descriptionSingleQuotes = description.replace(/'/g, "''");
        await client.query(`INSERT INTO category (title,description) VALUES 
        ('${req.body.title}','${descriptionSingleQuotes}')`).catch(err => {
            if (err) {
                error = true;
                return res.status(404).json({
                    error: 'Category unable to be created, please try again!',
                })
            }
        });
        if (error === false) {
            return res.status(200).json({
                title: 'Category has been Created!!',
            })
        }
    });
});


module.exports = router;