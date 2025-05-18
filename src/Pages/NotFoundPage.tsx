import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
      <div className="flex flex-row items-center gap-4">
        <Link to="/" className="text-4xl font-outfit text-white">
          <span>OrbitAI</span>
        </Link>

        <div className="w-px h-12 bg-neutral-500" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">404</h1>
          <p className="text-base text-neutral-400 font-light">
            Page not found
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
