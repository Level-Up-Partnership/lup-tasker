const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to let the admin add a banner 
 */
router.put('/', async (req, res) => {
    JWT.verify(req.body.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        await client.query(`UPDATE taskeruser
        SET Img_url = null`).catch(err => {
            if (err) {
                error = true;
                return res.status(401).json({
                    error: 'Unable to update banner, please try again!',
                })
            }
        });
        await client.query(`UPDATE taskeruser
        SET Img_url = '${req.body.bannerURL}'
        WHERE user_id = '${decoded.userId}'`).catch(err => {
            if (err) {
                error = true;
                return res.status(401).json({
                    error: 'Unable to update banner, please try again!',
                })
            }
        });
        if (error === false) {

            return res.status(200).json({
                title: 'Banner has been updated!!',
            })
        }
    });
});

module.exports = router;