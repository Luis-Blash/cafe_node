const { Router} = require('express');
// Controlador
const { buscar } = require('../controller/buscar');

const router = Router()

router.get('/:coleccion/:termino', buscar)

module.exports = router;
