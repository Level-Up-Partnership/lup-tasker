const express = require('express');
const pg = require('pg');

const router = express.Router();

//Get
router.get('/', (req, res) => {
    res.send("Hello");
});
//Add

//Delete 


module.exports = router;