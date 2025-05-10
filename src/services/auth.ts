import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser, createUser } from "@/services/user";
import type { User } from "firebase/auth";
import type { UserData } from "@/services/user";

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
          const newUser = await createUser(user);
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
