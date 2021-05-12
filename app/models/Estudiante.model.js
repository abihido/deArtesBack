const sql = require("./db.js");

const Estudiante = function(estudiante){
    this.mail = estudiante.mail;
    this.name = estudiante.name;
    this.password = estudiante.password;
    this.avatar =estudiante.avatar;
    
};

Estudiante.create = (newEstudiante, result) => {
    sql.query("INSERT INTO estudiantes SET ?", newEstudiante, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Estudiante creado: ", { id: res.insertId, ...newEstudiante });
      result(null, { id: res.insertId, ...newEstudiante });
    });
  };
  
  Estudiante.findById = (estudianteId, result) => {
    sql.query(`SELECT * FROM estudiantes WHERE idEstudiantes = ${estudianteId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Estudiante encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Estudiante with the id
      result({ kind: "not_found" }, null);
    });
  };
  Estudiante.Confirm = (mail,password,result) =>{
    sql.query(`SELECT * FROM usuarios WHERE mail="${mail}"`,(err,res) =>{
      if(err){
        console.log("error:",err);
        result(err, null);
        return;
      }
      if(res.length){
        if(res[0].password===password){
          delete res[0].password;
          result(null,res[0]);
          return;
        }
        else{
          console.log("contraseña equivocada");
          result(null,false);
          return;
        }
      }

      result({ kind: "not_found" }, null);
    });
  }
  Estudiante.getAll = result => {
    sql.query("SELECT * FROM estudiantes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("estudiantes: ", res);
      result(null, res);
    });
  };
  
  Estudiante.updateById = (id, estudiante, result) => {
    sql.query(
      "UPDATE estudiantes SET mail = ?, name = ?, password = ?, avatar = ? WHERE idEstudiantes = ?",
      [estudiante.mail, estudiante.name, estudiante.password, estudiante.avatar, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Estudiante with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...estudiante });
        result(null, { id: id, ...estudiante });
      }
    );
  };
  
  Estudiante.remove = (id, result) => {
    sql.query("DELETE FROM estudiantes WHERE idEstudiantes = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Estudiante with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El estudiante fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Estudiante.removeAll = result => {
    sql.query("DELETE FROM estudiantes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`estudiantes borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Estudiante;