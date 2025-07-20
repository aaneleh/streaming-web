require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const CryptoJS = require("crypto-js")
const userRouter = require('./routes/user.cjs')
const mediaRouter = require('./routes/media.cjs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect()

/* //LOGIN
app.get('/login', async(req, res) => {

    return res.status(200).json({message: 'Login realizado com sucesso'})
}) */

app.post('/login', async(req, res) => {

    let user_name = req.body.user_name
    let passwordBody = req.body.password

    connection.query('SELECT * FROM user WHERE name = ?', [user_name], function (error, results, fields) {

        if (error) {
            console.log(error)
            return res.status(500).json({message: error})
        } 
        if (results.length == 0) {
            return res.status(404).json({message: 'Usuário não existe'})
        }
        
        let password = results[0].password
        var decrypto = CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

        if(decrypto === passwordBody){
            return res.status(200).json({message: 'Login realizado com sucesso', token: results[0].user_id})

        } else {
            return res.status(400).json({message: 'Senha incorreta'})
        }
    })
})

app.use('/user', userRouter)
app.use('/media', mediaRouter)

app.listen(process.env.PORT, () => console.log(`Server iniciado na porta ${process.env.PORT}`))
