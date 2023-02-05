import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "~/components/layout/Layout";
import Booking from "~/pages/booking/Booking";
import Customer from "~/pages/customer/Customer";
import DoctorDetail from "~/pages/doctor/doctorDetail/DoctorDetail";
import DoctorList from "~/pages/doctor/doctorList/DoctorList";
import Home from "~/pages/home/Home";
import Specialist from "~/pages/specialist/Specialist";

export default function UserRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/doctor" element={<div />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/specialist/:id" element={<Specialist />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/blogs" element={<Booking />} />
          <Route path="/blogs/:id" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
