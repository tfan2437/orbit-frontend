import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";
import ChatLayout from "@/layout/ChatLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "@/Pages/HomePage";
import LoginPage from "@/Pages/LoginPage";
import ChatPage from "@/Pages/ChatPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
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
