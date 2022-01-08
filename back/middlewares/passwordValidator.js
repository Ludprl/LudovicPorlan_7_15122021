const passwordValidator = require("password-validator"); //on utilise le package pour imposer un certain type de mdp

//schéma pour le mdp
let passwordSchema = new passwordValidator();
passwordSchema
    .is()
    .min(8) //longueur minimum 8
    .is()
    .max(50) //longueur maximum 50
    .has()
    .uppercase() //contient une majuscule
    .has()
    .lowercase() //contient une minuscule
    .has()
    .digits() //contient un chiffre
    .has()
    .symbols() //contient un symbole
    .has()
    .not()
    .spaces() //ne contient pas d'espace
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); //blacklist de mdp

module.exports = passwordSchema;
