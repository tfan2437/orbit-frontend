import { EllipsisIcon } from "lucide-react";

interface SidebarItemProps {
  icon?: React.ReactNode;
  title: string;
  onClick: () => void;
  hideMenu?: boolean;
}

const SidebarItem = ({
  icon = null,
  title,
  onClick,
  hideMenu = false,
}: SidebarItemProps) => {
  return (
    <div
      className="flex items-center p-2 hover:bg-neutral-800 rounded-md cursor-pointer justify-between group/sidebaritem"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 truncate">
        {icon}
        <span className="text-white text-sm select-none">{title}</span>
      </div>
      {!hideMenu && (
        <div
          className="size-6 flex items-center justify-center bg-transparent group-hover/sidebaritem:opacity-100 opacity-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EllipsisIcon className="size-4 text-neutral-100" />
        </div>
      )}
    </div>
  );
};
export default SidebarItem;
