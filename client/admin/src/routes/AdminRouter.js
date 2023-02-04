import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import Doctor from "../pages/Doctor";
import Service from "../pages/Service";
import Medicine from "../pages/Medicine";
import Calendar from "../pages/Calendar";
import Chat from "../pages/Chat";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/service" element={<Service />} />
      <Route path="/medicine" element={<Medicine />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AdminRouter;
