const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConecction } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Rutas direción
        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
        }

        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    async conectarDB() {
        await dbConecction()
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // parseo json
        this.app.use(express.json());
        // ruta de archivos
        this.app.use(express.static('public'));
        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
        this.app.use(this.path.productos, require('../routes/productos'));
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
        this.app.use(this.path.uploads, require('../routes/upload'));
    }

    listen() {
        this.app.listen(this.port, () => console.log(`port listening ${this.port}`))
    }
}

module.exports = Server;