
const path = require('path');
const fs = require('fs');

const { response } = require("express");
/// helpers
const { subirArchivo } = require("../helpers");
// models
const  { Usuario, Producto} = require('../models')

const cargarArchivo = async (req, res = response) => {

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

    // Limpiar imagenes previas
    if(modelo.img){
        // Hay borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
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