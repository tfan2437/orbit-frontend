import { Skeleton } from "@/components/ui/skeleton";

const ChatsSkeleton = () => {
  return (
    <div className="w-full flex flex-col mt-4">
      <span className="pl-2 text-xs text-neutral-400 font-light py-1">
        History
      </span>
      <div className="flex flex-col w-full gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-10" />
        ))}
      </div>
    </div>
  );
};
export default ChatsSkeleton;
