import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface VanishInputProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const VanishInput = ({ prompt, setPrompt }: VanishInputProps) => {
  const navigate = useNavigate();
  const placeholders = [
    "Explain recursion... without using recursion.",
    "What if Batman had Orbit AI as a sidekick?",
    "Write a Python script that tells jokes.",
    "Pitch a startup idea involving time travel.",
    "Summarize the Matrix trilogy as a haiku.",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const id = generateId();
    setTimeout(() => {
      navigate(id ? `/c/${id}` : "/chat");
    }, 1200);
  };

  return (
    <PlaceholdersAndVanishInput
      value={prompt}
      setValue={setPrompt}
      onSubmit={onSubmit}
      placeholders={placeholders}
    />
  );
};

export default VanishInput;
