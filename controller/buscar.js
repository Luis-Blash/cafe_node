const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

// models
const { Usuario, Categoria, Producto} = require('../models')

const coleccionesPermitidas = [
    'categoria',
    'producto',
    'roles',
    'usuarios'
]

const buscarUsuario = async(termino= '', res = response)=>{
    const esMongoID = ObjectId.isValid(termino); // TRUE
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario)?[usuario] : []
        })
    }

    const expresRegular = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{nombre: expresRegular}, {correo: expresRegular}],
        $and: [{estado: true}]
    });
    return res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino= '', res = response)=>{
    const esMongoID = ObjectId.isValid(termino); // TRUE
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria)?[categoria] : []
        })
    }

    const expresRegular = new RegExp(termino, 'i')
    const categorias = await Categoria.find({
        nombre: expresRegular,
        estado: true
    });
    return res.json({
        results: categorias
    })
}

const buscarProductos = async(termino= '', res = response)=>{
    const esMongoID = ObjectId.isValid(termino); // TRUE
    if(esMongoID){
        const producto = await Producto.findById(termino)
                            .populate('categoria', 'nombre');
        return res.json({
            results: (producto)?[producto] : []
        })
    }

    const expresRegular = new RegExp(termino, 'i')
    const productos = await Producto.find({
        nombre: expresRegular,
        estado: true
    }).populate('categoria', 'nombre');
    
    return res.json({
        results: productos
    })
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `colecciones permitidas ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categoria':
            buscarCategorias(termino, res);
            break;
        case 'producto':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer un busqueda'
            })
            break;
    }
    
}

module.exports = {
    buscar
}