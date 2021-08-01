const express = require('express');
const router = express.Router();
const client = require('../../connection/pg')

router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body
        const newUser = await client.query(`INSERT INTO taskeruser (username,password,email) VALUES ('${username}','${password}','${email}') RETURNING *`);
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;