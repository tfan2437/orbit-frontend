import type { DataPart } from "@/types";

interface UserImageBase64Props {
  part: DataPart;
}

const UserImageBase64 = ({ part }: UserImageBase64Props) => {
  return (
    <div className="h-24">
      <img
        src={`data:${(part as DataPart).inlineData.mimeType};base64,${
          (part as DataPart).inlineData.data
        }`}
        alt="image"
        className="h-full rounded-lg"
      />
    </div>
  );
};
export default UserImageBase64;
