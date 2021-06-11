const { response } = require('express')
// importacion del modelo
const Usuario = require('../models/usuarios');

const usuariosGet = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuarios GET'
    })
}

const usuariosPut = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuarios PUT'
    })
}

const usuariosPost = async (req, res = response) => {
    const body = req.body;
    // creamos instancia
    const usuario = new Usuario(body);
    // Guardar
    await usuario.save();
    
    res.status(200).json({
        msg: 'Usuarios POST',
        usuario
    })
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuarios DELETE'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}