const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const likeCtrl = require("../controllers/like");
const auth = require("../middlewares/auth");
const multerP = require("../middlewares/multerPost");

router.post("", auth, multerP, postCtrl.createPost);
router.get("", auth, postCtrl.getAllPosts);
router.put("/:postId", auth, multerP, postCtrl.modifyPost);
router.delete("/:postId", auth, postCtrl.deletePost);
router.post("/:postId/like", auth, likeCtrl.likePost);
router.get("/:postId/like", auth, likeCtrl.getAllLike);

module.exports = router;
