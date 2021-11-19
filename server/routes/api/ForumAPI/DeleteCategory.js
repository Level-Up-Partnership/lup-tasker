const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken')
const client = require('../../../connection/pg')
/**
 * The purpose of this is for the admin to delete a category
 */
router.delete('/', async (req, res) => {
    let token = req.headers.token;
    let categoryid = req.headers.categoryid;
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        await client.query(`DELETE FROM category where categoryid=${categoryid}`).catch(err => {
            if (err) {
                error = true;
                return res.status(403).json({
                    error: "Category can't be deleted, please try again",
                })
            }
        })
        if (error === false) {

            return res.status(200).json({
                title: 'Category has been deleted',
            })
        }
    });
});


module.exports = router;