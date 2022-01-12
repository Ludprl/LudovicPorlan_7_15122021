import React from "react";

const removeToken = () => {
    localStorage.removeItem("userToken");
    window.location = "/";
};

const Logout = () => {
    return (
        <>
            <li onClick={removeToken}>
                <p>
                    <i className="logout fas fa-sign-out-alt"></i>
                </p>
            </li>
        </>
    );
};

export default Logout;
