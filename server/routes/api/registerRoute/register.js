const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const password = bcrypt.hashSync(req.body.password, 10);
        const newUser = await client.query(`INSERT INTO taskeruser (username,password,email) VALUES ('${username}','${password}','${email}') RETURNING *`);
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;