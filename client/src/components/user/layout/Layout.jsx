import { Outlet } from "react-router-dom";
import Footer from "~/components/user/footer/Footer";
import Navbar from "~/components/user/navbar/Navbar";
import './layout.scss'
import Chat from "~/pages/Chat/Chat";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="outletContainer">
        <Outlet />
      </div>
      <Footer />
      <Chat />
    </div>
  );
}
