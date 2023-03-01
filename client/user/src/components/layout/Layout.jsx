import { Outlet } from "react-router-dom";
import Footer from "~/components/footer/Footer";
import Navbar from "~/components/navbar/Navbar.jsx";

export default function Layout() {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };