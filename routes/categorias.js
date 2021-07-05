const { Router } = require('express');
const { check } = require('express-validator');
//helpers
const { valiadarCampos, validarJWT } = require('../middlewares');
// Controller
const { crearCategoria } = require('../controller/categorias');

const router = Router();

// Obtener todas las categorias
router.get('/', (req, res)=>{
    res.json('get')
});

// Obtener una categoria por id
router.get('/:id', (req, res)=>{
    res.json('get id')
});

// Crear categoria - privado - token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    valiadarCampos
] , crearCategoria);

// Actualizar una categoria - privado - token valido
router.put('/:id', (req, res)=>{
    res.json('Put')
});

// Borrar categoria -- Admin
router.delete('/:id', (req, res)=>{
    res.json('delete')
});


module.exports = router;