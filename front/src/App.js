import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
    const [Uid, setUid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwtUid = localStorage.getItem("userToken");
        const isUserTokenExpired = isExpired(jwtUid);
        if (isUserTokenExpired === true) {
            localStorage.removeItem("userToken");
        }
        if (jwtUid !== null) {
            const myDecodedToken = decodeToken(jwtUid);
            setUid(myDecodedToken.userId);
        }
        if (Uid) {
            dispatch(getUser(Uid));
        }
    }, [Uid]);

    return (
        <UidContext.Provider value={Uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
