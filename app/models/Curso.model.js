const sql = require("./db.js");

const Curso = function(curso){
    this.master = curso.master;
    this.name = curso.name;
    this.semestre = curso.semestre;
    this.description = curso.description;
    this.active = curso.active;
    this.avatar = curso.avatar;
};

Curso.create = (newCurso, result) => {
    sql.query("INSERT INTO cursos SET ?", newCurso, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Curso creado: ", { id: res.insertId, ...newCurso });
      result(null, { id: res.insertId, ...newCurso });
    });
  };
  
  Curso.findById = (cursoId, result) => {
    sql.query(`SELECT * FROM cursos WHERE idCurso = ${cursoId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Curso encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Curso with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Curso.getAll = result => {
    sql.query("SELECT * FROM cursos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("cursos: ", res);
      result(null, res);
    });
  };
  Curso.getNames = (id,rol,result)=>{
    if(rol==0){
    sql.query(`SELECT idCurso,name from cursos where idCurso in (select idCurso from matriculas where idEstudiante=${id});`,(err,res) =>{
      if(err){
        console.log("error",err);
        result(err,null);
        return;
      }
      console.log("nombres",res);
      result(null,res);
     
    })}
    else{
      sql.query(`SELECT idCurso,name from cursos where master=${id};`,(err,res) =>{
        if(err){
          console.log("error",err);
          result(err,null);
          return;
        }
        console.log("nombres",res);
        result(null,res);
       
      })
    }
  };
  Curso.updateById = (id, curso, result) => {
    sql.query(
      "UPDATE cursos SET master = ?, name = ?, semestre = ?, active = ?, avatar= ?, description=? WHERE idCurso = ?",
      [curso.master, curso.name, curso.semestre,curso.active,curso.avatar,curso.description, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Curso with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...curso });
        result(null, { id: id, ...curso });
      }
    );
  };
  
  Curso.remove = (id, result) => {
    sql.query("DELETE FROM cursos WHERE idCurso = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Curso with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El curso fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Curso.removeAll = result => {
    sql.query("DELETE FROM cursos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`cursos borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Curso;