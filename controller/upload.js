
const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send({msg: 'No hay archivo para subir'});
        return;
    }

    try{
        // subida
        const nombre = await subirArchivo(req.files, undefined, 'images');
    
        res.json({
            nombre
        })
        
    }catch(msg){
        res.status(400).json({msg})
    }
}

const actualizarImagen = async (req, res= response) =>{
    const {id, coleccion} = req.params;

    res.json({
        id,
        coleccion
    })
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}