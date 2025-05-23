import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import LoginHeader from "@/components/layout/LoginHeader";
import LoginBody from "@/components/layout/LoginBody";
import LoginFooter from "@/components/layout/LoginFooter";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) navigate(`/c/${generateId()}`);
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-row w-full h-screen bg-black">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col">
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </div>
      <div
        className="w-1/2 h-full md:block hidden"
        style={{
          backgroundImage: "url(/moon.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default LoginPage;
