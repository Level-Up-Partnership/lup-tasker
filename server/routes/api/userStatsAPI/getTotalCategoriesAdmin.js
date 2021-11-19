const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')

/**
 * The purpose of this is to get the most popular categories for the admin
 */
router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })

        const allCat = await client.query(`SELECT DISTINCT category
        FROM TASKS`)
        let categoryTotal = []
        let error = false;
        for (let index = 0; index < allCat.rows.length; index++) {
            const categoryCount = await client.query(`SELECT COUNT(*), category
            FROM tasks
            WHERE isComplete = true and category = '${allCat.rows[index].category}' GROUP BY category;`).catch(err => {
                if (err) {
                    error = true;
                    return res.status(400).json({
                        error: "Could not get total categories, please refresh the page",
                    })
                }
            })
            categoryTotal.push(categoryCount.rows)
        }
        if (error === false) {

            return res.status(200).json({
                categoryTotal: categoryTotal,
            })
        }
    });
});


module.exports = router;