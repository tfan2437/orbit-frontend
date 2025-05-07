import { Button } from "@/components/ui/button";
import { logout } from "@/services/firebase";

const Home = () => {
  return (
    <div className="w-full max-w-xl flex items-center justify-between">
      <h1 className="text-4xl font-bold">HomePage</h1>
      <Button variant="ghost" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
export default Home;
