import { SquarePenIcon } from "lucide-react";
import CommandChatItem from "@/components/ui/command-chat-item";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";

const SearchCommand = ({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
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
        <CommandGroup heading="Today">
          <CommandChatItem text="Today's Chat" />
          <CommandChatItem text="Today's Chat" />
        </CommandGroup>
        <CommandGroup heading="Yesterday">
          <CommandChatItem text="Yesterday's Chat" />
          <CommandChatItem text="Yesterday's Chat" />
        </CommandGroup>
        <CommandGroup heading="Previous">
          <CommandChatItem text="Previous Chat" />
          <CommandChatItem text="Previous Chat" />
        </CommandGroup>
      </div>
    </Command>
  );
};

export default SearchCommand;
