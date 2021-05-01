const sql = require("./db.js");

const Publicacion = function(publicacion){
    this.titulo = publicacion.titulo;
    this.descripcion = publicacion.descripcion;
    this.imagen = publicacion.imagen;
    this.link = publicacion.link;
    this.rol = publicacion.rol;
};

Publicacion.create = (newPublicacion, result) => {
    sql.query("INSERT INTO publicaciones SET ?", newPublicacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Publicacion creada: ", { id: res.insertId, ...newPublicacion });
      result(null, { id: res.insertId, ...newPublicacion });
    });
  };
  
  Publicacion.findById = (publicacionId, result) => {
    sql.query(`SELECT * FROM publicaciones WHERE idpublicaciones = ${publicacionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Publicacion encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Publicacion with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Publicacion.getAll = result => {
    sql.query("SELECT * FROM publicaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("publicaciones: ", res);
      result(null, res);
    });
  };
  Publicacion.updateById = (id, publicacion, result) => {
    sql.query(
      "UPDATE publicaciones SET titulo = ?, descripcion = ?, imagen = ?, link = ?, rol =? WHERE idpublicaciones = ?",
      [publicacion.titulo, publicacion.descripcion, publicacion.imagen,publicacion.link,publicacion.rol, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Publicacion with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...publicacion });
        result(null, { id: id, ...publicacion });
      }
    );
  };
  
  Publicacion.remove = (id, result) => {
    sql.query("DELETE FROM publicaciones WHERE idpublicaciones = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Publicacion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El publicacion fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Publicacion.removeAll = result => {
    sql.query("DELETE FROM publicaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`publicaciones borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Publicacion;