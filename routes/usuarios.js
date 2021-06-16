const { Router } = require('express');
const { check } = require('express-validator');

// Controller
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');
// Middlewares
const { valiadarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
// Helpers 
const { esRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');
// ---
const routes = Router();

// GET usuario
routes.get('/', usuariosGet);


routes.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(esRoleValido),
    valiadarCampos
], usuariosPut);

// la segunda linea son los middlewares
routes.post('/',[
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password es obligatorio y mas de 6 letras").isLength({min:6}),
    check('correo').custom(emailExiste),
    // check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // (rol) => esRoleValido(rol) es lo mismo que abajo porque se repite
    check('rol').custom(esRoleValido),
    valiadarCampos
] ,usuariosPost);


routes.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    valiadarCampos
], usuariosDelete);

module.exports = routes;