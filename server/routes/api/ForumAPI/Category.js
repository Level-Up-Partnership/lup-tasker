const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')
/**
 * The purpose of this is to get all the categories and display them
 */
router.get('/', async (req, res) => {
    let token = req.headers.token
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        const categoryInfo = await client.query('SELECT * FROM Category').catch(err => {
            if (err) {
                error = true;
                return res.status(403).json({
                    error: 'Could not get categories, please refresh the page',
                })
            }
        });
        if (error === false) {

            res.json(categoryInfo.rows);
        }
    });
});


module.exports = router;