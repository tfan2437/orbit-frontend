import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

// components
import Navbar from "@/components/layout/navigation/Navbar";
import NavSidebar from "@/components/layout/navigation/NavSidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <Toaster />
      <Navbar />
      <NavSidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
