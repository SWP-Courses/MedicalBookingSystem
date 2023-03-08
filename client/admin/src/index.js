import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";
import "remixicon/fonts/remixicon.css";
import { applyMiddleware, createStore } from "redux";
import reducers from "./store/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducers, applyMiddleware(thunk));

root.render(
    // <React.StrictMode>
    <SocketProvider>
        <Router>
            <Provider store={store}>
                <Layout />
            </Provider>
        </Router>
    </SocketProvider>
    // </React.StrictMode>
);
