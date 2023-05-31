const express = require('express')
require('dotenv').config()
const {dbConnection} = require('./database/config')
const cors = require('cors')

const app = express();

dbConnection();

app.use(cors())
app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth') )
app.use('/api/task', require('./routes/tasks'))

app.listen(process.env.PORT,() => {
    console.log('Servidor corriendo en puerto',process.env.PORT)
})