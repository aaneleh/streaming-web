const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect();


router.get('/', async(req, res) => {
    res.json("ok")
})

/* connection.end(); */

module.exports = router