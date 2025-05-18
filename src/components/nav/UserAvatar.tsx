import { useAppSelector } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Avatar>
      <AvatarImage src={user.photo_url} alt="profile image" />
      <AvatarFallback>{user.name.charAt(0) || "?"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
