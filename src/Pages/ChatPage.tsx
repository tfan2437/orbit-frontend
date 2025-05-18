import { useEffect } from "react";
import { generateId } from "@/utils/utils";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  // const navigate = useNavigate();
  // const id = generateId();

  // useEffect(() => {
  //   navigate(`/c/${id}`);
  // }, [navigate, id]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Chat Redirecting...</h1>
    </div>
  );
};

export default ChatPage;
