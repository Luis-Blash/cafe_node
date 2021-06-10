const express = require('express')
const cors = require('cors')

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Rutas direción
        this.rutaUsuarios = '/api/usuario';
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // parseo json
        this.app.use(express.json());
        // ruta de archivos
        this.app.use(express.static('public'));
    }

    routes(){
        // usuarios
        this.app.use(this.rutaUsuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => console.log(`port listening ${this.port}`))
    }
}

module.exports = Server;