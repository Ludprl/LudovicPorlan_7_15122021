import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "./login.css";

const Login = () => {
    const [SignUpModal, setSignUpModal] = useState(false);
    const [SignInModal, setSignInModal] = useState(true);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id="register"
                        className={SignUpModal ? "active-tab-left" : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={SignInModal ? "active-tab-right" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                <div className="form-wrap">
                    {SignUpModal && <SignUpForm />}
                    {SignInModal && <SignInForm />}
                </div>
            </div>
        </div>
    );
};

export default Login;
