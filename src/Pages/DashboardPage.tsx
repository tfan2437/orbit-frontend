import { axiosInstance } from "@/lib/axios";

const DashboardPage = () => {
  const test = async () => {
    const response = await axiosInstance.get("/firebase");
    console.log("TEST PROTECTED ROUTE:", response);
  };

  return (
    <div className="text-4xl font-bold">
      <button
        onClick={test}
        className="bg-neutral-700 rounded-xl p-4 cursor-pointer mt-20"
      >
        Test
      </button>
    </div>
  );
};
export default DashboardPage;
