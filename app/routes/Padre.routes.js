module.exports = app =>{
    const padre = require("../controllers/Padre.controller.js");

    app.post("/padres",padre.create);

    app.get("/padres",padre.findAll);

    app.get("/padres/:padreId",padre.findOne);

    app.put("/padres/:padreId",padre.update);

    app.delete("/padres/:padreId",padre.delete);

    app.delete("/padres",padre.deleteAll);
}