import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

interface NavLinkProps {
  text: string;
  href: string;
}

const NavLink = ({ text, href }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className="cursor-pointer group flex flex-row items-center justify-between rounded-lg bg-transparent py-[9px] pl-4 pr-3 hover:bg-neutral-900"
    >
      <span className="text-sm font-light text-white">{text}</span>
      <ChevronRightIcon
        className="size-4 text-neutral-600 opacity-0 group-hover:opacity-100"
        strokeWidth={2}
      />
    </Link>
  );
};

export default NavLink;
