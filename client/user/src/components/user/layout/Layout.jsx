import { Outlet } from "react-router-dom";
import Footer from "~/components/user/footer/Footer";
import Navbar from "~/components/user/navbar/Navbar";

export default function Layout() {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };