const Curso = require("../models/Curso.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const CursoC = new Curso({
        master: req.body.master,
        name: req.body.name,
        semestre: req.body.semestre,
        active: req.body.active,
        avatar: req.body.avatar,
        description: req.body.description
    });

    Curso.create(CursoC,(err,data) => {
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
    Curso.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else res.send(data);
    })
};

exports.findNames= (req,res)=>{
    Curso.getNames(req.params.id,req.params.rol,(err,data)=>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else{
            res.status(200).send(data);
        }
    })
};



exports.findOne = (req,res) => {
    Curso.findById(req.params.cursoId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el curso con id ${req.params.cursoId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.cursoId
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

    Curso.updateById(
        req.params.cursoId,
        new Curso(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Curso con la id ${req.params.cursoId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Curso con id"+ req.params.cursoId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Curso.remove(req.params.cursoId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Curso con la id ${req.params.cursoId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Curso con id"+ req.params.cursoId
                 });
             }
        }else res.send({ message: `El curso fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Curso.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los cursos"
            });
        }
        else res.send({
            message: "todos los cursos fueron borrados"
        });
    });
};

