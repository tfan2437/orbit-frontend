import { SidebarTriggerCustom, useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import {
  SquarePenIcon,
  ChevronDownIcon,
  ForwardIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateId } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import ModelPopover from "@/components/ModelPopover";

const ChatNavbar = () => {
  const navigate = useNavigate();

  const { open } = useSidebar();
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    if (isCopied) return;
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-transparent top-0 left-0 w-full h-14 absolute flex items-center justify-between z-50 pl-3 pr-5">
      <div className="flex items-center">
        {!open && (
          <>
            <SidebarTriggerCustom />
            <Button
              variant="link"
              className="size-10 hover:bg-zinc-800 cursor-pointer p-0"
              onClick={() => navigate(`/c/${generateId()}`)}
            >
              <SquarePenIcon className="size-[22px]" />
            </Button>
          </>
        )}
        <ModelPopover />
      </div>
      <div className="flex items-center gap-3">
        <button
          className="h-10 hover:bg-neutral-800 border-neutral-600 border rounded-full px-3 cursor-pointer p-0 decoration-none flex items-center gap-2"
          onClick={handleShare}
          disabled={isCopied}
        >
          {isCopied ? (
            <CheckIcon className="size-4" />
          ) : (
            <ForwardIcon
              className="size-4 transform scale-x-[-1]"
              strokeWidth={2.5}
            />
          )}
          <span className="text-neutral-100 text-sm font-medium">
            {isCopied ? "Copied" : "Share"}
          </span>
        </button>
        <UserAvatar />
      </div>
    </div>
  );
};
export default ChatNavbar;
