//Importer express
const express = require('express');

//Créer un routeur
const router = express.Router();

//Importer le controller utilisateur
const userCtrl = require("../controllers/userControllers"); 

// Route post pour créer un compte
router.post("/signup", userCtrl.signup);

// Route post pour se connecter au compte
router.post("/login", userCtrl.login);

//Exporter le router
module.exports = router;
