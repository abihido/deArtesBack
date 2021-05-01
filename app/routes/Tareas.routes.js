module.exports = app =>{
    const tarea = require("../controllers/Tareas.controller.js");

    app.post("/tareas",tarea.create);

    app.get("/tareas",tarea.findAll);

    app.get("/tareas/resumen",tarea.getTareas);

    app.get("/tareas/:tareaId",tarea.findOne);

    app.put("/tareas/:tareaId",tarea.update);

    app.delete("/tareas/:tareaId",tarea.delete);

    app.delete("/tareas",tarea.deleteAll);
}