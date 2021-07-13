
const { response } = require("express");
/// helpers
const { subirArchivo } = require("../helpers");
// models
const  { Usuario, Producto} = require('../models')

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send({ msg: 'No hay archivo para subir' });
        return;
    }

    try {
        // subida
        const nombre = await subirArchivo(req.files, undefined, 'images');

        res.json({
            nombre
        })

    } catch (msg) {
        res.status(400).json({ msg })
    }
}

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    
    await modelo.save();

    res.json(modelo)
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}