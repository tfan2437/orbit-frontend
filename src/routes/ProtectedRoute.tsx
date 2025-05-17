import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { ROUTES } from "@/constants";
import { handleAuthStateChanged } from "@/services/auth";
import type { UserData } from "@/services/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/slices/userSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = handleAuthStateChanged(
      // onAuthenticated
      (user) => {
        setUserData(user);
        setAuthenticated(true);
      },
      // onUnauthenticated
      () => navigate(ROUTES.LOGIN),
      // onError
      (error) => {
        console.error("Authentication error:", error);
        navigate(ROUTES.LOGIN);
      },
      // onLoadingChange
      (isLoading) => setLoading(isLoading)
    );

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userData && userData.uid !== "") {
      dispatch(updateUser(userData));
    }
  }, [userData, dispatch]);

  if (loading) return <div>Loading...</div>;
  return authenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
