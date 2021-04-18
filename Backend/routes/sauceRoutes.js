const express = require("express");
const router = express.Router();
const app = express();
const sauceCtrl = require("../controllers/sauceControllers");
const multer = require('../middlewares/multer-config');
const auth = require("../middlewares/auth");

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("", auth, sauceCtrl.getListSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);


module.exports = router;
