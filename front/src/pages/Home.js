import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Login from "../components/Login";

const Home = () => {
    const Uid = useContext(UidContext);
    return (
        <div className="home-page">
            {Uid ? (
                <h1>FEED</h1>
            ) : (
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
