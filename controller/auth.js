const { response } = require('express')
const bcryptjs = require('bcryptjs');
// Models
const Usuario = require('../models/usuarios');


const login = async (req, res = response) => {
    const {correo, password} = req.body;
    try{
        const usuario = await Usuario.findOne({correo});
        // Verifacar si el Email existe
        if(!usuario){
            return res.status(400).json({
                msg: "El usuario / Password no son correctos"
            })
        }
        // El usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usuario / Password no son correctos"
            })
        }
        // verificar contraseña -- comparamos si es la misma
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: "El usuario / Password no son correctos" 
            })
        }
        // Generar JWT

        res.status(200).json({
            msg:"login"
        })
    }catch(error){

        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}

module.exports = {
    login
}