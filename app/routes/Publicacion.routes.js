module.exports = app =>{
    const publicacion = require("../controllers/Publicacion.controller.js");

    app.post("/publicaciones",publicacion.create);

    app.get("/publicaciones",publicacion.findAll);

    app.get("/publicaciones/:publicacionId",publicacion.findOne);

    app.put("/publicaciones/:publicacionId",publicacion.update);

    app.delete("/publicaciones/:publicacionId",publicacion.delete);

    app.delete("/publicaciones",publicacion.deleteAll);
}