import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-[76px] w-full flex-row justify-between bg-black px-8">
        <Link to="/" className="flex flex-row items-center gap-2">
          <p className="text-2xl font-medium font-outfit">OrbitAI</p>
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Link
            to="/login"
            className="p-3 text-zinc-500 transition-colors duration-200 hover:text-white"
          >
            <SearchIcon className="size-4" />
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white outline-none hover:bg-neutral-800"
          >
            Log in
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="h-[76px] bg-black w-full" />
      </div>
    </>
  );
};
export default Navbar;
