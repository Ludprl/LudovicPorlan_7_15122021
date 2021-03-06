const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");

//récupérer tout les comptes utilisateur
exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        attributes: { exclude: ["password", "admin", "email"] },
        order: [["createdAt", "DESC"]],
    })
        .then((usersFound) => {
            if (usersFound) {
                res.status(200).json(usersFound);
            } else {
                res.status(401).json({ error: "Aucun utilisateur trouvé !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite pendant le chargement des utilisateurs",
            })
        );
};

//Avoir les informations d'un compte
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: [
            "id",
            "lastName",
            "firstName",
            "admin",
            "bio",
            "email",
            "profileAvatar",
            "createdAt",
            "updatedAt",
        ],
        where: { id: id },
    })
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: "Utilisateur inconnu !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//Modification d'un compte
exports.modifyUserProfile = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const isUserAdmin = decodedToken.admin;
    // recherche de l'utilisateur avec son userId
    db.User.findOne({
        where: { id: userId },
    })
        .then((userFound) => {
            // On vérifie que l'utilisateur est bien propriétaire du compte
            if ((userFound.id === userId) | isUserAdmin) {
                if (req.body.admin) {
                    return res.status(401).json({
                        error: "Vous n'avez pas l'autorisation d'effectuer cette action.",
                    });
                }
                if (req.file) {
                    const oldFile = userFound.profileAvatar.split(
                        "/images/upload/avatars/"
                    )[1];
                    const userObject = req.file
                        ? {
                              ...JSON.parse(userId),
                              profileAvatar: `${req.protocol}://${req.get(
                                  "host"
                              )}/images/upload/avatars/${req.file.filename}`, //on modifie l'image URL
                          }
                        : { ...req.body };
                    //on supprime l'ancienne image seulement si elle existe
                    if (oldFile !== "icon-default-avatar.png") {
                        fs.unlinkSync(`images/upload/avatars/${oldFile}`);
                    }
                    db.User.update(userObject, {
                        //on modifie le compte dans la db
                        where: { id: userId },
                    })
                        .then(() =>
                            res.status(200).json({
                                message:
                                    "Votre photo de profil a été modifiée avec succès !",
                            })
                        )
                        .catch(() =>
                            res.status(400).json({
                                error: "Une erreur s'est produite pendant la modification du profil, veuillez recommencer ultérieurement.",
                            })
                        );
                } else {
                    const userObject = req.body;
                    db.User.update(userObject, {
                        where: { id: userId },
                    }).then(() =>
                        res.status(200).json({
                            message:
                                "Votre profil a été modifié avec succès !!",
                        })
                    );
                }
            } else {
                res.status(401).json({ error: "Utilisateur inconnu !" });
            }
        })
        .catch(
            (error) => (
                res.status(500).json({
                    error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
                }),
                console.log(error)
            )
        );
};

//Suppression d'un compte

exports.deleteAccount = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const isUserAdmin = decodedToken.admin;
    const id = req.params.id;
    if (userId == id || isUserAdmin) {
        // On s'occupe des likes
        db.Like.destroy({
            where: { userId: req.params.id },
        });
        // On s'occupe des commentaires
        db.Comment.destroy({
            where: { userId: req.params.id },
        });
        // on s'occupe des posts de l'utilisateur.
        db.Post.findAll({
            where: { userId: req.params.id },
        })
            .then((post) => {
                if (post) {
                    for (let i = 0; i < post.length; i++) {
                        // On s'occupe des likes
                        db.Like.destroy({
                            where: { postId: post[i].dataValues.id },
                        });
                        // On s'occupe des commentaires
                        db.Comment.destroy({
                            where: { postId: post[i].dataValues.id },
                        });
                        // on s'occupe du post en lui même.
                        // Suppression des images de chaque post

                        if (post[i].imagePost !== null) {
                            const postFilename = post[
                                i
                            ].dataValues.imagePost.split(
                                "/images/upload/posts/"
                            )[1];
                            fs.unlink(
                                `images/upload/posts/${postFilename}`,
                                () => {
                                    db.Post.destroy({
                                        where: { id: post[i].dataValues.id },
                                    });
                                }
                            );
                        } else {
                            db.Post.destroy({
                                where: { id: post[i].dataValues.id },
                            });
                        }
                    }
                }
            })
            .then(() => {
                // et enfin de l'utilisateur
                db.User.findOne({
                    where: { id: id },
                }).then((user) => {
                    const filename = user.profileAvatar.split(
                        "/images/upload/avatars/"
                    )[1];

                    if (filename !== "icon-default-avatar.png") {
                        fs.unlink(`images/upload/avatars/${filename}`, () => {
                            db.User.destroy({
                                where: { id: id },
                            })
                                .then(() =>
                                    res.status(200).json({
                                        message:
                                            "Votre compte a été supprimé avec succès !",
                                    })
                                )
                                .catch(() =>
                                    res.status(500).json({
                                        error: "Une erreur s'est produite pendant la suppression du compte, veuillez recommencer ultérieurement.",
                                    })
                                );
                        });
                    } else {
                        db.User.destroy({
                            where: { id: id },
                        })
                            .then(() =>
                                res.status(200).json({
                                    message:
                                        "Votre compte a été supprimé avec succès !",
                                })
                            )
                            .catch((err) => console.log(err));
                    }
                });
            });
    } else {
        res.status(403).json({
            error: "Cette opération est interdite",
        });
    }
};
