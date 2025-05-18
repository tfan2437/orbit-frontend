import type { Content } from "@/types";
import type { FileModel } from "@/utils/fileUtils";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
// store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading } from "@/store/slices/chatSlice";
// utils
import { formatFiles } from "@/utils/fileUtils";
import { getUploadedUrls } from "@/utils/fileUtils";
import { storeChat } from "@/utils/messageUtils";
import {
  getTextResponse,
  getImageResponse,
  createMessageParts,
  createStoreParts,
  getChatHistory,
} from "@/utils/messageUtils";
// components
import MessagesContainer from "@/components/message/MessagesContainer";
import PromptArea from "@/components/message/PromptArea";

const ChatPage = () => {
  const { id = "" } = useParams();
  const pathname = window.location.pathname;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { model } = useAppSelector((state) => state.chat);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<FileModel[]>([]);
  const [history, setHistory] = useState<Content[]>([]);
  const [messages, setMessages] = useState<Content[]>([]);
  const [isResponding, setIsResponding] = useState(false);

  const handleGenerateText = async (prompt: string, files: FileModel[]) => {
    if (prompt === "") return;
    const submitMessages: Content[] = [
      ...messages,
      { role: "user", parts: createMessageParts(prompt, files) },
    ];
    setMessages(submitMessages);
    setIsResponding(true);
    setPrompt("");
    setFiles([]);
    dispatch(setLoading(true));

    const { success, message, text } = await getTextResponse(submitMessages);
    setMessages([...submitMessages, message]);
    setIsResponding(false);

    let inputUrls: string[] = [];
    if (success && files.length > 0) {
      const {
        success,
        inputUrls: uploadedInputUrls,
        error,
      } = await getUploadedUrls(files);
      inputUrls = uploadedInputUrls;
      if (!success) console.error("S3 ERROR: ", error);
      console.log("S3 UPLOADED URLS: ", inputUrls);
    }

    const { message: storeMessage } = await storeChat(
      id,
      user.uid,
      text.slice(0, 20) || "New chat",
      [
        {
          role: "user",
          parts: createStoreParts(prompt, inputUrls),
        },
        {
          role: "model",
          parts: createStoreParts(text, []),
        },
      ]
    );

    console.log("STORE MESSAGE: ", storeMessage);

    dispatch(setLoading(false));
  };

  const handleGenerateImage = async (prompt: string, files: FileModel[]) => {
    if (prompt === "" || id === "") return;
    const submitMessages: Content[] = [
      ...messages,
      { role: "user", parts: createMessageParts(prompt, files) },
    ];

    setMessages(submitMessages);
    setIsResponding(true);
    setPrompt("");
    setFiles([]);
    dispatch(setLoading(true));

    const { success, message, text, file } = await getImageResponse(
      submitMessages
    );
    setMessages([...submitMessages, message]);
    setIsResponding(false);

    let inputUrls: string[] = [];
    let outputUrl: string[] = [];
    if (success && (files.length > 0 || file.type !== "")) {
      const {
        success,
        inputUrls: uploadedInputUrls,
        outputUrl: uploadedOutputUrl,
        error,
      } = await getUploadedUrls(files, file);
      inputUrls = uploadedInputUrls;
      outputUrl = uploadedOutputUrl;
      if (!success) console.error("S3 ERROR: ", error);
      console.log("S3 UPLOADED URLS: ", inputUrls, outputUrl);
    }

    const { message: storeMessage } = await storeChat(
      id,
      user.uid,
      text.slice(0, 20) || "New chat",
      [
        {
          role: "user",
          parts: createStoreParts(prompt, inputUrls),
        },
        {
          role: "model",
          parts: createStoreParts(text, outputUrl),
        },
      ]
    );

    console.log("STORE MESSAGE: ", storeMessage);

    dispatch(setLoading(false));
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const convertedFiles = await formatFiles(Array.from(e.target.files));

    setFiles(convertedFiles);
  };

  const selectFiles = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
      fileInput.current.click();
    }
  };

  const removeFile = (file: FileModel) => {
    setFiles(files.filter((f) => f.name !== file.name));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (id === "") return;
      const { contents } = await getChatHistory(id);
      setHistory(contents);
    };

    fetchHistory();
  }, [id]);

  useEffect(() => {
    setMessages([]);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2 relative bg-black">
      <div className="scrollbar w-full flex-1 h-full overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-3xl px-6 pb-32">
          {/* for navbar padding purpose */}
          <div className="w-full h-14" />
          <MessagesContainer messages={history} isHistory={true} />
          <MessagesContainer messages={messages} />
          {/* div for auto scroll to bottom */}
          {isResponding && <div className="loader" />}
          <div ref={messagesEndRef} className="w-full h-36 bg-transparent" />
        </div>
      </div>
      {history.length === 0 && messages.length === 0 && windowWidth < 640 && (
        <div className="w-full flex justify-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
          <h1 className="text-3xl font-medium mb-8">What can I help with?</h1>
        </div>
      )}
      <div
        className={twMerge(
          "absolute left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 sm:px-6 md:px-4",
          history.length === 0 && messages.length === 0 && windowWidth > 640
            ? "-translate-y-1/2 top-1/2"
            : "bottom-0"
        )}
      >
        {history.length === 0 && messages.length === 0 && windowWidth > 640 && (
          <div className="w-full flex justify-center">
            <h1 className="text-3xl font-medium mb-8">What can I help with?</h1>
          </div>
        )}
        <PromptArea
          files={files}
          prompt={prompt}
          setPrompt={setPrompt}
          model={model}
          handleGenerateImage={handleGenerateImage}
          handleGenerateText={handleGenerateText}
          selectFiles={selectFiles}
          removeFile={removeFile}
        />
      </div>
      <input
        ref={fileInput}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFilesChange}
      />
    </div>
  );
};
export default ChatPage;
