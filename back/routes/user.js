const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/:id", auth, userCtrl.getUserProfile);
router.put("/:id", auth, multer, userCtrl.modifyUserProfile);
router.delete("/:id", auth, userCtrl.deleteAccount);

module.exports = router;
