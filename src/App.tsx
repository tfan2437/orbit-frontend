import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants";

import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import HomePage from "@/Pages/HomePage";
import LoginPage from "@/Pages/LoginPage";
import DashboardPage from "@/Pages/DashboardPage";
import UploadPage from "@/Pages/UploadPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.UPLOAD} element={<UploadPage />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
