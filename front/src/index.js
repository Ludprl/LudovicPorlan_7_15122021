import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/normalize.css";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

//Dev Tools
import { composeWithDevTools } from "redux-devtools-extension";

// Creation du store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
