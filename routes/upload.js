const { Router } = require('express');
const { check } = require('express-validator');
// Controller
const { cargarArchivo, actualizarImagen } = require('../controller/upload');
// helpers
const { coleccionesPerimitidas } = require('../helpers')
// middlewares
const { valiadarCampos } = require('../middlewares')
// ---
const routes = Router();

routes.post('/', cargarArchivo)

routes.put('/:coleccion/:id', [
    check('id', 'No es id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPerimitidas(c, ['usuarios', 'productos'])),
    valiadarCampos
], actualizarImagen)

module.exports = routes;