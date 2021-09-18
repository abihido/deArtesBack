const sql = require("./db.js");

const Matricula = function(matricula){
    this.idestudiante = matricula.idestudiante;
    this.idcurso = matricula.idcurso;
    this.semestre = matricula.semestre;
};

Matricula.create = (newMatricula, result) => {
    sql.query("INSERT INTO matriculas SET ?", newMatricula, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Matricula creado: ", { id: res.insertId, ...newMatricula });
      result(null, { id: res.insertId, ...newMatricula });
    });
  };
  
  Matricula.findById = (matriculaId, result) => {
    sql.query(`DELETE FROM matriculas WHERE idMatriculas = ${matriculaId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Matricula encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Matricula with the id
      result({ kind: "not_found" }, null);
    });
  };
  Matricula.deleteByStudent = (estudianteId,cursoId, result) => {
    sql.query(`DELETE  FROM matriculas WHERE idEstudiante = ${estudianteId} and idCurso = ${cursoId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Matricula with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El matricula fue borrado");
      result(null, res);
    });
  };

  Matricula.getAll = result => {
    sql.query("SELECT * FROM matriculas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("matriculas: ", res);
      result(null, res);
    });
  };
  
  Matricula.updateById = (id, matricula, result) => {
    sql.query(
      "UPDATE matriculas SET idestudiante = ?, idcurso = ?, semestre = ? WHERE idMatriculas = ?",
      [matricula.idestudiante, matricula.idcurso, matricula.semestre, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Matricula with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...matricula });
        result(null, { id: id, ...matricula });
      }
    );
  };
  
  Matricula.remove = (id, result) => {
    sql.query("DELETE FROM matriculas WHERE idMatriculas = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Matricula with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El matricula fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Matricula.removeAll = result => {
    sql.query("DELETE FROM matriculas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`matriculas borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Matricula;