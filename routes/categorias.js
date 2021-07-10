const { Router } = require('express');
const { check } = require('express-validator');
// middlewares
const { valiadarCampos, validarJWT } = require('../middlewares');
//helpers
const { categoriaExistePorId } = require('../helpers/db-validators');
// Controller
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria } = require('../controller/categorias');

const router = Router();

// Obtener todas las categorias
router.get('/', obtenerCategorias);

// Obtener una categoria por id
router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(categoriaExistePorId),
    valiadarCampos,
], obtenerCategoria);

// Crear categoria - privado - token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    valiadarCampos
] , crearCategoria);

// Actualizar una categoria - privado - token valido
router.put('/:id', actualizarCategoria);

// Borrar categoria -- Admin
router.delete('/:id', (req, res)=>{
    res.json('delete')
});


module.exports = router;