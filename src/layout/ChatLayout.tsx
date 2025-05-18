import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import ChatSidebar from "@/components/sidebar/ChatSidebar";
import ChatNavbar from "@/components/layout/ChatNavbar";

const ChatLayout = () => {
  return (
    <SidebarProvider>
      <Toaster />
      <ChatSidebar />
      <main className="w-full flex flex-col items-center relative">
        <ChatNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ChatLayout;
