const { Router } = require('express');
const { check } = require('express-validator');
// middlewares
const { valiadarCampos, validarJWT, esAdminRole } = require('../middlewares');
//helpers
const { productoExistePorId, categoriaExistePorId } = require('../helpers/db-validators');
// Controller
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controller/productos');

const router = Router();

/** 
 *  Rutas  
**/

// Obtener todas las Productos
router.get('/', obtenerProductos);

// Obtener una Producto por id
router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(productoExistePorId),
    valiadarCampos,
], obtenerProducto);

// Crear Producto - privado - token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es in id de Mongo').isMongoId(),
    check('categoria').custom(categoriaExistePorId),
    valiadarCampos
], crearProducto);

// Actualizar una Producto - privado - token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(productoExistePorId),
    valiadarCampos,
], actualizarProducto);

// Borrar Producto -- Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(productoExistePorId),
    valiadarCampos
], borrarProducto);

module.exports = router;