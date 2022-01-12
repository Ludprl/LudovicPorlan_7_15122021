import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import { isExpired, decodeToken } from "react-jwt";

const App = () => {
    const [Uid, setUid] = useState(null);

    useEffect(() => {
        const jwtUid = localStorage.getItem("userToken");
        console.log(jwtUid);
        if (jwtUid !== null) {
            const myDecodedToken = decodeToken(jwtUid);
            const isMyTokenExpired = isExpired(jwtUid);
            console.log(myDecodedToken);
            console.log(isMyTokenExpired);
            setUid(myDecodedToken.userId);
        }

        console.log("userId = " + Uid);
    }, [Uid]);

    return (
        <UidContext.Provider value={Uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
