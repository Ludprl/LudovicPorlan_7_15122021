import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Login from "../components/Login";
import Navbar from "../components/Navbar/Navbar";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    const Uid = useContext(UidContext);
    return (
        <>
            <Navbar />
            <div>
                <div className="profil-page">
                    <UpdateProfil />
                </div>
            </div>
        </>
    );
};

export default Profil;
