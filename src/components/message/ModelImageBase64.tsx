import type { DataPart } from "@/types";

interface ModelImageBase64Props {
  part: DataPart;
}

const ModelImageBase64 = ({ part }: ModelImageBase64Props) => {
  return (
    <div className="w-full max-w-md">
      <img
        src={`data:${(part as DataPart).inlineData.mimeType};base64,${
          (part as DataPart).inlineData.data
        }`}
        alt="image"
        className="w-full rounded-lg"
      />
    </div>
  );
};
export default ModelImageBase64;
