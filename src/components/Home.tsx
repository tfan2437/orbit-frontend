// import { ScrollArea } from "@/components/ui/scroll-area";
// import { logout } from "@/services/firebase";
import { generateTextResponse } from "@/services/gemini";
import type { Content } from "@/types";
import { useEffect, useState, useRef } from "react";
import { ArrowUpIcon, GlobeIcon, PlusIcon } from "lucide-react";
import RoundButton from "./button/RoundButton";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Content[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async () => {
    const submitPrompt = prompt;
    setPrompt("");

    setMessages((prev) => [
      ...prev,
      { role: "user", parts: [{ text: submitPrompt }] },
    ]);

    const { res, err } = await generateTextResponse(submitPrompt, messages);

    if (err || !res) {
      console.error("ERROR: ", err);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: res }] },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-xl h-screen flex flex-col items-center py-4 gap-2">
      <div className="scrollbar w-full flex-1 h-full overflow-y-auto flex flex-col">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div className="flex flex-row justify-end pb-8">
              <div
                key={index}
                className="border-zinc-700 bg-zinc-900 border w-fit max-w-80 px-4 py-1.5 rounded-lg"
              >
                <p>
                  {message.parts[0] && "text" in message.parts[0]
                    ? message.parts[0].text
                    : "[File content]"}
                </p>
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
        <textarea
          className="scrollbar max-h-20 w-full resize-none overflow-y-auto border-none p-1 text-base outline-none"
          placeholder="Ask anything"
          rows={4}
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
            <RoundButton children={<PlusIcon className="size-6" />} />
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
    </div>
  );
};
export default Home;
