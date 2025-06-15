import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";
import ChatLayout from "@/layout/ChatLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route
            path={ROUTES.CHAT_ID}
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
