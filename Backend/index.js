const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json())

app.use('/api/auth', require('./routes/auth') )
app.get('/',(req,res) => {
    res.json({
        ok: true
    })
})


app.listen(process.env.PORT, ()=>{
    console.log('corriendo en el puerto ', process.env.PORT)
})