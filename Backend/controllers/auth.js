const express = require('express')
const {generarJWT} = require('../helpers/jwt')


const crearUsuario = (req, res = express.response) => {
    const { name, email, password, passConfirm } = req.body
       
    return res.status(200).json({
        ok: true,
        name, 
        email, 
        password,
        passConfirm
    })
}

const loginUsuario = (req, res = express.response) => {
    const { email, password } = req.body
    console.log(req.body)
    const token = await(generarJWT(Date().valueOf,email))

    return res.status(200).json({
        ok: true,
        email,
        password,
        token
    })
}

const revalidarToken = async (req, res = express.request) => {
    
    const {name} = req
    const token = await(generarJWT(Date().valueOf,name))
    
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}