const { Router } = require('express');
// Controller
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');
// ---
const routes = Router();

// GET usuario
routes.get('/', usuariosGet);
routes.put('/:id', usuariosPut);
routes.post('/', usuariosPost);
routes.delete('/', usuariosDelete);

module.exports = routes;