"use client";

import type { Dispatch, SetStateAction } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useNavigate } from "react-router-dom";
import { generateId } from "@/utils/utils";
interface VanishInputProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const VanishInput = ({ prompt, setPrompt }: VanishInputProps) => {
  const navigate = useNavigate();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
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
