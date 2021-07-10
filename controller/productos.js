const { response } = require("express");
const { Producto } = require('../models')

const obtenerProductos = async (req, res = response) => {
    const {limite=5, desde=0} = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        // Total
        Producto.countDocuments(query),
        // Paginación
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.status(200).json({
        total,
        productos
    })
}

const obtenerProducto = async (req, res = response) => {
    const {id} = req.params

    const producto = await Producto.findById(id).populate('usuario', 'nombre')

    res.status(200).json(producto)
}

const crearProducto = async (req, res = response) => {
    const {estado, usario, ...body} = req.body

    const productoDB = await Producto.findOne({nombre: body.nombre.toUpperCase()})
    
    if (productoDB) {
        return res.status(400).json({
            msg: `La Producto ${productoDB.nombre}, ya existe`
        })
    }

    // Generar data
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save()

    res.status(201).json(data);
}

const actualizarProducto = async (req, res = response)=>{
    const {id} = req.params;
    const { estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);
}

const borrarProducto = async (req, res=response) =>{
    const {id} = req.params
    console.log(req);

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: false})

    res.status(200).json(producto)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}