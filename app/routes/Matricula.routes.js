module.exports = app =>{
    const matricula = require("../controllers/Matricula.controller.js");

    app.post("/matriculas",matricula.create);

    app.get("/matriculas",matricula.findAll);

    app.get("/matriculas/:matriculaId",matricula.findOne);

    app.put("/matriculas/:matriculaId",matricula.update);

    app.delete("/matriculas/:matriculaId",matricula.delete);

    app.delete("/matriculas/:estudianteId/:cursoId",matricula.deleteByStudent);

}