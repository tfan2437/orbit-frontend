import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatSidebar from "@/components/ChatSidebar";
import ChatNavbar from "@/components/layout/ChatNavbar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <ChatSidebar />

      <main className="w-full flex flex-col items-center relative">
        <ChatNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
