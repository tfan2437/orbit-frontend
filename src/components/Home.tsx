// import { ScrollArea } from "@/components/ui/scroll-area";
// import { logout } from "@/services/firebase";
import { generateTextResponse } from "@/services/gemini";
import type { Content, Part, DataPart } from "@/types";
import { useEffect, useState, useRef } from "react";
import { ArrowUpIcon, GlobeIcon, PlusIcon, XIcon } from "lucide-react";
import RoundButton from "./button/RoundButton";

interface FileModel {
  name: string;
  ext: string;
  type: string;
  base64: string;
}

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<FileModel[]>([]);
  const [messages, setMessages] = useState<Content[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async () => {
    if (prompt === "") return;
    const submitPrompt = prompt;
    const submitFiles = files;

    setPrompt("");
    setFiles([]);

    const parts: Part[] = [
      {
        text: submitPrompt,
      },
      ...submitFiles.map((file) => ({
        inlineData: {
          data: file.base64,
          mimeType: file.type,
        },
      })),
    ];

    console.log("SUBMIT PARTS: ", parts);

    setMessages((prev) => [...prev, { role: "user", parts }]);

    const { res, err } = await generateTextResponse(parts, messages);

    if (err || !res) {
      console.error("ERROR: ", err);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: res }] },
      ]);
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const formatFiles = async (files: File[]) => {
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        const { name, ext, type, base64 } = await convertFileToBase64({
          file,
        });

        return { name, ext, type, base64 };
      })
    );

    return convertedFiles;
  };

  const convertFileToBase64 = async ({
    file,
  }: {
    file: File;
  }): Promise<{ name: string; ext: string; type: string; base64: string }> => {
    try {
      const [name, ext] = file.name.split(".");
      const type = file.type;

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Convert to binary string in chunks
      let binary = "";
      const CHUNK_SIZE = 8192;
      for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
        const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }

      const base64 = btoa(binary);
      return { name, ext, type, base64 };
    } catch (error) {
      console.error("Error converting file to base64:", error);
      throw new Error("Failed to convert file to base64");
    }
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
    console.log(files);
  }, [files]);

  return (
    <div className="w-full max-w-xl h-screen flex flex-col items-center py-4 gap-2">
      <div className="scrollbar w-full flex-1 h-full overflow-y-auto flex flex-col">
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
          ) : (
            <div key={index} className="w-full px-4 pb-8">
              <p>
                {message.parts[0] && "text" in message.parts[0]
                  ? message.parts[0].text
                  : "[File content]"}
              </p>
            </div>
          )
        )}
        {/* div for auto scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full flex-col items-center border-zinc-600 bg-zinc-900 rounded-3xl border p-3">
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
              e.preventDefault();
              handleGenerateText();
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
            onClick={handleGenerateText}
          >
            <ArrowUpIcon className="size-5" />
          </button>
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
export default Home;
