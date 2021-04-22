//Importer le package http de Node
const http = require("http");

//Importer l'application app
const app = require("./app");

//Importer les bases de donnée
require("dotenv").config({ path: "./config/.env" });
require("./config/dbConfig");

//Dire à l'application sur quel port elle doit être lancée
app.set("port", process.env.PORT || 3000);

//Crée le server
const server = http.createServer(app);

//Dire le port que le serveur doit utiliser
server.listen(process.env.PORT || 3000);


