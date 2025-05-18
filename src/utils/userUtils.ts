import type { UserData } from "@/services/user";
import { createUser, getUser } from "@/services/user";

export const checkUser = async (user: UserData) => {
  try {
    const response = await getUser(user.uid);
    if (!response) {
      await createUser({
        uid: user.uid,
        name: user.name,
        email: user.email,
        photo_url: user.photo_url,
      });
    }
  } catch (error) {
    console.log("Error checking user", error);
  }
};
