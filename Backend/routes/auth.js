const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarContraseña } = require('../middlewares/validar-contraseña')

router.post(
    '/',
    [
        check('email', 'Introduzca su email para iniciar sesion').not().isEmpty(),
        check('password',).isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario)

router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password',).isLength({ min: 6 }).notEmpty(),
        check('passConfirm', 'Debe confirmar su contraseña').isLength({ min: 6 }).notEmpty(),
        validarContraseña,
        validarCampos
    ],
    crearUsuario)

router.get('/renew', revalidarToken)

module.exports = router