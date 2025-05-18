import type { Chats, Content, Part } from "@/types";
import type { FileModel } from "@/utils/fileUtils";
import { generateTextResponse, generateImageResponse } from "@/services/gemini";
import { getChat, updateChat, createChat, getChats } from "@/services/chat";
import { generateName } from "@/utils/utils";

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

export const createStoreParts = (text: string, urls: string[]): Part[] => {
  return [
    {
      text: text,
    },
    ...urls.map((url) => ({ fileUrl: url })),
  ];
};

export const getTextResponse = async (
  messages: Content[]
): Promise<{ success: boolean; message: Content; text: string }> => {
  const { success, text, error } = await generateTextResponse(messages);

  if (!success) {
    console.error("GEMINI ERROR: ", error);
    return { success: false, message: geminiErrorMessage, text: "" };
  }

  const message: Content = {
    role: "model",
    parts: [{ text: text }],
  };

  return { success: true, message: message, text: text };
};

export const getImageResponse = async (
  messages: Content[]
): Promise<{
  success: boolean;
  message: Content;
  text: string;
  file: FileModel;
}> => {
  const { success, text, inlineData, error } = await generateImageResponse(
    messages
  );

  if (!success) {
    console.error("GEMINI ERROR: ", error);
    return {
      success: false,
      message: geminiErrorMessage,
      text: "",
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

  return { success: true, message: message, text: text, file: file };
};

export const storeChat = async (
  chat_id: string,
  uid: string,
  title: string,
  contents: Content[]
): Promise<{ success: boolean; message: string }> => {
  try {
    const { success: getSuccess } = await getChat(chat_id);

    if (!getSuccess) {
      const { success: createSuccess } = await createChat(
        chat_id,
        uid,
        title,
        contents
      );
      return { success: createSuccess, message: "Chat created" };
    } else {
      const { success: updateSuccess } = await updateChat(
        chat_id,
        uid,
        "",
        contents
      );
      return { success: updateSuccess, message: "Chat updated" };
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return { success: false, message: "Error storing chat" };
  }
};

export const getChatHistory = async (
  chat_id: string
): Promise<{ success: boolean; contents: Content[]; message: string }> => {
  try {
    const { success, contents, message } = await getChat(chat_id);
    return { success, contents, message };
  } catch (error) {
    console.log("ERROR: ", error);
    return { success: false, contents: [], message: "" };
  }
};

export const getUserChats = async (
  uid: string
): Promise<{ success: boolean; chats: Chats }> => {
  try {
    const { success, chats } = await getChats(uid);
    return { success, chats };
  } catch (error) {
    console.log("ERROR: ", error);
    return {
      success: false,
      chats: { today: [], yesterday: [], previous: [] },
    };
  }
};
