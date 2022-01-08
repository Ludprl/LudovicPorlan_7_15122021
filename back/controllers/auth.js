const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const emailValidator = require("email-validator");
const passwordValidator = require("../middlewares/passwordValidator");
const CryptoJS = require("crypto-js"); //on utilise le package cryptojs pour hash l'email
require("dotenv").config();

//Clés CryptoJS
const key = CryptoJS.enc.Utf8.parse(process.env.email_SecretKey);
const iv = CryptoJS.enc.Utf8.parse(process.env.email_SecretKey2);

function encryptEmail(string) {
    const enc = CryptoJS.AES.encrypt(string, key, { iv: iv });
    return enc;
}

//création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    //on sauvegarde un nouvel utilisateur et crypte son mot de passe avec un hash généré par bcrypt
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const encryptedEmail = encryptEmail(email).toString();
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, key, {
        iv: iv,
    }).toString(CryptoJS.enc.Utf8);

    if (
        lastName == null ||
        lastName == "" ||
        firstName == null ||
        firstName == "" ||
        email == null ||
        email == "" ||
        password == null ||
        password == ""
    ) {
        return res.status(400).json({
            error: "Veuillez remplir tout les champs.",
        });
    }
    //contrôle de la longueur du nom
    if (lastName.length <= 2 || lastName.length >= 100) {
        return res.status(400).json({
            error: "Le nom doit contenir entre 3 et 100 caractères !",
        });
    }
    //contrôle de la longueur du prénom
    if (firstName.length <= 2 || firstName.length >= 100) {
        return res.status(400).json({
            error: "Le prénom doit contenir entre 3 et 100 caractères !",
        });
    }
    //contrôle de la validité du mail
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Email invalide !" });
    }
    //contrôle de la validité du mot de passe
    if (!passwordValidator.validate(password)) {
        return res.status(400).json({
            error: "Le mot de passe doit comporter entre 8 et 30 caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial !",
        });
    }
    //vérification que l'utilisation n'existe pas encore
    db.User.findOne({
        attributes: ["lastName" || "firstName" || "email"],
        where: {
            lastName: lastName,
            firstName: firstName,
            email: decryptedEmail,
        },
    })
        .then((userExist) => {
            if (!userExist) {
                bcrypt
                    .hash(req.body.password, 10) // le salte (10)
                    .then((hash) => {
                        const user = db.User.build({
                            lastName: req.body.lastName,
                            firstName: req.body.firstName,
                            email: encryptedEmail,
                            password: hash, //on récupère le mdp hashé de bcrypt
                            admin: 0,
                        });
                        user.save() //on utilise la méthode save de notre user pour l'enregistrer dans la bdd
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "Votre compte a été créé avec succès !",
                                })
                            )
                            .catch((error) =>
                                res.status(400).json({
                                    error: "Une erreur s'est produite pendant la création du compte, veuillez recommencer ultérieurement.",
                                })
                            );
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite lors de la création de votre compte, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                return res
                    .status(404)
                    .json({ error: "Cet utilisateur existe déjà !" });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};

//connection d'un utilisateur
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: encryptEmail(req.body.email).toString() },
    })
        .then((user) => {
            if (user) {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ error: "Mot de passe incorrect !" });
                        }
                        res.status(200).json({
                            userId: user.id,
                            admin: user.admin,
                            lastName: user.lastName,
                            firstName: user.firstName,
                            profileAvatar: user.profileAvatar,
                            userBio: user.bio,
                            token: jwt.sign(
                                { userId: user.id },
                                process.env.JWT_TOKEN,
                                { expiresIn: "24h" }
                            ),
                        });
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error: "Une erreur s'est produite pendant la connexion, veuillez recommencer ultérieurement.",
                        })
                    );
            } else {
                return res.status(404).json({
                    error: "Cet utilisateur n'existe pas, veuillez créer un compte !",
                });
            }
        })
        .catch((error) =>
            res.status(500).json({
                error: "Une erreur s'est produite, veuillez recommencer ultérieurement.",
            })
        );
};
