import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "./../../assets/logo/icon-left-font-monochrome-white.svg";
import Logout from "../Login/Logout";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="Logo">
                            <img src={logoIcon} alt="Groupomania" />
                        </div>
                    </NavLink>
                </div>
                <ul>
                    <li>
                        <h5>
                            Bienvenu{" "}
                            <NavLink to="/profil">'valeur dynamique'</NavLink>
                        </h5>
                    </li>
                    <li>
                        <NavLink to="/profil">
                            <p>
                                <i className="fas fa-user-circle"></i>
                            </p>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
