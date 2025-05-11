import { GoogleGenAI } from "@google/genai";
import type { Content, InlineData } from "@/types";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

import { getErrorMessage } from "@/utils/utils";

type TextResponse = {
  success: boolean;
  text: string;
  error: string;
};

type ImageResponse = {
  success: boolean;
  text: string;
  inlineData: InlineData;
  error: string;
};

export const generateTextResponse = async (
  messages: Content[] = []
): Promise<TextResponse> => {
  const textConfig = { responseMimeType: "text/plain" };
  const textModel = "gemini-2.0-flash";

  try {
    const response = await ai.models.generateContentStream({
      model: textModel,
      config: textConfig,
      contents: messages,
    });

    let textResponse = "";
    for await (const chunk of response) {
      try {
        textResponse += chunk.text ?? "";
      } catch (error) {
        const err = getErrorMessage(error, "Error processing stream chunk.");
        return {
          success: false,
          text: "",
          error: err,
        };
      }
    }

    return {
      success: true,
      text: textResponse,
      error: "",
    };
  } catch (error) {
    const err = getErrorMessage(
      error,
      "Error generating response from Gemini API"
    );
    return {
      success: false,
      text: "",
      error: err,
    };
  }
};

export const generateImageResponse = async (
  messages: Content[] = []
): Promise<ImageResponse> => {
  const imageConfig = {
    responseModalities: ["image", "text"],
    responseMimeType: "text/plain",
  };
  const imageModel = "gemini-2.0-flash-preview-image-generation";

  try {
    const response = await ai.models.generateContentStream({
      model: imageModel,
      config: imageConfig,
      contents: messages,
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
      success: true,
      text: textData.join(""),
      inlineData: responseData[0] ?? {
        data: "",
        mimeType: "",
      },
      error: "",
    };
  } catch (error) {
    const err = getErrorMessage(
      error,
      "Error generating response from Gemini API"
    );
    return {
      success: false,
      text: "",
      inlineData: {
        data: "",
        mimeType: "",
      },
      error: err,
    };
  }
};
