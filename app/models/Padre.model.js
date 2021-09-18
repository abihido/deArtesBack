const sql = require("./db.js");

const Padre = function(padre){
    this.mail = padre.mail;
    this.name = padre.name;
    this.password = padre.password;
    this.avatar = padre.avatar;
    this.idEstudiante = padre.idEstudiante;

    this.documento=padre.documento;
    this.parentesco= padre.parentesco;
    this.celular= padre.celular;
    this.telefono= padre.telefono;
};

Padre.create = (newPadre, result) => {
    sql.query("INSERT INTO padres SET ?", newPadre, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Padre creado: ", { id: res.insertId, ...newPadre });
      result(null, { id: res.insertId, ...newPadre });
    });
  };
  
  Padre.findById = (padreId, result) => {
    sql.query(`SELECT * FROM padres WHERE idPadres = ${padreId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Padre encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Padre with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Padre.getAll = result => {
    sql.query("SELECT * FROM padres", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("padres: ", res);
      result(null, res);
    });
  };
  
  Padre.updateById = (id, padre, result) => {
    sql.query(
      "UPDATE padres SET mail = ?, name = ?, password = ?,avatar=?,documento=?,parentesco=?,celular=?,telefono=? WHERE idPadres = ?",
      [padre.mail, padre.name, padre.password, padre.avatar,padre.documento,padre.parentesco,padre.celular,padre.telefono , id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Padre with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...padre });
        result(null, { id: id, ...padre });
      }
    );
  };
  
  Padre.remove = (id, result) => {
    sql.query("DELETE FROM padres WHERE idPadres = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Padre with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El padre fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Padre.removeAll = result => {
    sql.query("DELETE FROM padres", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`padres borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Padre;