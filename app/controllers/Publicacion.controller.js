const Publicacion = require("../models/Publicacion.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const PublicacionC = new Publicacion({
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        imagen : req.body.imagen,
        link : req.body.link,
        rol : req.body.rol
    });
    
    Publicacion.create(PublicacionC,(err,data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });       
        }
        else{ res.send(data);}
    });
};

exports.findAll = (req,res) => {
    Publicacion.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else res.send(data);
    })
};

exports.findOne = (req,res) => {
    Publicacion.findById(req.params.publicacionId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro la publicacion con id ${req.params.publicacionId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con la publicacion "+req.params.publicacionId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    Publicacion.updateById(
        req.params.publicacionId,
        new Publicacion(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Publicacion con la id ${req.params.publicacionId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Publicacion con id"+ req.params.publicacionId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Publicacion.remove(req.params.publicacionId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Publicacion con la id ${req.params.publicacionId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Publicacion con id"+ req.params.publicacionId
                 });
             }
        }else res.send({ message: `El publicacion fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Publicacion.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian las publicacions"
            });
        }
        else res.send({
            message: "todos las publicacions fueron borrados"
        });
    });
};

