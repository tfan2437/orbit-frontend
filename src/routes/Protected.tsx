import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/userSlice";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(
          updateUser({
            uid: user.uid,
            email: user.email || "",
            name: user.displayName || user.email || "",
            photo_url: user.photoURL || "",
            subscription_tier: "free",
            last_login: new Date().toISOString(),
          })
        );
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate, dispatch]);

  return <>{children}</>;
};
export default Protected;
