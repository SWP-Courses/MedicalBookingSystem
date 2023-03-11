import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "~/pages/admin/Dashboard.jsx";
import Blog from "~/pages/admin/Blog.jsx";
import Doctor from "~/pages/admin/Doctor.jsx";
import Service from "~/pages/admin/Service.jsx";
import Medicine from "~/pages/admin/Medicine.jsx";
import Calendar from "~/pages/admin/Calendar.jsx";
import Chat from "~/pages/admin/Chat.jsx";
import { AuthContext } from "~/context/authContext";
import Payment from "~/pages/admin/Payment";

// const Layout = () => (
//   <div className="d-flex layout">
//     <Sidebar />
//     <div className="main">
//       <AdminRouter />
//     </div>
//   </div>
// );

const AdminRouter = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/staff">
          {currentUser?.role === "admin" && (
            <>
              <Route path="" index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blog" element={<Blog />} />
              <Route path="doctor" element={<Doctor />} />
              <Route path="service" element={<Service />} />
              <Route path="medicine" element={<Medicine />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="chat" element={<Chat />} />
            </>
          )}

          {currentUser?.role === "consultant" && (
            <Route path="chat" element={<Chat />} />
          )}

          {currentUser?.role === "cashier" && (
            <Route path="payment" element={<Payment />} />
          )}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AdminRouter;
