import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setformSubmit] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const formError = document.querySelector(".formError.error");
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
                data: {
                    lastName,
                    firstName,
                    email,
                    password,
                },
            })
                .then((res) => {
                    setformSubmit(true);
                })
                .catch((err) => {
                    console.log(err);
                    formError.innerHTML = err.response.data.error;
                });
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <h4 className="sucess">
                        Enregistrement réussi, veuillez vous connecter
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <div className="formError error"></div>
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <label htmlFor="email">Adresse courriel</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>
                    <label htmlFor="password-conf">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        name="controlPassword"
                        id="password-conf"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className="password-confirm error"></div>

                    <label htmlFor="terms">
                        <input type="checkbox" id="terms" value="Valider" />
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            conditions générales
                        </a>
                    </label>
                    <div className="terms error"></div>
                    <input className="submit" type="submit" value="Valider" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;
