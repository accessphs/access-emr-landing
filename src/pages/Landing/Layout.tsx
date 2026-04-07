import { GlobalModals } from "@/modal/GlobalModal";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { System } from "./System";

export const Layout = () => {
  return (
    <main className="mx-auto w-full max-w-screen-2xl overflow-x-hidden relative">
      <div className="h-16 shrink-0 md:h-24" aria-hidden />
      <Navbar />
      <Outlet />
      <System />
      <Footer />
      <GlobalModals />
    </main>
  );
};

export default Layout;
