const { response } = require("express");

const esAdminRole = (req, res=response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quire verificar el role sin el token"
        })
    }

    const {rol, nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }
    
    next();
}

module.exports = {
    esAdminRole
}