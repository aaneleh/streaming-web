const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const CryptoJS = require("crypto-js")
const { v4: uuidv4 } = require('uuid')

const connection = require('./connection.cjs')

connection.connect()

//SELECIONA TODOS
router.get('/', async(req, res) => {

    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando usuários'})
        } 
        return res.status(200).json(results)
    })
})

//CRIA USUÁRIO
router.post('/', async(req, res) => {

    let user_name = req.body.user_name
    let password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    let type = req.body.type

    connection.query('INSERT INTO user VALUES (?, ?, ?, ?)', [uuidv4(), user_name, password, type], function (error, results, fields) {
        if (error) {
            console.log(error)
            if(error.code == 'ER_DUP_ENTRY'){
                return res.status(400).json({message: 'Nome de usuário já existe'})
            }
            return res.status(500).json({message: 'Erro ao cadastrar usuário'})
        } 
        return res.status(200).json({message: 'Usuário cadastrado com sucesso'})
    }) 
})

//EDITA NOME
router.patch('/:id', async(req, res) => {

    let user_id = req.params.id
    let user_name = req.body.user_name

    if(user_name == null) res.status(400)

    connection.query('UPDATE user SET name = ? WHERE user_id = ?', [user_name, user_id], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro alterando usuário'})
        } 
        return res.status(200).json({message: 'Erro alterando usuário'})
    }) 
})

//EDITA SENHA
router.patch('/password/:id', async(req, res) => {

    let user_id = req.params.id
    let current_password = req.body.current_password
    let new_password = req.new_password
    
    connection.query('SELECT * FROM user WHERE user_id = ?', [user_id], function (error, results, fields) {

        if (error) {
            console.log(error)
            return res.status(500).json({message: error})
        } 
        if (results.length == 0) {
            return res.status(404).json({message: 'Usuário não existe'})
        }
        
        let password = results[0].password
        var decrypto = CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

        if(decrypto === current_password){

            connection.query('UPDATE user SET password = ? WHERE user_id = ?', [CryptoJS.AES.encrypt(new_password, process.env.CRYPTO_KEY).toString(), user_id], function (error, results, fields) {
                if(error) {
                    console.log(error)
                    return res.status(500).json({message: 'Erro ao alterar senha'})
                }
                return res.status(200).json({message: 'Senha alterada'})
            })

        } else {
            return res.status(400).json({message: 'Senha incorreta'})
        }
    }) 
})

//EXCLUIR USUÁRIO
router.delete('/:id', async(req, res) => {

    let user_id = req.params.id

    connection.query('DELETE FROM user WHERE user_id = ?', [user_id], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao excluir o usuário'})
        } 
        return res.status(200).json({message: 'Usuário excluído com sucesso'})
    }) 
})

module.exports = router