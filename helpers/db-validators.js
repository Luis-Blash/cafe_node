const Role = require('../models/role');
const Usuario = require('../models/usuarios');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol no esta registrado ${rol}`)
    }
}

// Verificar si el correo existe
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} existe`)
    }
}

// Usuario por ids
const usuarioExistePorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario ${existeUsuario} existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioExistePorId
}