import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";

import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import HomePage from "@/Pages/HomePage";
import LoginPage from "@/Pages/LoginPage";
import ChatPage from "@/Pages/ChatPage";
import ChatIDPage from "@/Pages/ChatIDPage";
import Protected from "./routes/Protected";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        {/* <Route
          path={"/chat"}
          element={
            <Protected>
              <ChatPage />
            </Protected>
          }
        /> */}
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.CHAT_ID}
            element={
              <Protected>
                <ChatIDPage />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
