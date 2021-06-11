const { Router } = require('express');
const { check } = require('express-validator');
// Controller
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');
// Middlewares
const { valiadarCampos } = require('../middlewares/validar-campos');
// ---
const routes = Router();

// GET usuario
routes.get('/', usuariosGet);
routes.put('/:id', usuariosPut);
// la segunda linea son los middlewares
routes.post('/',[
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password es obligatorio y mas de 6 letras").isLength({min:6}),
    check('correo', "El correo no es valido").isEmail(),
    check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    valiadarCampos
] ,usuariosPost);
routes.delete('/', usuariosDelete);

module.exports = routes;