import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";
import ChatLayout from "@/layout/ChatLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import HomePage from "@/Pages/HomePage";
import LoginPage from "@/Pages/LoginPage";
import ChatIDPage from "@/Pages/ChatIDPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route element={<ChatLayout />}>
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
