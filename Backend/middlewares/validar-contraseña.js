const express = require('express')

const validarContraseña = (req, res = express.response, next) => {
    
    if(req.body.password != req.body.passConfirm){
        return res.status(400).json({
            ok: false,
            message: 'La contraseñas no coinciden'
        })
    }
    next()
}

module.exports = { validarContraseña }