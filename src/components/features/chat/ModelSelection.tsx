import { useState } from "react";
import { twMerge } from "tailwind-merge";
// store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setModel } from "@/store/slices/chatSlice";
// icons
import { CheckIcon, ChevronDownIcon } from "lucide-react";
// ui
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ModelPopoverProps {
  align: "start" | "center";
}

const ModelSelection = ({ align }: ModelPopoverProps) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { model } = useAppSelector((state) => state.chat);

  const handleModelChange = (model: number) => {
    dispatch(setModel(model));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="h-10 hover:bg-zinc-800 rounded-lg px-3 cursor-pointer p-0 decoration-none flex items-center gap-2"
          onClick={() => {}}
        >
          <span className="text-neutral-100 text-lg font-medium">Orbit</span>
          <span className="text-neutral-300 text-lg font-light">{model}</span>
          <ChevronDownIcon className="size-4 text-neutral-300 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 py-2 px-2" align={align} sideOffset={6}>
        <span className="text-neutral-500 text-sm px-2">Models</span>
        <div className="flex flex-col mt-2 pb-1 select-none">
          <div
            className={twMerge(
              "flex flex-col gap-1 cursor-pointer hover:bg-neutral-800 rounded-lg py-2 px-2"
            )}
            onClick={() => handleModelChange(3)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Orbit 3</h4>
              {model === 3 && <CheckIcon className="size-4" />}
            </div>
            <p className="text-xs text-neutral-500">
              Great for Image Generation.
            </p>
          </div>
          <div
            className={twMerge(
              "flex flex-col gap-1 cursor-pointer hover:bg-neutral-800 rounded-lg py-2 px-2"
            )}
            onClick={() => handleModelChange(2)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">model 2</h4>
              {model === 2 && <CheckIcon className="size-4" />}
            </div>
            <p className="text-xs text-neutral-500">
              Great for general purpose tasks.
            </p>
          </div>
          <div
            className={twMerge(
              "flex flex-col gap-1 cursor-pointer hover:bg-neutral-800 rounded-lg py-2 px-2"
            )}
            onClick={() => handleModelChange(1)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">model 1</h4>
              {model === 1 && <CheckIcon className="size-4" />}
            </div>
            <p className="text-xs text-neutral-500">Fastest response time.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModelSelection;
