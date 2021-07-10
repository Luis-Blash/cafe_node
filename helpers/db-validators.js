const { Categoria, Usuario, Role, Producto } = require('../models');

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

// categoria por ids
const categoriaExistePorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe`)
    }
}

// producto por ids
const productoExistePorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioExistePorId,
    categoriaExistePorId,
    productoExistePorId
}