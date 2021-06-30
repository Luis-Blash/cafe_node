const { response } = require('express')
const bcryptjs = require('bcryptjs');
// Models
const Usuario = require('../models/usuarios');
// helpers
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        // Verifacar si el Email existe
        if (!usuario) {
            return res.status(400).json({
                msg: "El usuario / Password no son correctos"
            })
        }
        // El usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
        // verificar contraseña -- comparamos si es la misma
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: "El usuario / Password no son correctos"
            })
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

// Sirve para hacer login y signing
const googleSigning = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        // Existe el correo en la base
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            // guardar
            const data = {
                nombre,
                correo,
                password: 'p',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usario de google esta en false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado hable con el administrador'
            })
        }

        // Generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.json({
            msg: 'Token no es reconocido de Google'
        })
    }
}

module.exports = {
    login,
    googleSigning
}