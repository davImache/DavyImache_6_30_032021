const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const sauceRoutes = require("./routes/sauceRoutes");
const path = require("path");
const helmet = require("helmet");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;

// //Importer express
// const express = require('express');

// //Création de l'application expresss
// const app = express();

// //Importer le routeur utilisateur
// const userRoutes  = require("./routes/userRoutes");

// //Importer le routeur sauce
// const sauceRoutes  = require("./routes/sauceRoutes");

// //Accès au chemin du sytème de fichiers
// const path = require('path');

// //Importer helmet
// const helmet = require("helmet");

// /*Ajout de middlewares pour enlever la sécurité CORS
// et permettre à l'application d'accédez à l'API */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
//   next();
// });

// //Définit l'en-tête Content-Security-Policy pour la protection
// app.use(helmet());

// app.use(express.json());

// //Accès aux routes images, utilisateur et sauce
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use("/api/auth", userRoutes);
// app.use("/api/sauces", sauceRoutes);

// module.exports = app;
