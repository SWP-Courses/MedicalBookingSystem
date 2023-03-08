import { Outlet } from "react-router-dom";
import Footer from "~/components/user/footer/Footer";
import Navbar from "~/components/user/navbar/Navbar";
import './layout.scss'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="outletContainer">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
