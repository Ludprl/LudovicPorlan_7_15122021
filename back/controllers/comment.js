const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

//Création d'un nouveau commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    db.Post.findOne({
        where: { id: req.params.postId },
    })
        .then((postFound) => {
            if (postFound) {
                const comment = db.Comment.build({
                    content: req.body.content,
                    postId: postFound.id,
                    userId: userId,
                });
                comment
                    .save()
                    .then(() =>
                        res.status(201).json({
                            message:
                                "Votre commentaire a été créé avec succès !",
                        })
                    )
                    .catch((error) =>
                        res.status(400).json({
                            error: "Une erreur s'est produite pendant la création de votre commentaire, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                return res
                    .status(401)
                    .json({ error: "Aucun message trouvé !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//Affichage des commentaires
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [
            ["updatedAt", "ASC"],
            ["createdAt", "ASC"],
        ],
        where: { postId: req.params.postId },
        include: [
            {
                model: db.User,
                attributes: ["firstName", "lastName", "profileAvatar"],
            },
        ],
    })
        .then((commentFound) => {
            if (commentFound) {
                res.status(200).json(commentFound);
            } else {
                res.status(401).json({ error: "Aucun commentaire trouvé !" });
            }
        })
        .catch((error) => {
            res.status(500).send({
                error: "Une erreur s'est produite pendant la recherche des commentaires, veuillez recommencer ultérieurement.",
            });
        });
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const isUserAdmin = decodedToken.admin;
    db.Comment.findOne({
        where: { id: req.params.commentId },
    })
        .then((commentFound) => {
            if (commentFound.userId === userId || isUserAdmin) {
                if (commentFound) {
                    db.Comment.destroy({
                        where: { id: req.params.commentId },
                    })
                        .then(() =>
                            res.status(200).json({
                                message:
                                    "Votre commentaire a été supprimé avec succès !",
                            })
                        )
                        .catch(() =>
                            res.status(500).json({
                                error: "Une erreur s'est produite pendant la suppression de votre commentaire, veuillez recommencer ultérieurement.",
                            })
                        );
                } else {
                    return res
                        .status(401)
                        .json({ error: "Aucun commentaire trouvé !" });
                }
            } else {
                res.status(403).json({
                    error: "Cette opération est interdite",
                });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//modification d'un commentaire
exports.editComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const isUserAdmin = decodedToken.admin;
    const commentObject = {
        content: req.body.content,
    };

    db.Comment.findOne({
        where: { id: req.body.commentId },
    })
        .then((commentFound) => {
            if (commentFound.userId === userId || isUserAdmin) {
                if (commentFound) {
                    db.Comment.update(commentObject, {
                        where: { id: req.body.commentId },
                    })
                        .then((comment) =>
                            res.status(200).json({
                                message:
                                    "Votre commentaire a été modifié avec succès !",
                            })
                        )
                        .catch((error) =>
                            res.status(500).json({
                                error: "Une erreur s'est produite pendant la modification de votre commentaire, veuillez recommencer ultérieurement.",
                            })
                        );
                } else {
                    res.status(401).json({ error: "Aucun message trouvé !" });
                }
            } else {
                res.status(403).json({
                    error: "Cette opération est interdite",
                });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};
