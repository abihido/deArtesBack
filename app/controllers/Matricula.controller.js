const Matricula = require("../models/Matricula.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const MatriculaC = new Matricula({
        idestudiante: req.body.idestudiante,
        idcurso: req.body.idcurso,
        semestre: req.body.semestre
    });

    Matricula.create(MatriculaC,(err,data) => {
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
    Matricula.getAll((err,data) =>{
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
    Matricula.findById(req.params.matriculaId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el matricula con id ${req.params.matriculaId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.matriculaId
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

    Matricula.updateById(
        req.params.matriculaId,
        new Matricula(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Matricula con la id ${req.params.matriculaId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Matricula con id"+ req.params.matriculaId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Matricula.remove(req.params.matriculaId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Matricula con la id ${req.params.matriculaId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Matricula con id"+ req.params.matriculaId
                 });
             }
        }else res.send({ message: `El matricula fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Matricula.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian las matriculas"
            });
        }
        else res.send({
            message: "todos las matriculas fueron borrados"
        });
    });
};

