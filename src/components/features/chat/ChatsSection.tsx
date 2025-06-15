import type { Chats } from "@/types";
import { useNavigate } from "react-router-dom";
import ChatItem from "@/components/features/chat/ChatItem";

interface ChatsSectionProps {
  title: string;
  displayType: string;
  chats: Chats;
}

const ChatsSection = ({ title, displayType, chats }: ChatsSectionProps) => {
  const navigate = useNavigate();
  const redirectToChat = (chat_id: string) => {
    navigate(`/c/${chat_id}`);
  };

  const displayChats = chats[displayType as keyof Chats];

  if (displayChats.length === 0) return null;

  return (
    <div className="w-full flex flex-col mt-4">
      <span className="pl-2 text-xs text-neutral-400 font-light py-1">
        {title}
      </span>
      <div className="flex flex-col w-full">
        {displayChats.map((chat) => (
          <ChatItem
            key={chat.chat_id}
            chatId={chat.chat_id}
            title={chat.title}
            onClick={() => redirectToChat(chat.chat_id)}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatsSection;
