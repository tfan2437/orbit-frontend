import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

interface IconButtonProps {
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const IconButton = ({ className, onClick, icon }: IconButtonProps) => {
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="link"
      className={twMerge(
        "size-10 hover:bg-zinc-800 cursor-pointer p-0",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
export default IconButton;
