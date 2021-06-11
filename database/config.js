const mongoose = require('mongoose');

const dbConecction = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Base de datos online");
    }catch(error){
        console.log(error);
        throw new Error('Error al inciar conexion')
    }
}

module.exports = {
    dbConecction
}