import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Login from "../components/Login";

const Profil = () => {
    const Uid = useContext(UidContext);
    return (
        <div>
            <div className="profil-page">
                <div className="img-container">
                    <img
                        src="./img/logo/icon-above-font.svg"
                        alt="Groupomania"
                    />
                </div>
                <div className="log-container">
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default Profil;
