const { response } = require('express')
const bcryptjs = require('bcryptjs');
// importacion del modelo
const Usuario = require('../models/usuarios');


const usuariosGet = async (req, res = response) => {
    // request query
    const { limite = 5, desde = 0 } = req.query;
    // Mi query para peticion
    const query = { estado: true}
    // Promesa
    // Esto ayuda a poder hacer las peticiones al mismo tiempo
    // A diferencia a tener las dos en diferentes constantes haria lento el codigo
    // Hacemos una destructuracion de la respuesta
    const [total, usuarios] = await Promise.all([
        // El total
        Usuario.countDocuments(query),
        // Haces la petición para el paginacion y la cantidad de usuarios
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
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

    res.status(200).json(usuario)
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

    res.status(200).json(usuario)
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    //Fisicamente lo borramos
    // Pero si algo modifico no sabria
    // const usuario = await Usuario.findByIdAndDelete(id);
    // De esta forma simpletente se quedara
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.status(200).json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}