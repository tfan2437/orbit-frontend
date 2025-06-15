import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// services
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
// utils
import { generateId } from "@/utils/utils";
// components
import AuthForm from "@/components/features/auth/AuthForm";

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
        <AuthHeader />
        <div className="flex flex-1 flex-col items-center justify-center text-black px-6">
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm pb-14">
            <h1 className="text-3xl font-medium">Log into your account</h1>
            <AuthForm />
          </div>
        </div>
        <AuthFooter />
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

const AuthHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between px-5 py-5">
      <Link to={"/"}>
        <img src="/logo/200x200-i.png" alt="" className="size-7 block" />
      </Link>
      <div className="flex flex-row px-4 py-2 rounded-full hover:bg-neutral-100 border-1 border-neutral-200 text-black text-sm gap-1 cursor-default select-none">
        <span>You are signing into </span>
        <span className="font-medium font-outfit">OrbitAI</span>
      </div>
    </div>
  );
};

const AuthFooter = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 text-sm text-black">
      <div className="flex flex-row gap-2 text-xs justify-center w-full">
        <p className="text-neutral-500">
          By continuing, you agree to Orbit AI's{" "}
          <span className="text-black font-medium">Terms of Service</span> and{" "}
          <span className="text-black font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
