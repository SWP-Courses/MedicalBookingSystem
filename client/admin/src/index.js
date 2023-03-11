import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";
import { applyMiddleware, createStore } from "redux";
import reducers from "./store/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const store = createStore(reducers, applyMiddleware(thunk));
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <SocketProvider>
        <Router>
            <Provider store={store}>
                <Layout />
            </Provider>
        </Router>
    </SocketProvider>
    </QueryClientProvider>
    // </React.StrictMode>
);
