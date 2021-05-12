const Maestro = require("../models/Maestro.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const MaestroC = new Maestro({
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password,
        avatar: req.body.avatar
    });

    Maestro.create(MaestroC,(err,data) => {
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
    Maestro.getAll((err,data) =>{
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
    Maestro.findById(req.params.maestroId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el maestro con id ${req.params.maestroId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.maestroId
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

    Maestro.updateById(
        req.params.maestroId,
        new Maestro(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Maestro con la id ${req.params.maestroId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Maestro con id"+ req.params.maestroId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Maestro.remove(req.params.maestroId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Maestro con la id ${req.params.maestroId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Maestro con id"+ req.params.maestroId
                 });
             }
        }else res.send({ message: `El maestro fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Maestro.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los maestros"
            });
        }
        else res.send({
            message: "todos los maestros fueron borrados"
        });
    });
};

