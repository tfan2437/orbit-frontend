import { SidebarTriggerCustom } from "@/components/ui/sidebar";

import UserAvatar from "@/components/UserAvatar";

const ChatNavbar = () => {
  return (
    <div className="bg-transparent top-0 left-0 w-full h-14 absolute flex items-center justify-between z-50 px-3">
      <SidebarTriggerCustom />
      <UserAvatar />
    </div>
  );
};
export default ChatNavbar;
