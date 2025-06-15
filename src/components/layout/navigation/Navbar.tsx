import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// icons
import { SearchIcon } from "lucide-react";
// utils
import { generateId } from "@/utils/utils";
// services
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

const Navbar = () => {
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid("");
      }
    });
    return () => unsubscribe();
  }, [uid]);

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-[76px] w-full flex-row justify-between bg-black px-6 md:px-8">
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

          {uid ? (
            <Link
              to={`/c/${generateId()}`}
              className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white outline-none hover:bg-neutral-800"
            >
              Chat
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white outline-none hover:bg-neutral-800"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="h-[76px] bg-black w-full" />
      </div>
    </>
  );
};

export default Navbar;
