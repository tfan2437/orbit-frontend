import { Db, ObjectId } from "mongodb";
import sharp from "sharp";
import { GoogleGenAI, Modality } from "@google/genai";
import type { EmbedContentResponse } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// types
import { RenderOutput } from "@/src/data/types/rooms/v7/room-types";
import { UploadedImage } from "@/src/data/types/image-types";
// helpers
import {
  copyFileFromS3,
  getRemoteImageData,
  uploadFileToS3,
  getRandomGeminiKey,
} from "./utils";
// constants
import { s3BaseUrl } from "@/constants/common";

export async function convertImageToBase64({
  file,
}: {
  file: File;
}): Promise<{ base64: string; ext: string }> {
  try {
    // Get file extension from the file name
    const fileName = file.name;
    const [name, ext] = fileName.split(".");

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    return { base64, ext };
  } catch (error) {
    console.error("Error converting file to base64:", error);
    throw new Error("Failed to convert file to base64");
  }
}

export async function getTextResponse({
  file,
  imageUrl,
  fileExt,
  prompt,
}: {
  file: File;
  imageUrl: string;
  fileExt: string;
  prompt: string;
}): Promise<void> {
  try {
    // Fetch the image and convert to base64
    const imageBlob = await fetch(imageUrl).then((res) => res.blob());
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imageBase64 = buffer.toString("base64");

    // For file handling if it's provided instead of URL
    let fileBase64 = "";
    if (file) {
      const fileArrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(fileArrayBuffer);
      fileBase64 = fileBuffer.toString("base64");
    }
  } catch (error) {
    console.error("Error converting to base64:", error);
  }
  // function
  // Fetch the image and convert to base64
  const imageBlob = await fetch(imageUrl).then((res) => res.blob());
  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imageBase64 = buffer.toString("base64");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        text: prompt,
      },
      {
        inlineData: {
          data: imageBase64,
          mimeType: `image/${fileExt}`,
        },
      },
    ],
  });

  // Convert description response to string
  const description: string | undefined = response.text;
  if (typeof description !== "string" || description === "") {
    throw new Error("Failed to get text response");
  }
}
