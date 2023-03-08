import { Outlet } from "react-router-dom";
import Footer from "~/components/user/footer/Footer";
import Navbar from "~/components/user/navbar/Navbar";
import Chat from "~/pages/Chat/Chat";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <Chat />
    </div>
  );
};