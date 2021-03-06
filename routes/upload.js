const { Router } = require('express');
const { check } = require('express-validator');
// Controller
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controller/upload');
// helpers
const { coleccionesPerimitidas } = require('../helpers')
// middlewares
const { valiadarCampos, validarArchivos } = require('../middlewares')
// ---
const routes = Router();

routes.post('/', validarArchivos ,cargarArchivo)

routes.put('/:coleccion/:id', [
    validarArchivos,
    check('id', 'No es id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPerimitidas(c, ['usuarios', 'productos'])),
    valiadarCampos
], actualizarImagen)

routes.get('/:coleccion/:id', [
    check('id', 'No es id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPerimitidas(c, ['usuarios', 'productos'])),
    valiadarCampos
], mostrarImagen)


module.exports = routes;