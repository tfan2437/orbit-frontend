// import { ScrollArea } from "@/components/ui/scroll-area";
// import { logout } from "@/services/firebase";
import type { Content, DataPart } from "@/types";
import { useEffect, useState, useRef } from "react";
import { ArrowUpIcon, GlobeIcon, PlusIcon, XIcon } from "lucide-react";
import RoundButton from "./button/RoundButton";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import type { FileModel } from "@/utils/fileUtils";
import { formatFiles } from "@/utils/fileUtils";
import {
  handleTextGeneration,
  handleImageGeneration,
} from "@/utils/messageUtils";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<FileModel[]>([]);
  const [messages, setMessages] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleGenerateText = async () => {
    if (prompt === "") return;
    const submitPrompt = prompt;
    const submitFiles = files;

    setPrompt("");
    setFiles([]);
    setIsLoading(true);

    const response = await handleTextGeneration(
      submitPrompt,
      submitFiles,
      messages
    );

    setMessages(response);
    setIsLoading(false);
  };

  const handleGenerateImage = async () => {
    if (prompt === "") return;
    const submitPrompt = prompt;
    const submitFiles = files;

    setPrompt("");
    setFiles([]);
    setIsLoading(true);

    const response = await handleImageGeneration(
      submitPrompt,
      submitFiles,
      messages
    );

    setMessages(response);
    setIsLoading(false);
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

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2 relative">
      <div className="scrollbar w-full flex-1 h-full overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-3xl px-4 pb-32">
          {/* for navbar padding purpose */}
          <div className="w-full h-14" />
          {messages.map((message, index) =>
            message.role === "user" &&
            message.parts[0] &&
            "text" in message.parts[0] ? (
              <div key={index} className="flex flex-col w-full pb-8 gap-2">
                <div className="flex flex-row justify-end gap-1">
                  {message.parts.map(
                    (part, index) =>
                      "inlineData" in part && (
                        <div key={index} className="h-24">
                          <img
                            src={`data:${
                              (part as DataPart).inlineData.mimeType
                            };base64,${(part as DataPart).inlineData.data}`}
                            alt="image"
                            className="h-full rounded-lg"
                          />
                        </div>
                      )
                  )}
                </div>
                <div className="flex flex-row justify-end">
                  <div className="border-zinc-700 bg-zinc-900 border w-fit max-w-80 px-4 py-1.5 rounded-lg">
                    <p>{message.parts[0].text}</p>
                  </div>
                </div>
              </div>
            ) : message.role === "model" &&
              message.parts[0] &&
              index === messages.length - 1 ? (
              <motion.div
                key={index}
                className="relative w-full pb-8 chat scrollbar"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <motion.div
                  className="relative z-10 flex flex-col w-full gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  }}
                >
                  {message.parts[0] && "text" in message.parts[0] && (
                    <Markdown>{message.parts[0].text}</Markdown>
                  )}
                  {message.parts.map(
                    (part, index) =>
                      "inlineData" in part && (
                        <div key={index} className="w-full max-w-md">
                          <img
                            src={`data:${
                              (part as DataPart).inlineData.mimeType
                            };base64,${(part as DataPart).inlineData.data}`}
                            alt="image"
                            className="w-full rounded-lg"
                          />
                        </div>
                      )
                  )}
                </motion.div>

                {/* Gradient overlay that follows the clip animation */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            ) : (
              <div key={index} className="w-full pb-8 chat scrollbar">
                {message.parts[0] && "text" in message.parts[0] && (
                  <Markdown>{message.parts[0].text}</Markdown>
                )}
                {message.parts.map(
                  (part, index) =>
                    "inlineData" in part && (
                      <div key={index} className="w-full max-w-md">
                        <img
                          src={`data:${
                            (part as DataPart).inlineData.mimeType
                          };base64,${(part as DataPart).inlineData.data}`}
                          alt="image"
                          className="w-full rounded-lg"
                        />
                      </div>
                    )
                )}
              </div>
            )
          )}
          {/* div for auto scroll to bottom */}
          {isLoading && <div className="loader" />}
          <div ref={messagesEndRef} className="w-full h-36 bg-transparent" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 bg-background flex-col items-center">
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
                handleGenerateImage();
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
              onClick={handleGenerateImage}
              disabled={prompt === ""}
            >
              <ArrowUpIcon className="size-5" />
            </button>
          </div>
        </div>
        <div className="w-full h-3" />
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
export default Home;
