const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
/**
 * The purpose of this is to create a user account in the database and hash the password with bycrypt 
 */
router.post('/', async (req, res) => {
    const { username, email } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const dbEmail = await client.query(`SELECT username,email FROM taskeruser`);
    let isSame = false;
    let sameUser = false;
    dbEmail.rows.forEach(element => {
        if (username == element.username) {
            isSame = true;
            sameUser = true;
            res.status(401)
            return res.send('Username already exists');
        }
        if (email == element.email && sameUser == false) {
            isSame = true;
            res.status(401)
            return res.send('Email already exists');
        }
    });
    if (isSame == false) {
        await client.query(`INSERT INTO taskeruser (username,password,email) VALUES ('${username.replace(/[^a-zA-Z ]/g, "")}','${password}','${email}') RETURNING *`).catch(err => {
            console.log(err);
        });
        return res.status(200).json({
            title: 'Success',
        })
    }
});

module.exports = router;