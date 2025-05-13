import {
  SquarePenIcon,
  PanelRightIcon,
  SearchIcon,
  CircleFadingArrowUpIcon,
} from "lucide-react";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { logout } from "@/services/firebase";
import SparksIcon from "@/components/SparksIcon";
import IconButton from "@/components/button/IconButton";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useEffect, useState } from "react";
import { getUserChats } from "@/utils/messageUtils";
import type { Chat, Chats } from "@/types";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";
const ChatSidebar = () => {
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();
  const [fetching, setFetching] = useState(true);
  const [chats, setChats] = useState<Chats>({
    today: [],
    yesterday: [],
    previous: [],
  });

  const redirectToChat = (chat_id: string) => {
    navigate(`/c/${chat_id}`);
  };

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
              onClick={() => {}}
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
          {/* today */}
          <div className="w-full flex flex-col mt-4">
            <span className="pl-2 text-xs text-neutral-400 font-light py-1">
              Today
            </span>
            <div className="flex flex-col w-full">
              {chats.today.map((chat) => (
                <SidebarItem
                  key={chat.chat_id}
                  title={chat.title}
                  onClick={() => redirectToChat(chat.chat_id)}
                />
              ))}
            </div>
          </div>
          {/* yesterday */}
          {/* <div className="w-full flex flex-col mt-4">
            <span className="pl-2 text-xs text-neutral-400 font-light py-1">
              Yesterday
            </span>
            <div className="flex flex-col w-full">
              {chats.yesterday.map((chat) => (
                <SidebarItem
                  key={chat.chat_id}
                  title={chat.title}
                  onClick={() => redirectToChat(chat.chat_id)}
                />
              ))}
            </div>
          </div> */}
          {/* previous */}
          <div className="w-full flex flex-col mt-4">
            <span className="pl-2 text-xs text-neutral-400 font-light py-1">
              Previous
            </span>
            <div className="flex flex-col w-full">
              {chats.previous.map((chat) => (
                <SidebarItem
                  key={chat.chat_id}
                  title={chat.title}
                  onClick={() => redirectToChat(chat.chat_id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-2 pb-2 pt-1">
          <div className="flex gap-2 w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer">
            <CircleFadingArrowUpIcon className="size-6" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-sm">Upgrade Plan</span>
              <span className="text-xs text-neutral-400 font-light">
                Unlock new features
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
