import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  CopyIcon,
  CheckIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "lucide-react";

interface ModelMessageActionProps {
  textResponse: string;
  className?: string;
}

const ModelMessageAction = ({
  textResponse,
  className,
}: ModelMessageActionProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [like, setLike] = useState<"like" | "dislike" | "">("");

  const handleCopy = () => {
    navigator.clipboard.writeText(textResponse);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleLike = (type: "like" | "dislike") => {
    if (like === type) {
      setLike("");
    } else {
      setLike(type);
    }
  };

  return (
    <div className={twMerge("flex flex-row itmes center gap-3", className)}>
      <button onClick={handleCopy} className="cursor-pointer text-neutral-400">
        {isCopied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
      <button
        onClick={() => handleLike("like")}
        className={twMerge(
          "cursor-pointer text-neutral-400",
          like === "like" && "text-green-600"
        )}
      >
        <ThumbsUpIcon className="size-4" />
      </button>
      <button
        onClick={() => handleLike("dislike")}
        className={twMerge(
          "cursor-pointer text-neutral-400",
          like === "dislike" && "text-red-600"
        )}
      >
        <ThumbsDownIcon className="size-4" />
      </button>
    </div>
  );
};
export default ModelMessageAction;
