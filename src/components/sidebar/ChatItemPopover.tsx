import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slices/chatSlice";
import { generateId } from "@/utils/utils";
import { deleteChat } from "@/services/chat";
import { PencilIcon, Trash2Icon, EllipsisIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SidebarItemPopover = ({
  chatId,
  setRename,
}: {
  chatId: string;
  setRename: (rename: boolean) => void;
}) => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDeleteChat = async () => {
    dispatch(setLoading(true));
    setOpen(false);
    await deleteChat(chatId);
    dispatch(setLoading(false));
    if (pathname.includes(chatId)) {
      navigate(`/c/${generateId()}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="size-6 flex items-center justify-center bg-transparent group-hover/sidebaritem:opacity-100 opacity-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EllipsisIcon className="size-4 text-neutral-100" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit py-2 px-2 rounded-lg"
        align="start"
        sideOffset={2}
      >
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setRename(true)}
            className="outline-none cursor-pointer text-sm flex items-center gap-2 justify-start text-neutral-100 hover:bg-neutral-800 rounded-md py-2 px-3"
          >
            <PencilIcon className="size-4" />
            <span>Rename</span>
          </button>
          <button
            onClick={handleDeleteChat}
            className="outline-none cursor-pointer text-sm flex items-center gap-2 justify-start text-red-400 hover:bg-red-700/20 rounded-md py-2 px-3"
          >
            <Trash2Icon className="size-4" />
            <span>Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SidebarItemPopover;
