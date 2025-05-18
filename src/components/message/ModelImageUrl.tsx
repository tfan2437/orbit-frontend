import type { FileUrlPart } from "@/types";
import { DownloadIcon } from "lucide-react";

interface ModelImageUrlProps {
  part: FileUrlPart;
}

const ModelImageUrl = ({ part }: ModelImageUrlProps) => {
  return (
    <div className="w-full max-w-md relative group">
      <img src={part.fileUrl} alt="image" className="w-full rounded-lg" />
    </div>
  );
};
export default ModelImageUrl;
