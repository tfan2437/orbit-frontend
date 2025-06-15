import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

interface IconButtonProps {
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const IconButton = ({
  className = "hover:bg-neutral-800",
  onClick,
  icon,
}: IconButtonProps) => {
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="link"
      className={twMerge("size-10 cursor-pointer p-0", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
export default IconButton;
