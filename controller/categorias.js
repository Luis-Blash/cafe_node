const { response } = require("express");
const { Categoria } = require('../models')

const obtenerCategorias = async (req, res = response) => {
    const {limite=5, desde=0} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        // Total
        Categoria.countDocuments(query),
        // Paginación
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ])

    res.status(200).json({
        total,
        categorias
    })
}

const obtenerCategoria = async (req, res = response) => {
    const {id} = req.params

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

    res.status(200).json(categoria)
}

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    // Generar data
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save()

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response)=>{
    const nombre = req.params.id.toUpperCase()
    const categoria = await Categoria.findOne({nombre})
    if(!categoria){
        return res.status(400).json({
            msg: `La categoria ${nombre}, no existe`
        })
    }

    const {...datos} = req.body
    console.log(categoria.id);
    const updateCategoria = await Categoria.findByIdAndUpdate(categoria.id, n)
    console.log(updateCategoria);
    res.status(200).json({
        msg: "Datos"
    })


}

const borrarCategoria = async (req, res=response) =>{
    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false})

    res.status(200).json(categoria)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria
}