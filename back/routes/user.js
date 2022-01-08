const express = require("express");
const router = express.Router(); //on crée un router avec la méthode mise à disposition par Express
const userCtrl = require("../controllers/user"); //contrôleur pour associer les fonctions aux différentes routes
const auth = require("../middleware/auth"); //on importe le middleware pour l'ajouter sur les routes que l'on veut protéger
const multer = require("../middleware/multer-config"); //on importe le middleware pour le téléchargement des images, pour la route post quand on crée un nouvel objet

router.get("/:id", auth, userCtrl.getUserProfile);
router.put("/:id", auth, multer, userCtrl.modifyUserProfile);
router.delete("/:id", auth, userCtrl.deleteAccount);

module.exports = router;
