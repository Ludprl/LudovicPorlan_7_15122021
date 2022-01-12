import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Login from "../components/Login";
import Navbar from "../components/Navbar/Navbar.js";
import "./home.css";

const Home = () => {
    const Uid = useContext(UidContext);
    return (
        <div className="home-page">
            {Uid ? (
                /* Si l'utilisateur possede un userId on affiche le feed */
                <div>
                    <Navbar />

                    <h1>FEED</h1>
                </div>
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
        </div>
    );
};

export default Home;
