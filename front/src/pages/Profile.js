import React from "react";
import Login from "../components/Login";

const Profil = () => {
    return (
        <div>
            <div className="profil-page">
                <div className="log-container"></div>
                <Login />
                <div className="img-container">
                    <img src=".img/logo.svg" alt="Groupomania"></img>
                </div>
            </div>
        </div>
    );
};

export default Profil;
