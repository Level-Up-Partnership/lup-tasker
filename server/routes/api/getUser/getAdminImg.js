const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res, next) => {

    const adminImg = await client.query(`SELECT img_url FROM taskeruser WHERE role_id = 1`).catch(err => {
        if (err) {
            console.log(err);
        }
    });
    return res.json(adminImg.rows);
    // return res.status(200).json({
    //     userInfo: singleUserInfo
    // })
});

module.exports = router;