module.exports = app =>{
    const maestro = require("../controllers/Maestro.controller.js");

    app.post("/maestros",maestro.create);

    app.get("/maestros",maestro.findAll);

    app.get("/maestros/:maestroId",maestro.findOne);

    app.put("/maestros/:maestroId",maestro.update);

    app.delete("/maestros/:maestroId",maestro.delete);

    app.delete("/maestros",maestro.deleteAll);
}