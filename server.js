const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));

app.get("/",(req,res) => {
    res.json({message:"que onda"});
});

require("./app/routes/Estudiante.routes.js")(app);
require("./app/routes/Padre.routes.js")(app);
require("./app/routes/Matricula.routes.js")(app);
require("./app/routes/Maestro.routes.js")(app);
require("./app/routes/Curso.routes.js")(app);
require("./app/routes/Tareas.routes.js")(app);
require("./app/routes/Publicacion.routes.js")(app);
require("./app/routes/Archivos.routes.js")(app);

/////////////////////////////////////////////////

///////////////////////////////////////////////////









app.listen(3000,() => {
    console.log("server is running on port 3000");
});