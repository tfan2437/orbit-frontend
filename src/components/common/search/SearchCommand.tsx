import type { Chats } from "@/types";
import { useNavigate } from "react-router-dom";
import { SquarePenIcon } from "lucide-react";
import { generateId } from "@/utils/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import CommandChatItem from "@/components/ui/command-chat-item";

const SearchCommand = ({
  setDialogOpen,
  chats,
}: {
  setDialogOpen: (open: boolean) => void;
  chats: Chats;
}) => {
  const router = useNavigate();

  const handleNavigate = (path: string) => {
    router(path);
    setDialogOpen(false);
  };

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px] h-[440px]">
      <CommandInput placeholder="Seach chats..." />
      <div className="flex-1 overflow-y-auto scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => handleNavigate(`/c/${generateId()}`)}>
            <SquarePenIcon className="text-neutral-100" strokeWidth={1.5} />
            <span>New Chat</span>
          </CommandItem>
        </CommandGroup>
        {chats.today.length > 0 && (
          <CommandGroup heading="Today">
            {chats.today.map((chat) => (
              <div
                key={chat.chat_id}
                onClick={() => handleNavigate(`/c/${chat.chat_id}`)}
              >
                <CommandChatItem text={chat.title} />
              </div>
            ))}
          </CommandGroup>
        )}
        {chats.yesterday.length > 0 && (
          <CommandGroup heading="Yesterday">
            {chats.yesterday.map((chat) => (
              <div
                key={chat.chat_id}
                onClick={() => handleNavigate(`/c/${chat.chat_id}`)}
              >
                <CommandChatItem text={chat.title} />
              </div>
            ))}
          </CommandGroup>
        )}
        {chats.previous.length > 0 && (
          <CommandGroup heading="Previous">
            {chats.previous.map((chat) => (
              <div
                key={chat.chat_id}
                onClick={() => handleNavigate(`/c/${chat.chat_id}`)}
              >
                <CommandChatItem text={chat.title} />
              </div>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default SearchCommand;
