const Tarea = require("../models/Tareas.model.js");
const date= require('moment');



exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }
    const date = date().format("YYYY-MM-DD");

    const TareaC = new Tarea({
        idmatricula : req.body.idmatricula,
        descripcion : req.body.descripcion,
        estado:req.body.estado,
        creacion : date
    });

    Tarea.create(TareaC,(err,data) => {
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
    Tarea.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else res.send(data);
    })
};

exports.getTareas = (req,res) =>{
    Tarea.getTareas(req.params.idestudiante,(err,data) =>{
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
    Tarea.findById(req.params.tareaId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el tarea con id ${req.params.tareaId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.tareaId
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

    Tarea.updateById(
        req.params.tareaId,
        new Tarea(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Tarea con la id ${req.params.tareaId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Tarea con id"+ req.params.tareaId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Tarea.remove(req.params.tareaId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Tarea con la id ${req.params.tareaId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Tarea con id"+ req.params.tareaId
                 });
             }
        }else res.send({ message: `La tarea fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Tarea.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian las tareas"
            });
        }
        else res.send({
            message: "todos las tareas fueron borrados"
        });
    });
};

