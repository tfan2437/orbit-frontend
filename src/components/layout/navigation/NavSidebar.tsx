import NavLink from "@/components/layout/navigation/NavLink";
import { NAVLINKS } from "@/constants/link";

const NavSidebar = () => {
  return (
    <div className="hidden fixed md:flex h-screen w-[200px] flex-col justify-center bg-black px-4">
      {NAVLINKS.map((link) => (
        <NavLink key={link.text} text={link.text} href={link.href} />
      ))}
    </div>
  );
};

export default NavSidebar;
