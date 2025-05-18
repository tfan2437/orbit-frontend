import type { User } from "firebase/auth";
import type { UserData } from "@/services/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { getUser, createUser } from "@/services/user";

export const handleAuthStateChanged = (
  onAuthenticated: (userData: UserData) => void,
  onUnauthenticated: () => void,
  onError: (error: unknown) => void,
  onLoadingChange: (loading: boolean) => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    try {
      if (user) {
        const existingUser = await getUser(user.uid);

        if (existingUser) {
          onAuthenticated(existingUser);
        } else {
          const newUser = await createUser({
            uid: user.uid,
            name: user.displayName || user.email || "",
            email: user.email || "",
            photo_url:
              user.photoURL ||
              "https://live.staticflickr.com/65535/53875123869_a98d6e8b99_m.jpg",
          });
          if (newUser) {
            onAuthenticated(newUser);
          } else {
            onError(new Error("Failed to create user"));
          }
        }
      } else {
        onUnauthenticated();
      }
    } catch (error) {
      onError(error);
    } finally {
      onLoadingChange(false);
    }
  });
};
