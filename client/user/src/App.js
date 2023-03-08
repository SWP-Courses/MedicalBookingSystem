import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import ReactDOM from "react-dom/client";
import UserRouter from "./routes/UserRouter";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import { ToastContainer } from "react-toastify";
import StoreContextProvider from "./context/storeContext";
import Chat from "./pages/Chat/Chat";
import { CookiesProvider } from "react-cookie";

import { SocketProvider } from "./context/SocketProvider";
import AdminRouter from "./routes/AdminRouter";
import { Provider } from "react-redux";
import Layout from "./components/admin/Layout/Layout";
import "remixicon/fonts/remixicon.css";
import { applyMiddleware, createStore } from "redux";
import reducers from './store/index'
import thunk from "redux-thunk";

// const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducers, applyMiddleware(thunk));



function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <StoreContextProvider>
          <AuthContextProvider>
            <SocketProvider>
              <UserRouter />

              {/* admin */}
              <Provider store={store}>
                <Layout />
              </Provider>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* <Chat /> */}
            </SocketProvider>
          </AuthContextProvider>
        </StoreContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
