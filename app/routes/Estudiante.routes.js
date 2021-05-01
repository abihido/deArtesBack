module.exports = app =>{
    const estudiante = require("../controllers/Estudiante.controller.js");

    app.post("/estudiantes",estudiante.create);

    app.post("/estudiantes/:mail",estudiante.confirm);

    app.get("/estudiantes",estudiante.findAll);

    app.get("/estudiantes/:estudianteId",estudiante.findOne);

    app.put("/estudiantes/:estudianteId",estudiante.update);

    app.delete("/estudiantes/:estudianteId",estudiante.delete);

    app.delete("/estudiantes",estudiante.deleteAll);
}