//Importer express
const express = require("express");

//Créer un routeur
const router = express.Router();

//Importer le controllers sauce
const sauceCtrl = require("../controllers/sauceControllers");

////Importer le middleware multer
const multer = require('../middlewares/multer-config');

//Importer le middleware authentification
const auth = require("../middlewares/auth");

router.post("/", auth, multer, sauceCtrl.createSauce);//Route post pour ajouter une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);//Route put pour modifier une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);//Route delete pour supprimé une sauce
router.get("", auth, sauceCtrl.getListSauce);//Route get pour voir toutes les sauces
router.get("/:id", auth, sauceCtrl.getOneSauce);//Route get pour voir une sauce
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);//Route post pour liker une sauce

//Exporter le router
module.exports = router;
