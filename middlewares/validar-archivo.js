const { response } = require('express');

const validarArchivos = (req, res = response, next)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send({ msg: 'No hay archivo para subir -- validar Archivo subir' });
        return;
    }

    next()
}
    

module.exports = {
    validarArchivos
}