const {response} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = async (req, res = response, next) => {
    const token = await req.headers.authorization;
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token! Añadalo en los headers bajo el nombre authorization'
        })
    }

    try{
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.uid = uid
        req.name = name
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token Invalido'
        })
    }
    next()
}

module.exports = { validarJWT }