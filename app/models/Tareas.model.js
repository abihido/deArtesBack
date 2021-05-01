const sql = require("./db.js");

const Tarea = function(tarea){
    this.idmatriculas = tarea.idmatricula;
    this.descripcion = tarea.descripcion;
    this.estado=tarea.estado;
    this.creacion = tarea.creacion;
};

Tarea.create = (newTarea, result) => {
    sql.query("INSERT INTO tareas SET ?", newTarea, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Tarea creado: ", { id: res.insertId, ...newTarea });
      result(null, { id: res.insertId, ...newTarea });
    });
  };
  
  Tarea.findById = (tareaId, result) => {
    sql.query(`SELECT * FROM tareas WHERE idtareas = ${tareaId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Tarea encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tarea with the id
      result({ kind: "not_found" }, null);
    });
  };
  Tarea.getTareas = (idestudiante,result)=>{
    sql.query(`SELECT * from tareas where idmatriculas in (select idmatriculas from matriculas where idEstudiante=${idestudiante});`,(err,res) =>{
        if(err){
          console.log("error",err);
          result(err,null);
          return;
        }
        console.log("tareas",res);
        result(null,res);
       
      });
  };
  Tarea.getAll = result => {
    sql.query("SELECT * FROM tareas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tareas: ", res);
      result(null, res);
    });
  };
  
  Tarea.updateById = (id, tarea, result) => {
    sql.query(
      "UPDATE tareas SET idmatricula = ?, descripcion = ? , estado = ?, entrega = ?, archivo = ? WHERE idtareas = ?",
      [tarea.idmatricula, tarea.descripcion, tarea.estado,tarea.entrega,tarea.archivo, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tarea with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...tarea });
        result(null, { id: id, ...tarea });
      }
    );
  };
  
  Tarea.remove = (id, result) => {
    sql.query("DELETE FROM tareas WHERE idtareas = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tarea with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El tarea fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Tarea.removeAll = result => {
    sql.query("DELETE FROM tareas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`tareas borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Tarea;