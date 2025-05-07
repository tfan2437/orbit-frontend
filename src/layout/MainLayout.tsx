import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};

export default MainLayout;
