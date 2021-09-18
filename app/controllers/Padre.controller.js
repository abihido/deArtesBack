const Padre = require("../models/Padre.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const PadreC = new Padre({
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password,
        avatar: req.body.avatar,
        idEstudiante: req.body.idEstudiante,
        
        documento :req.body.documento,
        parentesco: req.body.parentesco,
        celular: req.body.celular,
        telefono: req.body.telefono,

    });

    Padre.create(PadreC,(err,data) => {
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
    Padre.getAll((err,data) =>{
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
    Padre.findById(req.params.padreId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el padre con id ${req.params.padreId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.padreId
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

    Padre.updateById(
        req.params.padreId,
        new Padre(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Padre con la id ${req.params.padreId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Padre con id"+ req.params.padreId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Padre.remove(req.params.padreId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Padre con la id ${req.params.padreId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Padre con id"+ req.params.padreId
                 });
             }
        }else res.send({ message: `El padre fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Padre.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los padres"
            });
        }
        else res.send({
            message: "todos los padres fueron borrados"
        });
    });
};

