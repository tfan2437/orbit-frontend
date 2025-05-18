export type Routes = {
  HOME: string;
  LOGIN: string;
  DASHBOARD: string;
  CHAT: string;
  CHAT_ID: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  CHAT_ID: "/c/:id",
};

type PresetPrompt = {
  tool: string;
  prompt: string;
};

export const PRESET_PROMPTS_LESS: PresetPrompt[] = [
  {
    tool: "Restaurant",
    prompt: "Find places to eat near ",
  },
  {
    tool: "Shopping",
    prompt: "Help me shop for ",
  },
  {
    tool: "Sports",
    prompt: "Give me the latest games played by ",
  },
  {
    tool: "Image",
    prompt: "Create an image of ",
  },
  {
    tool: "Draft",
    prompt: "Help me write a ",
  },
];

export const PRESET_PROMPTS_MORE: PresetPrompt[] = [
  {
    tool: "Speech",
    prompt: "Create a speach about ",
  },
  {
    tool: "Stock",
    prompt: "Give me the stock price for ",
  },
  {
    tool: "Quiz",
    prompt: "Quiz me on ",
  },
  {
    tool: "News",
    prompt: "Tell me the latest news ",
  },
];

export const PRESET_PROMPTS_MOBILE: PresetPrompt[] = [
  {
    tool: "Image",
    prompt: "Create an image of ",
  },
  {
    tool: "Stock",
    prompt: "Give me the stock price for ",
  },
  {
    tool: "Sports",
    prompt: "Give me the latest games played by ",
  },
  {
    tool: "Draft",
    prompt: "Help me write a ",
  },
];
