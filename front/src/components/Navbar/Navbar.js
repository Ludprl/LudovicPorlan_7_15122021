import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "./../../assets/logo/icon-left-font-monochrome-white.svg";
import Logout from "../Login/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
    const userData = useSelector((state) => state.userReducer);
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
                            Bienvenue{" "}
                            <NavLink to="/profil">
                                {userData.lastName} {userData.firstName}
                            </NavLink>
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
