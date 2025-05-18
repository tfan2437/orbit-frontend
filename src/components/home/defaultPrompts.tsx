import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { PRESET_PROMPTS_LESS, PRESET_PROMPTS_MORE } from "@/constants";

import OutlineButton from "@/components/button/OutlineButton";

interface DefaultPromptsProps {
  setPrompt: Dispatch<SetStateAction<string>>;
}

const DefaultPrompts = ({ setPrompt }: DefaultPromptsProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className="flex flex-col mt-4 items-center justify-between h-[84px]">
      <div className="hidden sm:flex flex-row gap-2">
        {PRESET_PROMPTS_LESS.map((prompt) => (
          <OutlineButton
            key={prompt.tool}
            text={prompt.tool}
            onClick={() => setPrompt(prompt.prompt)}
          />
        ))}
        {!showMore && (
          <OutlineButton text="More" onClick={() => setShowMore(!showMore)} />
        )}
      </div>
      {showMore && (
        <div className="flex-row gap-2 hidden sm:flex">
          {PRESET_PROMPTS_MORE.map((prompt) => (
            <OutlineButton
              key={prompt.tool}
              text={prompt.tool}
              onClick={() => setPrompt(prompt.prompt)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default DefaultPrompts;
