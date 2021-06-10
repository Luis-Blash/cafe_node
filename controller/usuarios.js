const { response } = require('express')

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

const usuariosPost = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuarios POST'
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