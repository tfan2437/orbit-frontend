import { useState } from "react";
import { ArrowUpIcon, GlobeIcon, PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Text = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex w-full px-3 pb-3">
      <div className="flex h-fit w-full flex-col items-center rounded-lg border p-2 backdrop-blur-sm">
        <Textarea
          className="workspace-scrollbar h-[72px] w-full resize-none overflow-y-auto border-none p-1 text-sm outline-none"
          placeholder="Ask anything"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("Send Prompt");
            }
          }}
        />
        <div className="flex h-fit w-full flex-row items-center justify-between gap-2 bg-red-500">
          <div className="flex flex-row items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            <GlobeIcon className="h-5 w-5" />
          </div>

          <button
            className="rounded-full bg-truewhite p-2 text-black hover:bg-neutral-200"
            disabled={false}
          >
            <ArrowUpIcon className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

// const Text123 = () => {
//   return (
//     <div>
//       <Textarea
//         placeholder="Tell us a little bit about yourself"
//         className="resize-none"
//       />
//       <Button>Submit</Button>
//     </div>
//   );
// };

export default Text;
