const jwt = require("jsonwebtoken");
const db = require("../models");
const CryptoJS = require("crypto-js"); //on utilise le package cryptojs pour hash l'email
require("dotenv").config();

//Clés CryptoJS
const key = CryptoJS.enc.Utf8.parse(process.env.email_SecretKey);
const iv = CryptoJS.enc.Utf8.parse(process.env.email_SecretKey2);

//Avoir les informations d'un compte
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: [
            "id",
            "lastName",
            "firstName",
            "email",
            "admin",
            "profileAvatar",
            "createdAt",
        ],
        where: { id: id },
    })
        .then((user) => {
            if (user) {
                const decryptedEmail = CryptoJS.AES.decrypt(user.email, key, {
                    iv: iv,
                }).toString(CryptoJS.enc.Utf8);
                user.email = decryptedEmail;
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
    const decodedToken = jwt.decode(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_TOKEN
    );
    const userId = decodedToken.userId;
    req.body.user = userId;
    console.log("bodyUser", req.body.user);
    const userObject = req.file
        ? {
              ...JSON.parse(req.body.user),
              profileAvatar: `${req.protocol}://${req.get(
                  "host"
              )}/images/upload/avatars/${req.file.filename}`,
          }
        : { ...req.body };
    db.User.findOne({
        where: { id: userId },
    })
        .then((userFound) => {
            if (userFound) {
                db.User.update(userObject, {
                    where: { id: userId },
                })
                    .then((user) =>
                        res.status(200).json({
                            message: "Votre profil a été modifié avec succès !",
                        })
                    )
                    .catch((error) =>
                        res.status(400).json({
                            error: "Une erreur s'est produite pendant la modification du profil, veuillez recommencer ultérieurement.",
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
