import { SquarePenIcon, PanelRightIcon, SearchIcon } from "lucide-react";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { signOut } from "@/services/firebase";
import SparksIcon from "@/components/SparksIcon";
import IconButton from "@/components/button/IconButton";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useEffect, useState } from "react";
import { getUserChats } from "@/utils/messageUtils";
import type { Chats } from "@/types";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";
import ChatsSection from "@/components/chat/ChatsSection";
import UpgradeButton from "@/components/chat/UpgradeButton";
import ChatsSkeleton from "@/components/chat/ChatsSkeleton";

const ChatSidebar = () => {
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();
  const [fetching, setFetching] = useState(true);
  const [chats, setChats] = useState<Chats>({
    today: [],
    yesterday: [],
    previous: [],
  });

  useEffect(() => {
    const fetchChats = async () => {
      const { chats } = await getUserChats("iAJIjDIllqe2pxPl4hHhXJNZEPg2");
      setChats(chats);
      setFetching(false);
    };
    fetchChats();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-between px-2 py-2">
          <IconButton
            icon={
              <PanelRightIcon className="size-[22px] transform scale-x-[-1]" />
            }
            onClick={toggleSidebar}
            className="hover:bg-neutral-700"
          />
          <div className="flex items-center">
            <IconButton
              icon={<SearchIcon className="size-[22px]" />}
              onClick={() => {}}
              className="hover:bg-neutral-700"
            />
            <IconButton
              icon={<SquarePenIcon className="size-[22px]" />}
              onClick={() => navigate(`/c/${generateId()}`)}
              className="hover:bg-neutral-700"
            />
          </div>
        </div>
        <div className="flex flex-col px-2">
          <SidebarItem
            icon={
              <img
                src="/logo/120x120.png"
                alt="Orbit AI"
                className="size-6 border border-neutral-500 rounded-full"
              />
            }
            title="Orbit AI"
            onClick={() => navigate(`/c/${generateId()}`)}
            hideMenu={true}
          />
          <SidebarItem
            icon={
              <div className="size-6 flex items-center justify-center rounded-full bg-transparent">
                <SparksIcon color="#fff" width={18} height={18} />
              </div>
            }
            title="Explore"
            onClick={() => navigate("/")}
            hideMenu={true}
          />
        </div>
        <div className="flex flex-1 flex-col bg-transparent overflow-y-auto scrollbar px-2 ">
          {fetching ? (
            <ChatsSkeleton />
          ) : (
            <>
              <ChatsSection title="Today" chats={chats.today} />
              <ChatsSection title="Yesterday" chats={chats.yesterday} />
              <ChatsSection title="Previous" chats={chats.previous} />
            </>
          )}
        </div>
        <div className="px-2 pt-1">
          <button
            onClick={signOut}
            className="flex gap-2 font-semibold w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer"
          >
            Sign Out
          </button>
        </div>
        <UpgradeButton />
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
