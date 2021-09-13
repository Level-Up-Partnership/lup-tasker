const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')

router.get('/', async (req, res) => {
    let token = req.headers.token
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const categoryInfo = await client.query('SELECT * FROM Category');
        res.json(categoryInfo.rows);
    });
});


module.exports = router;