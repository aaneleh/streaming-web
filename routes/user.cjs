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

/*
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  for(let i = 0; i < results.length; i++) {
      console.log(results[i]);
  }
});

 connection.query('INSERT INTO user VALUES (0, "Helena", "12345", 0)', function (error, results, fields) {
  if (error) throw error;
}); */


//SELECIONA TODOS
router.get('/', async(req, res) => {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) {
            res.status(500).json({message: error})
            throw error;  
        } 
        res.json(results)
    });
})

/* connection.end(); */

module.exports = router