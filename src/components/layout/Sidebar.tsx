import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SquarePenIcon,
  PanelRightIcon,
  CircleFadingArrowUpIcon,
  LogOutIcon,
  EllipsisIcon,
} from "lucide-react";
// types
import type { Chats } from "@/types";
// store & services
import { useAppSelector } from "@/store/hooks";
import { signOut } from "@/services/firebase";
// utils
import { toastInProgress } from "@/utils/errorUtils";
import { getUserChats } from "@/utils/messageUtils";
import { generateId } from "@/utils/utils";
// ui
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import IconButton from "@/components/common/buttons/IconButton";
import SparksIcon from "@/components/common/icons/SparksIcon";
// components
import SearchDialog from "@/components/common/search/SearchDialog";
import ChatsSection from "@/components/features/chat/ChatsSection";
import ChatsSkeleton from "@/components/features/chat/ChatsSkeleton";

const Sidebar = () => {
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
    <SidebarContainer>
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
            <SearchDialog chats={chats} />
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
              <ChatsSection title="Today" displayType="today" chats={chats} />
              <ChatsSection
                title="Yesterday"
                displayType="yesterday"
                chats={chats}
              />
              <ChatsSection
                title="Previous"
                displayType="previous"
                chats={chats}
              />
            </>
          )}
        </div>
        <SignOutButton />
        <UpgradeButton />
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarItem = ({
  icon = null,
  title,
  onClick,
  hideMenu = false,
}: {
  icon?: React.ReactNode;
  title: string;
  onClick: () => void;
  hideMenu?: boolean;
}) => {
  return (
    <div
      className="flex items-center p-2 hover:bg-neutral-800 rounded-md cursor-pointer justify-between group/sidebaritem"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 truncate">
        {icon}
        <span className="text-white text-sm select-none">{title}</span>
      </div>
      {!hideMenu && (
        <div
          className="size-6 flex items-center justify-center bg-transparent group-hover/sidebaritem:opacity-100 opacity-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EllipsisIcon className="size-4 text-neutral-100" />
        </div>
      )}
    </div>
  );
};

const SignOutButton = () => {
  return (
    <div className="px-2">
      <button
        onClick={signOut}
        className="flex gap-2 w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer"
      >
        <div className="flex items-center justify-center size-6">
          <LogOutIcon className="size-5" />
        </div>
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
};

const UpgradeButton = () => {
  return (
    <div className="px-2 pb-2">
      <div
        className="flex gap-2 w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer"
        onClick={toastInProgress}
      >
        <CircleFadingArrowUpIcon className="size-6" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="text-sm">Upgrade Plan</span>
          <span className="text-xs text-neutral-400 font-light">
            Unlock new features
          </span>
        </div>
      </div>
    </div>
  );
};
