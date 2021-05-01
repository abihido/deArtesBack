const sql = require("./db.js");

const Maestro = function(maestro){
    this.mail = maestro.mail;
    this.name = maestro.name;
    this.password = maestro.password;
};

Maestro.create = (newMaestro, result) => {
    sql.query("INSERT INTO maestros SET ?", newMaestro, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Maestro creado: ", { id: res.insertId, ...newMaestro });
      result(null, { id: res.insertId, ...newMaestro });
    });
  };
  
  Maestro.findById = (maestroId, result) => {
    sql.query(`SELECT * FROM maestros WHERE idMaestros = ${maestroId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Maestro encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Maestro with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Maestro.getAll = result => {
    sql.query("SELECT * FROM maestros", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("maestros: ", res);
      result(null, res);
    });
  };
  
  Maestro.updateById = (id, maestro, result) => {
    sql.query(
      "UPDATE maestros SET mail = ?, name = ?, password = ? WHERE idMaestros = ?",
      [maestro.mail, maestro.name, maestro.password, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Maestro with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...maestro });
        result(null, { id: id, ...maestro });
      }
    );
  };
  
  Maestro.remove = (id, result) => {
    sql.query("DELETE FROM maestros WHERE idMaestros = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Maestro with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El maestro fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Maestro.removeAll = result => {
    sql.query("DELETE FROM maestros", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`maestros borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Maestro;