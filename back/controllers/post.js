const fs = require("fs"); //importation de file system du package node, pour avoir accès aux différentes opérations lié au système de fichiers (ici les téléchargements et modifications d'images)
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

//Création d'un nouveau message
exports.createPost = (req, res, next) => {
    const content = req.body.content;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    //Vérification tous les champs complet
    if (content == null || content == "") {
        return res
            .status(400)
            .json({ error: "Veuillez remplir tout les champs" });
    }
    //Contrôle longueur du titre et contenu du message
    if (content.length <= 2) {
        return res.status(400).json({
            error: "Le contenu du message doit être d'au moins 3 caractères !",
        });
    }
    db.User.findOne({
        where: { id: userId },
    })
        .then((userFound) => {
            if (userFound) {
                const post = db.Post.build({
                    content: req.body.content,
                    imagePost: req.file
                        ? `${req.protocol}://${req.get(
                              "host"
                          )}/images/upload/posts/${req.file.filename}`
                        : req.body.imagePost,
                    UserId: userFound.id,
                });
                post.save()
                    .then(() =>
                        res.status(201).json({
                            message: "Votre message a été créé avec succès !",
                        })
                    )
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite pendant la création du message, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                return res.status(401).json({ error: "Utilisateur inconnu !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//Affichage tous les messages
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: db.User,
                attributes: ["lastName", "firstName", "profileAvatar"],
            },
            {
                model: db.Comment,
            },
        ],
    })
        .then((postFound) => {
            if (postFound) {
                res.status(200).json(postFound);
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

//Modification d'un message
exports.modifyPost = (req, res, next) => {
    console.log("file", req.file);
    console.log("content", req.body.content);
    console.log("bodypost", req.body.post);
    const postObject = req.file
        ? {
              content: req.body.content,
              imagePost: `${req.protocol}://${req.get(
                  "host"
              )}/images/upload/posts/${req.file.filename}`,
          }
        : { ...req.body };
    console.log("body", req.body);
    console.log(req.params.postId);
    db.Post.findOne({
        where: { id: req.params.postId },
    })
        .then((postFound) => {
            if (postFound) {
                db.Post.update(postObject, {
                    where: { id: req.params.postId },
                })
                    .then((post) =>
                        res.status(200).json({
                            message:
                                "Votre message a été modifié avec succès !",
                        })
                    )
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite pendant la modification de votre message, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                res.status(401).json({ error: "Aucun message trouvé !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//Suppression d'un message
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ["id"],
        where: { id: req.params.postId },
    })
        .then((post) => {
            if (post) {
                if (post.imagePost != null) {
                    const filename = post.imagePost.split(
                        "/images/upload/posts/"
                    )[1];
                    fs.unlink(`images/upload/posts/${filename}`, () => {
                        db.Post.destroy({
                            where: { id: req.params.postId },
                        })
                            .then(() =>
                                res.status(200).json({
                                    message:
                                        "Votre message a été supprimé avec succès !",
                                })
                            )
                            .catch(() =>
                                res.status(500).json({
                                    error: "Une erreur s'est produite pendant la suppression de votre message, veuillez recommencer ultérieurement.",
                                })
                            );
                    });
                } else {
                    db.Post.destroy({
                        where: { id: req.params.postId },
                    })
                        .then(() =>
                            res.status(200).json({
                                message:
                                    "Votre message a été supprimé avec succès !",
                            })
                        )
                        .catch(() =>
                            res.status(500).json({
                                error: "Une erreur s'est produite pendant la suppression de votre message, veuillez recommencer ultérieurement.",
                            })
                        );
                }
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
