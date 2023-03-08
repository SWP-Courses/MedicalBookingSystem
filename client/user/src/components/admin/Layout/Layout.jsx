import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminRouter from "~/routes/AdminRouter";
import "./layout.css";
import { AuthContext } from "~/context/authContext";

const Layout = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="d-flex layout">
      {["admin", "consultant", "cashier"].includes(currentUser?.role) && (
        <>
          <Sidebar />
          <div className="main">
            <AdminRouter />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
