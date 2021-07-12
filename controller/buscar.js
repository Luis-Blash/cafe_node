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

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `colecciones permitidas ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuario(termino, res)
            break;
        case 'categoria':

            break;
        case 'producto':

            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer un busqueda'
            })
            break;
    }

    // res.json({
    //     coleccion,
    //     termino
    // })
}

module.exports = {
    buscar
}