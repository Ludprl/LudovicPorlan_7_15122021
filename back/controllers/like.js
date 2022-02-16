const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
// récupérer tout les likes
//Affichage tous les messages
exports.getAllLikes = (req, res, next) => {
    db.Like.findAll({
        order: [["createdAt", "DESC"]],
    })
        .then((likesFound) => {
            if (likesFound) {
                res.status(200).json(likesFound);
            } else {
                res.status(401).json({ error: "Aucun message trouvé !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite pendant l'affichage des messages, veuillez recommencer ultérieurement.",
            })
        );
};

// afficher les likes d'un message
exports.getPostLikes = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId },
        include: {
            model: db.User,
            attributes: ["lastName", "firstName"],
        },
    })
        .then((likesPostFound) => {
            if (likesPostFound) {
                res.status(200).json(likesPostFound);
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
//aimer un message
exports.likePost = (req, res, next) => {
    const decodedToken = jwt.decode(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_TOKEN
    );
    const userId = decodedToken.userId;
    const isliked = req.body.like;
    db.Post.findOne({
        where: { id: req.params.postId },
    })
        .then((postFound) => {
            if (!postFound) {
                return res
                    .status(401)
                    .json({ error: "Aucun message trouvé !" });
            } else if (isliked == false) {
                db.Like.create({
                    postId: req.params.postId,
                    userId: userId,
                })
                    .then((response) => {
                        db.Post.update(
                            {
                                likes: postFound.likes + 1,
                            },
                            {
                                where: { id: req.params.postId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "Votre j'aime a été ajouté avec succès !",
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
                                likes: postFound.likes - 1,
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
