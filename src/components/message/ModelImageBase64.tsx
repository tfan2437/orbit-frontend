import type { DataPart } from "@/types";
import { saveImageFromBase64 } from "@/utils/imageUtils";
import { DownloadIcon } from "lucide-react";

interface ModelImageBase64Props {
  part: DataPart;
}

const ModelImageBase64 = ({ part }: ModelImageBase64Props) => {
  const saveImage = async () => {
    await saveImageFromBase64(
      (part as DataPart).inlineData.data,
      (part as DataPart).inlineData.mimeType
    );
  };

  return (
    <div className="w-full max-w-md relative">
      <img
        src={`data:${(part as DataPart).inlineData.mimeType};base64,${
          (part as DataPart).inlineData.data
        }`}
        alt="image"
        className="w-full rounded-lg"
      />
      <button
        onClick={saveImage}
        className="rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-300 cursor-pointer text-white absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm p-2"
      >
        <DownloadIcon className="size-4 stroke-2" />
      </button>
    </div>
  );
};
export default ModelImageBase64;
