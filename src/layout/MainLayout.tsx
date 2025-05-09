import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ChatSidebar from "@/components/ChatSidebar";
import UserAvatar from "@/components/UserAvatar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <ChatSidebar />

      <main className="w-full flex flex-col items-center relative">
        <div className="bg-transparent top-0 left-0 w-full h-14 absolute flex items-center justify-between z-50">
          <SidebarTrigger />
          <UserAvatar />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
