import { CircleFadingArrowUpIcon } from "lucide-react";
import { toastInProgress } from "@/utils/errorUtils";

const UpgradeButton = () => {
  return (
    <div className="px-2 pb-2">
      <div
        className="flex gap-2 w-full items-center hover:bg-neutral-800 px-2 py-2 rounded-lg select-none cursor-pointer"
        onClick={toastInProgress}
      >
        <CircleFadingArrowUpIcon className="size-6" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="text-sm">Upgrade Plan</span>
          <span className="text-xs text-neutral-400 font-light">
            Unlock new features
          </span>
        </div>
      </div>
    </div>
  );
};
export default UpgradeButton;
