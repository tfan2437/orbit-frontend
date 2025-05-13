export type TextPart = {
  text: string;
};

export type DataPart = {
  inlineData: {
    data: string;
    mimeType: string;
  };
};

export type FileUrlPart = {
  fileUrl: string;
};

export type InlineData = {
  data: string;
  mimeType: string;
};

export type Part = TextPart | DataPart | FileUrlPart;

export type Content = {
  role: "user" | "model";
  parts: Part[];
};

export type Chat = {
  chat_id: string;
  title: string;
};

export type Chats = {
  today: Chat[];
  yesterday: Chat[];
  previous: Chat[];
};
