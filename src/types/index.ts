type TextPart = {
  text: string;
};

type FilePart = {
  fileData: {
    fileUri: string;
    mimeType: string;
  };
};

type Part = TextPart | FilePart;

export type Content = {
  role: "user" | "model";
  parts: Part[];
};
