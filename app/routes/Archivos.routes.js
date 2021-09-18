module.exports = app =>{
    const Archivo = require("../controllers/Archivo.controller.js");

    app.get("/Archivos/",Archivo.getToken);

    app.get("/Archivos/callback",Archivo.callback);
    app.get("/Archivos/list",Archivo.list);
    app.get("/Archivos/list/videos",Archivo.listVideos);
    app.get("/Archivos/list/clases",Archivo.listClases);
    app.get("/Archivos/list/audios",Archivo.listAudios);
    app.get("/Archivos/list/documentos",Archivo.listDocumentos);
    app.get("/Archivos/download",Archivo.downloadFile);
}