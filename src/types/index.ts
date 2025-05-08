export type TextPart = {
  text: string;
};

export type DataPart = {
  inlineData: {
    data: string;
    mimeType: string;
  };
};

export type Part = TextPart | DataPart;

export type Content = {
  role: "user" | "model";
  parts: Part[];
};
