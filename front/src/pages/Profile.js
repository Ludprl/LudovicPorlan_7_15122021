import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Login from "../components/Login";
import Navbar from "../components/Navbar/Navbar";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    const Uid = useContext(UidContext);
    return (
        <>
            {Uid ? (
                <>
                    <Navbar />
                    <div>
                        <div className="profil-page">
                            <UpdateProfil />
                        </div>
                    </div>
                </>
            ) : (
                /* Sinon > formulaire de connexion. */
                <div className="log-container">
                    <div className="img-container">
                        <img
                            src="./img/logo/icon-above-font.svg"
                            alt="Groupomania"
                        />
                    </div>
                    <Login />
                </div>
            )}
        </>
    );
};

export default Profil;
