const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { SignJWT, jwtVerify } = require('jose')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express()

app.use(express.json())
app.use(cors())

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SECRET_KEY = process.env.SECRET_KEY

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('SUCESSO'))
        .catch((e) => console.log('erro ao conectar:', e));

app.get('/', (req, res) => {
    res.send('Back funcionando')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
})