const { Router } = require('express');
const { check } = require('express-validator');

//Controler
const { login } = require('../controller/auth');

//helpers
const { valiadarCampos } = require('../middlewares/validar-campos');

// ---
const routes = Router();

// GET auth
routes.post('/login',[
    check('correo','Debe ser un correo').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    valiadarCampos
], login);

module.exports = routes;