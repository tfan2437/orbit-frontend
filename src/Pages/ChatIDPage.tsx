import type { Content } from "@/types";
import { useEffect, useState, useRef } from "react";
import { ArrowUpIcon, GlobeIcon, PlusIcon, XIcon } from "lucide-react";
import RoundButton from "@/components/button/RoundButton";
import type { FileModel } from "@/utils/fileUtils";
import { formatFiles } from "@/utils/fileUtils";
import {
  getTextResponse,
  getImageResponse,
  createMessageParts,
  createStoreParts,
  getChatHistory,
} from "@/utils/messageUtils";
import { getUploadedUrls } from "@/utils/fileUtils";
import { useParams } from "react-router-dom";
import { storeChat } from "@/utils/messageUtils";
import MessagesContainer from "@/components/message/MessagesContainer";

const ChatPage = () => {
  const { id = "" } = useParams();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<FileModel[]>([]);
  const [history, setHistory] = useState<Content[]>([]);
  const [messages, setMessages] = useState<Content[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // include the ai api response, aws s3 upload, and save message to db

  const handleGenerateText = async (prompt: string, files: FileModel[]) => {
    if (prompt === "") return;
    const submitMessages: Content[] = [
      ...messages,
      { role: "user", parts: createMessageParts(prompt, files) },
    ];
    setMessages(submitMessages);
    setIsResponding(true);
    setIsProcessing(true);
    setPrompt("");
    setFiles([]);

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
      "iAJIjDIllqe2pxPl4hHhXJNZEPg2",
      "test-002",
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

    setIsProcessing(false);
  };

  const handleGenerateImage = async (prompt: string, files: FileModel[]) => {
    if (prompt === "" || id === "") return;
    const submitMessages: Content[] = [
      ...messages,
      { role: "user", parts: createMessageParts(prompt, files) },
    ];

    setMessages(submitMessages);
    setIsResponding(true);
    setIsProcessing(true);
    setPrompt("");
    setFiles([]);

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
      "iAJIjDIllqe2pxPl4hHhXJNZEPg2",
      "test-001",
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

    setIsProcessing(false);
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="w-full bg-black rounded-t-4xl flex-col items-center">
          <div className="w-full flex-col items-center border-zinc-600 bg-zinc-900 rounded-3xl border p-3">
            {files.length > 0 && (
              <div className="w-full flex items-center gap-2 mb-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="aspect-square h-14 rounded-lg relative"
                  >
                    <button
                      className="absolute -top-1.5 -right-1.5 border-3 p-0.5 rounded-full border-zinc-900 bg-white cursor-pointer outline-none"
                      onClick={() => removeFile(file)}
                    >
                      <XIcon className="size-3 text-black" strokeWidth={2.5} />
                    </button>
                    <img
                      src={`data:${file.type};base64,${file.base64}`}
                      alt="image"
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            <textarea
              className="scrollbar w-full resize-none overflow-y-auto border-none p-1 text-base outline-none"
              placeholder="Ask anything"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (prompt === "") return;
                  e.preventDefault();
                  handleGenerateImage(prompt, files);
                }
              }}
            />
            <div className="flex h-fit w-full flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-2">
                <RoundButton
                  onClick={selectFiles}
                  children={<PlusIcon className="size-6" />}
                />
                <RoundButton children={<GlobeIcon className="size-4" />} />
              </div>
              <button
                className="rounded-full size-9 flex items-center justify-center cursor-pointer bg-white text-black hover:bg-zinc-200"
                onClick={() => handleGenerateImage(prompt, files)}
                disabled={prompt === ""}
              >
                <ArrowUpIcon className="size-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-4" />
        </div>
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
