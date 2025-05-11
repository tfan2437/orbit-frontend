import type { FileUrlPart } from "@/types";

interface UserImageProps {
  part: FileUrlPart;
}

const UserImageUrl = ({ part }: UserImageProps) => {
  return (
    <div className="h-24">
      <img src={part.fileUrl} alt="image" className="h-full rounded-lg" />
    </div>
  );
};
export default UserImageUrl;
