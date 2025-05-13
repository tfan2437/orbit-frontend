import { SquarePenIcon, PanelRightIcon, SearchIcon } from "lucide-react";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { logout } from "@/services/firebase";
import { Button } from "@/components/ui/button";
import SparksIcon from "@/components/SparksIcon";
import { useEffect } from "react";

const ChatSidebar = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-between px-2 py-2">
          <Button
            variant="link"
            className="size-10 hover:bg-neutral-700 cursor-pointer p-0"
            onClick={toggleSidebar}
          >
            <PanelRightIcon className="size-[22px] transform scale-x-[-1]" />
          </Button>
          <div className="flex items-center">
            <Button
              variant="link"
              className="size-10 hover:bg-neutral-700 cursor-pointer p-0"
              onClick={() => {}}
            >
              <SearchIcon className="size-[22px]" />
            </Button>
            <Button
              variant="link"
              className="size-10 hover:bg-neutral-700 cursor-pointer p-0"
              onClick={() => {}}
            >
              <SquarePenIcon className="size-[22px]" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col px-2">
          <div className="flex items-center gap-2 p-2 hover:bg-neutral-800 rounded-md">
            <img
              src="/logo/120x120.png"
              alt="Orbit AI"
              className="size-6 border border-neutral-500 rounded-full"
            />
            <span className="text-white text-sm">Orbit AI</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-neutral-800 rounded-md">
            <div className="size-6 rounded-full flex items-center justify-center">
              <SparksIcon color="#fff" width={18} height={18} />
            </div>

            <span className="text-white text-sm">Explore</span>
          </div>
        </div>
        <div className="flex flex-1 bg-transparent overflow-y-auto scrollbar px-2">
          <div></div>
        </div>
        <button onClick={() => logout()}>
          <span>Logout</span>
        </button>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
