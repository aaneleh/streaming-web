require('dotenv').config()
const express = require('express')
const cors = require('cors');
const userRouter = require('./routes/user.cjs')
const movieRouter = require('./routes/movie.cjs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRouter)
app.use('/movie', movieRouter)

app.listen(process.env.PORT, () => console.log(`Server iniciado na porta ${process.env.PORT}`))
