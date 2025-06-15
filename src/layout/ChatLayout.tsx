import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/Sidebar";
import ChatNavbar from "@/components/layout/navigation/ChatNavbar";

const ChatLayout = () => {
  return (
    <SidebarProvider>
      <Toaster />
      <Sidebar />
      <main className="w-full flex flex-col items-center relative">
        <ChatNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ChatLayout;
