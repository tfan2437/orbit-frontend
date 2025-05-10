import type { Content, Part } from "@/types";
import { generateTextResponse, generateImageResponse } from "@/services/gemini";
import type { FileModel } from "./fileUtils";

export const createMessageParts = (
  prompt: string,
  files: FileModel[]
): Part[] => {
  return [
    {
      text: prompt,
    },
    ...files.map((file) => ({
      inlineData: {
        data: file.base64,
        mimeType: file.type,
      },
    })),
  ];
};

export const handleTextGeneration = async (
  prompt: string,
  files: FileModel[],
  messages: Content[]
): Promise<Content[]> => {
  const parts = createMessageParts(prompt, files);
  const userMessage: Content = { role: "user", parts };
  const submitMessages = [...messages, userMessage];
  const errorMessage: Content = {
    role: "model",
    parts: [
      {
        text: "Looks like something went wrong. We’re on it. Please try again later.",
      },
    ],
  };

  const { res, err } = await generateTextResponse(parts, messages);

  if (err || !res) {
    console.error("ERROR: ", err);
    return [...submitMessages, errorMessage];
  }

  const modelMessage: Content = {
    role: "model",
    parts: [{ text: res.text }],
  };

  return [...submitMessages, modelMessage];
};

export const handleImageGeneration = async (
  prompt: string,
  files: FileModel[],
  messages: Content[]
): Promise<Content[]> => {
  const parts = createMessageParts(prompt, files);
  const userMessage: Content = { role: "user", parts };
  const submitMessages = [...messages, userMessage];
  const errorMessage: Content = {
    role: "model",
    parts: [
      {
        text: "Looks like something went wrong. We’re on it. Please try again later.",
      },
    ],
  };

  const { res, err } = await generateImageResponse(parts, messages);

  if (err || !res) {
    console.error("ERROR: ", err);
    return [...submitMessages, errorMessage];
  }

  const newParts: Part[] = [];

  if (res.text) {
    newParts.push({ text: res.text });
  }

  if (res.inlineData && res.inlineData.data && res.inlineData.mimeType) {
    newParts.push({ inlineData: res.inlineData });
  }

  const modelMessage: Content = {
    role: "model",
    parts: newParts,
  };

  return [...submitMessages, modelMessage];
};
