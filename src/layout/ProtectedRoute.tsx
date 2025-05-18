import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useAppDispatch } from "@/store/hooks";
import { cleanUpUser, updateUser } from "@/store/slices/userSlice";
import { checkUser } from "@/utils/userUtils";
import type { UserData } from "@/services/user";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const userData: UserData = {
          uid: user.uid,
          email: user.email || "",
          name: user.displayName || user.email || "",
          photo_url: user.photoURL || "",
          subscription_tier: "free",
          last_login: new Date().toISOString(),
        };
        dispatch(updateUser(userData));
        checkUser(userData);
      } else {
        dispatch(cleanUpUser());
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate, dispatch]);

  return <>{children}</>;
};
export default ProtectedRoute;
