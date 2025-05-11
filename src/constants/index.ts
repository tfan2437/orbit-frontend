interface Routes {
  HOME: string;
  LOGIN: string;
  DASHBOARD: string;
  CHAT: string;
  CHAT_ID: string;
}

export const ROUTES: Routes = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  CHAT_ID: "/c/:id",
};
