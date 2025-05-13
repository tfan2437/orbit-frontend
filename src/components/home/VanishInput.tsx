"use client";

import type { Dispatch, SetStateAction } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface VanishInputProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const VanishInput = ({ prompt, setPrompt }: VanishInputProps) => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <PlaceholdersAndVanishInput
      value={prompt}
      setValue={setPrompt}
      onChange={handleChange}
      onSubmit={onSubmit}
      placeholders={placeholders}
    />
  );
};

export default VanishInput;
