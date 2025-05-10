import { GoogleGenAI } from "@google/genai";
import type { Content, InlineData } from "@/types";
import type { Part } from "@/types";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

type TextResponse =
  | {
      res: {
        text: string;
      };
      err: null;
    }
  | {
      res: null;
      err: string;
    };

type ImageResponse =
  | {
      res: {
        inlineData: InlineData;
        text: string;
      };
      err: null;
    }
  | {
      res: null;
      err: string;
    };

export const generateTextResponse = async (
  parts: Part[],
  messages: Content[] = []
): Promise<TextResponse> => {
  const textConfig = { responseMimeType: "text/plain" };
  const textModel = "gemini-2.0-flash";

  // Start with the chat history
  const contents: Content[] = [...messages];

  // Add the current user prompt
  contents.push({
    role: "user",
    parts,
  });

  try {
    const response = await ai.models.generateContentStream({
      model: textModel,
      config: textConfig,
      contents: contents,
    });

    let textResponse = "";
    for await (const chunk of response) {
      try {
        textResponse += chunk.text ?? "";
      } catch (error) {
        console.error("Error processing stream chunk:", error);
        return {
          res: null,
          err: "Error processing stream chunk.",
        };
      }
    }

    return {
      res: { text: textResponse },
      err: null,
    };
  } catch (error: unknown) {
    console.error("Error generating text response from Gemini API:", error);

    const errorMessage =
      "An unknown error occurred while communicating with the Gemini API.";

    return {
      res: null,
      err: errorMessage,
    };
  }
};

export const generateImageResponse = async (
  parts: Part[],
  messages: Content[] = []
): Promise<ImageResponse> => {
  const imageConfig = {
    responseModalities: ["image", "text"],
    responseMimeType: "text/plain",
  };
  const imageModel = "gemini-2.0-flash-preview-image-generation";

  // Start with the chat history
  const contents: Content[] = [...messages];

  // Add the current user prompt
  contents.push({
    role: "user",
    parts,
  });

  try {
    const response = await ai.models.generateContentStream({
      model: imageModel,
      config: imageConfig,
      contents: contents,
    });

    const responseData: InlineData[] = [];
    const textData: string[] = [];

    for await (const chunk of response) {
      if (
        !chunk.candidates ||
        !chunk.candidates[0].content ||
        !chunk.candidates[0].content.parts
      ) {
        continue;
      }
      if (chunk.candidates[0].content.parts[0].inlineData) {
        responseData.push({
          data: chunk.candidates[0].content.parts[0].inlineData.data ?? "",
          mimeType:
            chunk.candidates[0].content.parts[0].inlineData.mimeType ?? "",
        });
      } else {
        textData.push(chunk.text ?? "");
      }
    }

    console.log("RESPONSE DATA: ", responseData);
    console.log("TEXT DATA: ", textData.join(""));

    return {
      res: {
        inlineData: responseData[0] ?? {
          data: "",
          mimeType: "",
        },
        text: textData.join(""),
      },
      err: null,
    };
  } catch (error: unknown) {
    console.error("Error generating text response from Gemini API:", error);

    const errorMessage =
      "An unknown error occurred while communicating with the Gemini API.";

    return {
      res: null,
      err: errorMessage,
    };
  }
};
