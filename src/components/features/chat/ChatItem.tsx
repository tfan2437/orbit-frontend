import { useEffect, useRef, useState } from "react";
// services
import { renameChat } from "@/services/chat";
// store
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setLoading } from "@/store/slices/chatSlice";
// components
import ChatItemPopover from "@/components/features/chat/ChatItemPopover";

interface ChatItemProps {
  chatId: string;
  title: string;
  onClick: () => void;
}

const ChatItem = ({ chatId, title, onClick }: ChatItemProps) => {
  const dispatch = useDispatch();
  const { uid } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.chat);

  const inputRef = useRef<HTMLInputElement>(null);
  const [rename, setRename] = useState(false);
  const [chatName, setChatName] = useState(title);

  useEffect(() => {
    if (rename) {
      inputRef.current?.focus();
    }
  }, [rename]);

  const handleRename = async () => {
    if (chatName === title || loading) {
      setRename(false);
      return;
    }
    setRename(false);
    dispatch(setLoading(true));
    await renameChat(chatId, uid, chatName);
    dispatch(setLoading(false));
  };

  return (
    <div
      className="flex items-center p-2 hover:bg-neutral-800 rounded-md cursor-pointer justify-between group/sidebaritem"
      onClick={onClick}
    >
      <div className="overflow-hidden mr-3 flex items-center">
        {rename ? (
          <input
            ref={inputRef}
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            onBlur={handleRename}
            className="text-white text-sm border-blue-500/70 border rounded outline-none"
          />
        ) : (
          <span className="text-white text-sm select-none">{chatName}</span>
        )}
      </div>
      <ChatItemPopover chatId={chatId} setRename={setRename} />
    </div>
  );
};
export default ChatItem;
