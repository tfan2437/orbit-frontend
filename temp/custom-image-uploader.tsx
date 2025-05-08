"use client";

import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
// icons
import { PlusIcon } from "lucide-react";

interface FileModel {
  name: string;
  ext: string;
  type: string;
  base64: string;
}

const CustomImageUploader = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileModel[]>([]);

  const uploadImagesToS3 = async (files: File[]) => {
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        const { name, ext, type, base64 } = await convertFileToBase64({
          file,
        });

        return { name, ext, type, base64 };
      }),
    );

    return convertedFiles;
  };

  const convertFileToBase64 = async ({
    file,
  }: {
    file: File;
  }): Promise<{ name: string; ext: string; type: string; base64: string }> => {
    try {
      const [name, ext] = file.name.split(".");
      const type = file.type;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");

      return { name, ext, type, base64 };
    } catch (error) {
      console.error("Error converting file to base64:", error);
      throw new Error("Failed to convert file to base64");
    }
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const convertedFiles = await uploadImagesToS3(Array.from(e.target.files));

    setFiles(convertedFiles);
  };

  const selectFiles = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
      fileInput.current.click();
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      console.log("FILES: ", files);
    }
  }, [files]);

  return (
    <div className="flex h-auto w-full select-none flex-col items-center gap-4 rounded border border-pri bg-truewhite p-4">
      <button
        onClick={selectFiles}
        className={twMerge(
          "rounded-full border-1 border-zinc-300 p-1 outline-none",
        )}
      >
        <PlusIcon className="size-5 text-zinc-500" />
      </button>
      <input
        ref={fileInput}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFilesChange}
      />
    </div>
  );
};

export default CustomImageUploader;
