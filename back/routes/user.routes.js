const express = require("express");
const router = express.Router();

// Middlewares
const multer = require("../middleware/multerUser");

// Controllers
const userCtrl = require("../controllers/user");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
