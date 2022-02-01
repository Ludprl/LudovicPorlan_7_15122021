import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "./../../assets/logo/icon-left-font-monochrome-white.svg";
import logoIconSmall from "./../../assets/logo/icon-white.png";
import Logout from "../Login/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 565;
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="Logo">
                            {width > breakpoint ? (
                                <img
                                    src={logoIcon}
                                    alt="Groupomania"
                                    title="Groupomania"
                                />
                            ) : (
                                <img
                                    src={logoIconSmall}
                                    alt="Groupomania"
                                    title="Groupomania"
                                />
                            )}
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
                                <i
                                    className="fas fa-user-circle"
                                    title="Profil"
                                ></i>
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
