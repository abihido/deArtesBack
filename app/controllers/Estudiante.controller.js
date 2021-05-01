const Estudiante = require("../models/Estudiante.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const EstudianteC = new Estudiante({
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    });

    Estudiante.create(EstudianteC,(err,data) => {
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
    Estudiante.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else res.send(data);
    })
};
exports.confirm=(req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    Estudiante.Confirm(req.params.mail,req.body.password,(err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el estudiante con email ${req.params.mail}` 
                });
            }
            else {
                console.log("error: ", err);
                res.status(500).send({
                    message: "error con el usuario "+req.params.mail

                });
            }            
        }
        else{
            res.send(data);
        }
    }); 
};
exports.findOne = (req,res) => {
    Estudiante.findById(req.params.estudianteId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el estudiante con id ${req.params.estudianteId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.estudianteId
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

    Estudiante.updateById(
        req.params.estudianteId,
        new Estudiante(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Estudiante con la id ${req.params.estudianteId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Estudiante con id"+ req.params.estudianteId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Estudiante.remove(req.params.estudianteId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Estudiante con la id ${req.params.estudianteId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Estudiante con id"+ req.params.estudianteId
                 });
             }
        }else res.send({ message: `El estudiante fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Estudiante.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los estudiantes"
            });
        }
        else res.send({
            message: "todos los estudiantes fueron borrados"
        });
    });
};

