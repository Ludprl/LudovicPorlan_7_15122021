const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");

//récupérer tout les comptes utilisateur
exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        attributes: { exclude: ["password"] },
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
            "bio",
            "email",
            "admin",
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
    // recherche de l'utilisateur avec son userId
    db.User.findOne({
        where: { id: userId },
    })
        .then((userFound) => {
            // On vérifie que l'utilisateur est bien propriétaire du compte
            if (userFound.id === userId) {
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
                    //on supprime l'ancienne image
                    fs.unlinkSync(`images/upload/avatars/${oldFile}`);
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
                            message: "Votre profil a été modifié avec succès !",
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
    const id = req.params.id;
    db.User.findOne({
        attributes: ["id"],
        where: { id: id },
    })
        .then((user) => {
            if (user.profileAvatar != null) {
                const filename = user.profileAvatar.split(
                    "/images/upload/avatars/"
                )[1];
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
            } else if (user) {
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
