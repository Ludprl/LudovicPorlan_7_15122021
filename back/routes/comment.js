const express = require("express");
const router = express.Router(); //on crée un router avec la méthode d'express
const commentCtrl = require("../controllers/comment"); //on importe les controllers, on associe les fonctions aux différentes routes
const auth = require("../middleware/auth"); //on importe le middleware pour l'ajouter sur les routes que l'on veut protéger

router.post("/:postId", auth, commentCtrl.createComment);
router.get("/:postId", auth, commentCtrl.getAllComments);
router.delete("/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
