const express = require('express');
const router = express.Router();
const client = require('../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        const last1Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at > current_date -0
        ORDER BY created_at DESC`).catch(err => {
            console.log(err);
        })
        const last2Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -1 AND current_date - 0`).catch(err => {
            console.log(err);
        })
        const last3Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -2 AND current_date - 1`).catch(err => {
            console.log(err);
        })
        const last4Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -3 AND current_date - 2`).catch(err => {
            console.log(err);
        })
        const last5Day = await client.query(`
        SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -4 AND current_date - 3`).catch(err => {
            console.log(err);
        })
        const last6Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -5 AND current_date - 4`).catch(err => {
            console.log(err);
        })
        const last7Day = await client.query(`SELECT *
        FROM tasks
        WHERE isComplete = true and userid = '${decoded.userId}' AND created_at BETWEEN  current_date -6 AND current_date - 5`).catch(err => {
            console.log(err);
        })
        return res.status(200).json({
            last1Day: last1Day.rows,
            last2Day: last2Day.rows,
            last3Day: last3Day.rows,
            last4Day: last4Day.rows,
            last5Day: last5Day.rows,
            last6Day: last6Day.rows,
            last7Day: last7Day.rows,
        })
    });
});


module.exports = router;