const express = require("express");
const server = express();
const routes = require("./routes.js");
const path = require("path");

server.set('view engine', 'ejs');

// Mudar local da pasta views
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos estaticos
server.use(express.static("public"));

//usar req.body
server.use(express.urlencoded({ extended: true }))

server.use(routes);

server.listen(3000, () => console.log("Servidor iniciou"));