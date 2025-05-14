import LoginHeader from "@/components/layout/LoginHeader";
import LoginBody from "@/components/layout/LoginBody";
import LoginFooter from "@/components/layout/LoginFooter";
const TestPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-black">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col">
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </div>
      <div
        className="w-1/2 h-full md:block hidden"
        style={{
          backgroundImage: "url(/space-3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
export default TestPage;
