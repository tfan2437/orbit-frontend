import { LogOutIcon } from "lucide-react";
import { signOut } from "@/services/firebase";

const SignOutButton = () => {
  return (
    <div className="px-2">
      <button
        onClick={signOut}
        className="flex gap-2 w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer"
      >
        <div className="flex items-center justify-center size-6">
          <LogOutIcon className="size-5" />
        </div>
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
};
export default SignOutButton;
