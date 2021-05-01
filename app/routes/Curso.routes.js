module.exports = app =>{
    const curso = require("../controllers/Curso.controller.js");

    app.post("/cursos",curso.create);

    app.get("/cursos",curso.findAll);
    
    app.get("/cursos/nombres/:id",curso.findNames);

    app.get("/cursos/:cursoId",curso.findOne);

    app.put("/cursos/:cursoId",curso.update);

    app.delete("/cursos/:cursoId",curso.delete);

    app.delete("/cursos",curso.deleteAll);
}