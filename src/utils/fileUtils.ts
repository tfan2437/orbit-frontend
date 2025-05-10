export interface FileModel {
  name: string;
  ext: string;
  type: string;
  base64: string;
}

export const formatFiles = async (files: File[]): Promise<FileModel[]> => {
  const convertedFiles = await Promise.all(
    files.map(async (file) => {
      const { name, ext, type, base64 } = await convertFileToBase64({
        file,
      });

      return { name, ext, type, base64 };
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
    const [name, ext] = file.name.split(".");
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
    return { name, ext, type, base64 };
  } catch (error) {
    console.error("Error converting file to base64:", error);
    throw new Error("Failed to convert file to base64");
  }
};
