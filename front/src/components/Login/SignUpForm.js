import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const lastNameError = document.querySelector(".lastName.error");
        const firstNameError = document.querySelector(".firstName.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML =
                    "Les mots de passe ne correspondent pas";
            if (!terms.checked)
                termsError.innerHTML =
                    "Veuillez valider les conditions générales";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
                withCredentials: true,
                data: {
                    lastName,
                    firstName,
                    email,
                    password,
                },
            })
                .then((res) => {
                    if (res.data.erros) {
                        lastNameError.innerHTML = res.data.errors.lastName;
                        firstNameError.innerHTML = res.data.errors.firstName;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="lastName">Nom</label>
            <br />
            <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <div className="lastName error"></div>
            <br />
            <label htmlFor="firstName">Prénom</label>
            <br />
            <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <div className="firstName error"></div>
            <br />
            <label htmlFor="email">Adresse courriel</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <br />
            <input
                type="password"
                name="controlPassword"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" value="Valider" />
            <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                    conditions générales
                </a>
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Valider" />
        </form>
    );
};

export default SignUpForm;
