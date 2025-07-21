const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid')

const connection = require('./connection.cjs')

connection.connect()

//SELECIONA APENAS HEADLINERS
router.get('/headliners', async(req, res) => {
    connection.query('SELECT * FROM media WHERE headliner = 1', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando filmes/séries'})
        } 
        return res.status(200).json(results)
    })
})

//SELECIONA 1 PELO ID
router.get('/:id', async(req, res) => {
    connection.query('SELECT * FROM media WHERE media_id = ?', [req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Filme não encontrado'})
        } 
        return res.status(200).json(results[0])
    })
})

//SELECIONA TODOS
router.get('/', async(req, res) => {

    connection.query('SELECT * FROM media', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando filmes/séries'})
        } 
        return res.status(200).json(results)
    })
})

//CRIA MÍDIA
router.post('/', async(req, res) => {
    let name = req.body.name
    let description = req.body.description
    let folder = req.body.folder
    let source = req.body.source
/*     let poster = req.body.poster
    let logo = req.body.logo */
    let font_color = req.body.font_color
    let background_color = req.body.background_color
    let type = req.body.type
    let headliner = req.body.headliner
    const uid = uuidv4()

    connection.query('INSERT INTO media VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [uid, name, description, folder, source, font_color, background_color, type, headliner], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao cadastrar mídia'})
        } 
        return res.status(200).json({message: 'Mídia cadastrado com sucesso', media_id: uid})
    }) 
})


//ALTERA HEADLINER
router.patch('/:id', async(req, res) => {
    let media_id = req.params.id
    let headliner = req.body.headliner

    connection.query('UPDATE media SET headliner = ? WHERE media_id = ?',
            [headliner, media_id], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao atualizando propriedade headliner'})
        } 
        return res.status(200).json({message: 'Propriedade headliner atualizada com sucesso'})
    }) 
})

//EXCLUIR MÍDIA
router.delete('/:id', async(req, res) => {

    let media_id = req.params.id

    connection.query('DELETE FROM media WHERE media_id = ?', [media_id], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro ao excluir a mídia'})
        } 
        return res.status(200).json({message: 'Mídia excluída com sucesso'})
    }) 
})


module.exports = router