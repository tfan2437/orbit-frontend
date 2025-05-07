import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import type { ReactNode } from "react";
import type { User } from "firebase/auth";

import { ROUTES } from "@/constants";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement | null => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate(ROUTES.LOGIN);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
