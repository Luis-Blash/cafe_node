const { Router } = require('express');
const { check } = require('express-validator');

//Controler
const { login, googleSigning } = require('../controller/auth');

//helpers
const { valiadarCampos } = require('../middlewares/validar-campos');

// ---
const routes = Router();

// post auth
routes.post('/login',[
    check('correo','Debe ser un correo').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    valiadarCampos
], login);

// Google token
routes.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    valiadarCampos
], googleSigning);

module.exports = routes;