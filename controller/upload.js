const { response } = require("express");


const cargarArchivo = (req, res = response) => {
    res.json({
        msg: "Hola carga"
    })
}

module.exports = {
    cargarArchivo
}