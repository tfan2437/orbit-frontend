import { useNavigate } from "react-router-dom";
import type { Chat } from "@/types";
import SidebarItem from "@/components/sidebar/SidebarItem";

interface ChatsSectionProps {
  title: string;
  chats: Chat[];
}

const ChatsSection = ({ title, chats }: ChatsSectionProps) => {
  const navigate = useNavigate();

  const redirectToChat = (chat_id: string) => {
    navigate(`/c/${chat_id}`);
  };

  if (chats.length === 0) return null;

  return (
    <div className="w-full flex flex-col mt-4">
      <span className="pl-2 text-xs text-neutral-400 font-light py-1">
        {title}
      </span>
      <div className="flex flex-col w-full">
        {chats.map((chat) => (
          <SidebarItem
            key={chat.chat_id}
            title={chat.title}
            onClick={() => redirectToChat(chat.chat_id)}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatsSection;
