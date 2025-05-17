import { SquarePenIcon, PanelRightIcon } from "lucide-react";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
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
import SignOutButton from "@/components/chat/SignOutButton";
import SearchDialog from "@/components/SeachDialog";
import { useAppSelector } from "@/store/hooks";

const ChatSidebar = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.chat);

  const { toggleSidebar } = useSidebar();
  const [fetching, setFetching] = useState(true);
  const [chats, setChats] = useState<Chats>({
    today: [],
    yesterday: [],
    previous: [],
  });

  useEffect(() => {
    const fetchChats = async () => {
      if (user.uid !== "" && !loading) {
        const { chats } = await getUserChats(user.uid);
        setChats(chats);
      }
      setFetching(false);
    };
    fetchChats();
  }, [user.uid, loading]);

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
            <SearchDialog />
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
              <ChatsSection
                title="Today"
                displayType="today"
                chats={chats}
                setChats={setChats}
              />
              <ChatsSection
                title="Yesterday"
                displayType="yesterday"
                chats={chats}
                setChats={setChats}
              />
              <ChatsSection
                title="Previous"
                displayType="previous"
                chats={chats}
                setChats={setChats}
              />
            </>
          )}
        </div>
        <SignOutButton />
        <UpgradeButton />
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
