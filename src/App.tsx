import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";

import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import HomePage from "@/Pages/HomePage";
import LoginPage from "@/Pages/LoginPage";
import DashboardPage from "@/Pages/DashboardPage";
import ChatPage from "@/Pages/ChatPage";
import ChatIDPage from "@/Pages/ChatIDPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.CHAT}
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CHAT_ID}
            element={
              <ProtectedRoute>
                <ChatIDPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
