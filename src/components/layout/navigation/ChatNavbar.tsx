import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { generateId } from "@/utils/utils";
// icons
import { SquarePenIcon, ForwardIcon, CheckIcon } from "lucide-react";
// ui
import { Button } from "@/components/ui/button";
import { SidebarTriggerCustom, useSidebar } from "@/components/ui/sidebar";
// components
import UserAvatar from "@/components/common/user/UserAvatar";
import ModelPopover from "@/components/features/chat/ModelSelection";

const ChatNavbar = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {windowWidth < 768 ? (
        <MobileNavbar />
      ) : (
        <DesktopNavbar
          open={open}
          handleShare={handleShare}
          isCopied={isCopied}
          navigate={navigate}
        />
      )}
    </>
  );
};

export default ChatNavbar;

interface DesktopNavbarProps {
  open: boolean;
  handleShare: () => void;
  isCopied: boolean;
  navigate: (path: string) => void;
}

const DesktopNavbar = ({
  open,
  handleShare,
  isCopied,
  navigate,
}: DesktopNavbarProps) => {
  return (
    <div className="bg-black top-0 left-0 w-full h-14 absolute flex items-center justify-between xl:bg-transparent z-50 pl-3 pr-5">
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
        <ModelPopover align="start" />
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

const MobileNavbar = () => {
  return (
    <div className="bg-black top-0 left-0 w-full h-14 absolute flex items-center justify-between z-50 pl-3 pr-5">
      <div className="flex items-center">
        <SidebarTriggerCustom />
      </div>
      <ModelPopover align="center" />
      <div className="flex items-center justify-center size-10">
        <UserAvatar />
      </div>
    </div>
  );
};
