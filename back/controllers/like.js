const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

//Afficher les likes d'un message
exports.getAllLike = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId },
        include: {
            model: db.User,
            attributes: ["lastName", "firstName"],
        },
    })
        .then((likePostFound) => {
            if (likePostFound) {
                res.status(200).json(likePostFound);
                console.log(likePostFound);
            } else {
                res.status(404).json({ error: "Aucun j'aime trouvé !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//Like d'un message
exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const isliked = req.body.like;
    db.Post.findOne({
        where: { id: req.params.postId },
    })
        .then((postfound) => {
            if (!postfound) {
                return res
                    .status(401)
                    .json({ error: "Aucun message trouvé !" });
            } else if (isliked == false) {
                db.Like.create({
                    postId: req.params.postId,
                    userId: userId,
                })
                    .then((response) => {
                        console.log(postfound.likes);

                        db.Post.update(
                            {
                                likes: postfound.likes + 1,
                            },
                            {
                                where: { id: req.params.postId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message: "Votre j'aime a été ajouté !",
                                })
                            )
                            .catch((error) =>
                                res.status(500).json({
                                    error: "Une erreur s'est produite pendant l'ajout de votre j'aime, veuillez recommencer ultérieurement.",
                                })
                            );
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
                        })
                    );
            } else if (isliked == true) {
                db.Like.destroy({
                    where: {
                        postId: req.params.postId,
                        userId: userId,
                    },
                })
                    .then(() => {
                        db.Post.update(
                            {
                                likes: postfound.likes - 1,
                            },
                            {
                                where: { id: req.params.postId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "Votre j'aime pas a été ajouté avec succès !",
                                })
                            )
                            .catch((error) =>
                                res.status(500).json({
                                    error: "Une erreur s'est produite pendant l'ajout de votre j'aime pas, veuillez recommencer ultérieurement.",
                                })
                            );
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                console.log("K.O");
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};
