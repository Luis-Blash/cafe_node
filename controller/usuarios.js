const { response } = require('express')
const bcryptjs = require('bcryptjs');
// importacion del modelo
const Usuario = require('../models/usuarios');


const usuariosGet = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuarios GET'
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    // verifacar contra base de datos y actualizar
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuarios PUT',
        usuario
    })
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    // creamos instancia
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

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