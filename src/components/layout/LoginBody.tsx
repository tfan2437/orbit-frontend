import AuthBox from "@/components/layout/AuthBox";

const LoginBody = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-black px-6">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm pb-14">
        <h1 className="text-3xl font-medium">Log into your account</h1>
        <AuthBox />
      </div>
    </div>
  );
};
export default LoginBody;
