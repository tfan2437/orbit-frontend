import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signUp, login, loginWithGoogle } from "@/services/firebase";

import { ROUTES } from "@/constants";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) navigate(ROUTES.DASHBOARD);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signUp(username, email, password);
    console.log("User sign up successfully!");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("User login successfully!");
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
    console.log("Google login successfully!");
  };

  return (
    <div className="flex flex-col h-auto bg-zinc-900">
      <form className="flex flex-col mb-4">
        {!loginPage && (
          <input
            className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          className="border-[1px] border-[#616161]  focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative flex items-center">
          <input
            className="border-[1px] border-[#616161] focus:border-[#000000] focus:outline-none bg-[#000000] px-4 py-3 rounded placeholder-[#616161] text-white font-semibold w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-[12px] mb-[24px]">
          <label className="text-white text-[12px] font-normal ml-2">
            Remember Me
          </label>
        </div>
        {loginPage ? (
          <button
            onClick={(e) => handleLogIn(e)}
            className="bg-[#ff0000] hover:bg-[#ff0000b2] rounded py-3 text-base font-semibold text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={(e) => handleSignup(e)}
            className="bg-[#ff0000] hover:bg-[#ff0000b2] rounded py-3 text-base font-semibold text-white"
          >
            Sign Up
          </button>
        )}
        <div className="flex justify-center my-4">
          <p className="text-white text-sm font-semibold">OR</p>
        </div>
        <button
          onClick={(e) => handleGoogleSignIn(e)}
          type="submit"
          className="flex items-center justify-center border-[1px] border-[#616161] hover:border-[#ffffff] bg-[#000000] rounded py-3 text-base font-semibold text-[#ffffff]"
        >
          Continue with Google
        </button>
        <div className="flex justify-center mt-6">
          <p className="text-[#999999] text-xs font-normal">
            {loginPage ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setLoginPage((prev) => !prev)}
              className="cursor-pointer font-semibold text-[#ffffff] hover:text-[#ff0000] pl-1"
            >
              {loginPage ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
