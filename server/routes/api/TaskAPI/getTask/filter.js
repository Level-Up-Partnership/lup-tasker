const express = require('express');
const router = express.Router();
const client = require('../../../../connection/pg')
require('dotenv').config();
const JWT = require('jsonwebtoken')


router.get('/', async (req, res) => {
    JWT.verify(req.headers.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthroized'
        })
        let error = false;
        let nullFilter = {
            taskName: null,
            category: null,
            status: null,
        };
        for (const [key, value] of Object.entries(req.query)) {
            if (value !== "") {
                if (key == "taskName") {
                    nullFilter[key] = "'%" + value + "%'";
                } else if (key == "status") {
                    nullFilter[key] = value === 'true' ? true : false;
                } else if (key == 'category') {
                    nullFilter[key] = value === "All" ? null : "'" + value + "'";
                }
            }
        }
        const userTask = await client.query(`SELECT * FROM tasks 
        WHERE (userId = '${decoded.userId}') 
        AND(${nullFilter.category} is null or category = ${nullFilter.category}) 
        AND (${nullFilter.status} is null or iscomplete = ${nullFilter.status}) 
        AND(${nullFilter.taskName} is null or  taskname ILIKE ${nullFilter.taskName})
        OFFSET ${req.headers.pageoffset}
        LIMIT ${req.headers.limit};`).catch(err => {
            error = true;
            return res.status(400).json({
                error: "Could not process the filter, please try again",
            })
        })
        const lengthPagination = await client.query(`SELECT * FROM tasks 
        WHERE (userId = '${decoded.userId}') 
        AND(${nullFilter.category} is null or category = ${nullFilter.category}) 
        AND (${nullFilter.status} is null or iscomplete = ${nullFilter.status}) 
        AND(${nullFilter.taskName} is null or  taskname ILIKE ${nullFilter.taskName});`).catch(err => {
            error = true;
            return res.status(400).json({
                error: "Could not process the filter, please try again",
            })
        })
        if (error === false) {
            return res.status(200).json({
                userTask: userTask.rows,
                lengthPag: lengthPagination.rows
            })
        }
    });
});


module.exports = router;