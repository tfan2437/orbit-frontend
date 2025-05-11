import type { Content, Part } from "@/types";
import { generateTextResponse, generateImageResponse } from "@/services/gemini";
import type { FileModel } from "./fileUtils";
import { generateName } from "./utils";

const geminiErrorMessage: Content = {
  role: "model",
  parts: [
    {
      text: "Looks like something went wrong. We're on it. Please try again later.",
    },
  ],
};

const defaultFile: FileModel = {
  name: "",
  type: "",
  base64: "",
  ext: "",
  uint8Array: new Uint8Array(),
};

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
  messages: Content[]
): Promise<{ success: boolean; message: Content }> => {
  const { success, text, error } = await generateTextResponse(messages);

  if (!success) {
    console.error("GEMINI ERROR: ", error);
    return { success: false, message: geminiErrorMessage };
  }

  const message: Content = {
    role: "model",
    parts: [{ text: text }],
  };

  return { success: true, message: message };
};

export const handleImageGeneration = async (
  messages: Content[]
): Promise<{ success: boolean; message: Content; file: FileModel }> => {
  const { success, text, inlineData, error } = await generateImageResponse(
    messages
  );

  if (!success) {
    console.error("GEMINI ERROR: ", error);
    return {
      success: false,
      message: geminiErrorMessage,
      file: defaultFile,
    };
  }

  const newParts: Part[] = [];

  if (text) {
    newParts.push({ text: text });
  }

  let file: FileModel = defaultFile;
  if (inlineData && inlineData.data && inlineData.mimeType) {
    newParts.push({ inlineData: inlineData });
    file = {
      name: generateName(),
      type: inlineData.mimeType || "",
      base64: "",
      ext:
        inlineData.mimeType && inlineData.mimeType.includes("/")
          ? inlineData.mimeType.split("/")[1]
          : "",
      uint8Array: new Uint8Array(
        atob(inlineData.data)
          .split("")
          .map((c) => c.charCodeAt(0))
      ),
    };
  }

  const message: Content = {
    role: "model",
    parts: newParts,
  };

  return { success: true, message: message, file: file };
};
