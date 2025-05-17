import { MessageCircleIcon } from "lucide-react";

import { CommandItem } from "@/components/ui/command";

const CommandChatItem = ({ text }: { text: string }) => {
  return (
    <CommandItem>
      <MessageCircleIcon className="text-neutral-100" strokeWidth={2} />
      <span>{text}</span>
    </CommandItem>
  );
};

export default CommandChatItem;
