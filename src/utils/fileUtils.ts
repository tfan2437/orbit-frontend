import { uploadToS3 } from "@/services/s3service";
import { getErrorMessage } from "./utils";
export interface FileModel {
  name: string;
  ext: string;
  type: string;
  base64: string;
  uint8Array: Uint8Array;
}

export const formatFiles = async (files: File[]): Promise<FileModel[]> => {
  // Check for file size limit (10MB = 10 * 1024 * 1024 bytes)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const filteredFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);

  const convertedFiles = await Promise.all(
    filteredFiles.map(async (file) => {
      const { name, ext, type, base64, uint8Array } = await convertFileToBase64(
        {
          file,
        }
      );

      return { name, ext, type, base64, uint8Array };
    })
  );

  return convertedFiles;
};

export const convertFileToBase64 = async ({
  file,
}: {
  file: File;
}): Promise<FileModel> => {
  try {
    const ext = file.name.split(".").pop() || "jpg";
    const seed = Math.random().toString(36).substring(2, 15);
    const type = file.type;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert to binary string in chunks
    let binary = "";
    const CHUNK_SIZE = 8192;
    for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
      const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }

    const base64 = btoa(binary);
    return { name: seed, ext, type, base64, uint8Array };
  } catch (error) {
    console.error("Error converting file to base64:", error);
    throw new Error("Failed to convert file to base64");
  }
};

export const getUploadedUrls = async (
  files: FileModel[],
  file?: FileModel
): Promise<{
  success: boolean;
  inputUrls: string[];
  outputUrl: string[];
  error: string;
}> => {
  try {
    const inputUrls = await Promise.all(
      files.map(async (f) =>
        uploadToS3(`images/uploads/${f.name}.${f.ext}`, f.uint8Array, f.type)
      )
    );

    const outputUrl: string[] = [];
    if (file && file.name !== "") {
      outputUrl.push(
        await uploadToS3(
          `images/outputs/${file.name}.${file.ext}`,
          file.uint8Array,
          file.type
        )
      );
    }

    return {
      success: true,
      inputUrls: inputUrls,
      outputUrl: outputUrl,
      error: "",
    };
  } catch (error) {
    const err = getErrorMessage(error);
    return { success: false, inputUrls: [], outputUrl: [], error: err };
  }
};
