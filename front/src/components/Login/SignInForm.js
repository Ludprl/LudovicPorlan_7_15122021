import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                localStorage.setItem("userToken", res.data.token);
                window.location = "/";
            })
            .catch((err) => {
                if (err.response.status === 401)
                    passwordError.innerHTML = err.response.data.error;
                if (err.response.status === 404)
                    emailError.innerHTML = err.response.data.error;
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
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
            <input className="submit" type="submit" value="Se Connecter" />
        </form>
    );
};

export default SignInForm;
