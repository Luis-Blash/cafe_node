const { Router } = require('express');
const { check } = require('express-validator');
// Controller
const { cargarArchivo } = require('../controller/upload');
// middlewares
const {valiadarCampos} = require('../middlewares')
// ---
const routes = Router();

routes.post('/', cargarArchivo)

module.exports = routes;