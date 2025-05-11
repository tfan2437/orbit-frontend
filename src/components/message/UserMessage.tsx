import type { Content } from "@/types";
import UserImageBase64 from "@/components/message/UserImageBase64";
import UserImageUrl from "@/components/message/UserImageUrl";

interface UserMessageProps {
  message: Content;
}

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className="flex flex-col w-full pb-8 gap-2">
      {/* user's attached image */}
      <div className="flex flex-row justify-end gap-1">
        {message.parts.map((part, index) =>
          "inlineData" in part ? (
            <UserImageBase64 key={index} part={part} />
          ) : "fileUrl" in part ? (
            <UserImageUrl key={index} part={part} />
          ) : null
        )}
      </div>
      {/* user's text message */}
      <div className="flex flex-row justify-end">
        <div className="border-zinc-700 bg-zinc-900 border w-fit max-w-80 px-4 py-1.5 rounded-2xl">
          <p>
            {message.parts[0] &&
              "text" in message.parts[0] &&
              message.parts[0].text}
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserMessage;
