import { twMerge } from "tailwind-merge";

const RoundButton = ({
  children,
  activated = false,
}: {
  children: React.ReactNode;
  activated?: boolean;
}) => {
  return (
    <button
      className={twMerge(
        "rounded-full size-9 flex items-center justify-center border  cursor-pointer",
        activated
          ? "border-transparent bg-blue-400/30 text-blue-400/90"
          : "border-zinc-600 bg-transparent text-zinc-200"
      )}
    >
      {children}
    </button>
  );
};

export default RoundButton;
