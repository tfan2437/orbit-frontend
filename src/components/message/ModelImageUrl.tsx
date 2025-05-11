import type { FileUrlPart } from "@/types";

interface ModelImageUrlProps {
  part: FileUrlPart;
}

const ModelImageUrl = ({ part }: ModelImageUrlProps) => {
  return (
    <div className="w-full max-w-md">
      <img src={part.fileUrl} alt="image" className="w-full rounded-lg" />
    </div>
  );
};
export default ModelImageUrl;
