const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')



router.get('/', async (req, res) => {
    const categoryInfo = await client.query('SELECT * FROM Category');
    res.json(categoryInfo.rows);
});


module.exports = router;