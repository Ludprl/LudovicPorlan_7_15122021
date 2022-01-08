const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.signup); // Nouvel utilisateur
router.post("/login", authController.login); // Connexion d'un utilisateur

module.exports = router;
