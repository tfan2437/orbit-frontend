import type { FileModel } from "@/utils/fileUtils";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "@/store/hooks";
import { setModel } from "@/store/slices/chatSlice";
import {
  ArrowUpIcon,
  GlobeIcon,
  PlusIcon,
  XIcon,
  ImagePlusIcon,
} from "lucide-react";
import RoundButton from "@/components/common/buttons/RoundButton";

interface PromptAreaProps {
  files: FileModel[];
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  model: number;
  handleGenerateImage: (prompt: string, files: FileModel[]) => void;
  handleGenerateText: (prompt: string, files: FileModel[]) => void;
  selectFiles: () => void;
  removeFile: (file: FileModel) => void;
}

const PromptArea = ({
  files,
  prompt,
  setPrompt,
  model,
  handleGenerateImage,
  handleGenerateText,
  selectFiles,
  removeFile,
}: PromptAreaProps) => {
  const dispatch = useAppDispatch();
  const setImageModel = () => {
    if (model === 3) {
      dispatch(setModel(2));
    } else {
      dispatch(setModel(3));
    }
  };

  const [search, setSearch] = useState<boolean>(false);

  return (
    <div className="w-full bg-black rounded-t-4xl flex-col items-center">
      <div className="w-full flex-col items-center border-zinc-600 bg-zinc-900 rounded-3xl border p-3">
        {files.length > 0 && (
          <div className="w-full flex items-center gap-2 mb-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="aspect-square h-14 rounded-lg relative"
              >
                <button
                  className="absolute -top-1.5 -right-1.5 border-3 p-0.5 rounded-full border-zinc-900 bg-white cursor-pointer outline-none"
                  onClick={() => removeFile(file)}
                >
                  <XIcon className="size-3 text-black" strokeWidth={2.5} />
                </button>
                <img
                  src={`data:${file.type};base64,${file.base64}`}
                  alt="image"
                  className="h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
        <textarea
          className="scrollbar w-full resize-none overflow-y-auto border-none p-1 text-base outline-none"
          placeholder="Ask anything"
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (prompt === "") return;
              e.preventDefault();
              if (model === 3) {
                handleGenerateImage(prompt, files);
              } else {
                handleGenerateText(prompt, files);
              }
            }
          }}
        />
        <div className="flex h-fit w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <RoundButton
              onClick={selectFiles}
              children={<PlusIcon className="size-5" />}
            />
            <RoundButton
              activated={search}
              onClick={() => setSearch(!search)}
              children={<GlobeIcon className="size-4" />}
            />
            <button
              onClick={setImageModel}
              className={twMerge(
                "rounded-full p-2 flex items-center justify-center border cursor-pointer gap-2",
                model === 3
                  ? "border-transparent bg-blue-400/30 text-blue-400/90"
                  : "border-zinc-600 bg-transparent text-zinc-200"
              )}
            >
              <ImagePlusIcon className="size-4" />
              <span className="text-xs">Create image</span>
            </button>
          </div>
          <button
            className="rounded-full size-9 flex items-center justify-center cursor-pointer bg-white text-black hover:bg-zinc-200"
            onClick={() =>
              model === 3
                ? handleGenerateImage(prompt, files)
                : handleGenerateText(prompt, files)
            }
            disabled={prompt === ""}
          >
            <ArrowUpIcon className="size-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-4" />
    </div>
  );
};
export default PromptArea;
