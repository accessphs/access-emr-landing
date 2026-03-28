import { GlobalModals } from "@/modal/GlobalModal";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { System } from "./System";

export const Layout = () => {
  return (
    <main className="w-full max-w-screen-2xl mx-auto overflow-hidden">
      <Navbar />
      <Outlet />
      <System />
      <Footer />
      <GlobalModals />
    </main>
  );
};

export default Layout;
