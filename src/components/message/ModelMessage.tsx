import Markdown from "react-markdown";
import type { Content } from "@/types";
import ModelImageBase64 from "@/components/message/ModelImageBase64";
import ModelImageUrl from "@/components/message/ModelImageUrl";

interface ModelMessageProps {
  message: Content;
}

const ModelMessage = ({ message }: ModelMessageProps) => {
  return (
    <div className="w-full chat scrollbar pb-8">
      {message.parts[0] && "text" in message.parts[0] && (
        <Markdown>{message.parts[0].text}</Markdown>
      )}
      {message.parts.map((part, index) =>
        part && "inlineData" in part ? (
          <ModelImageBase64 key={index} part={part} />
        ) : "fileUrl" in part ? (
          <ModelImageUrl key={index} part={part} />
        ) : null
      )}
    </div>
  );
};
export default ModelMessage;
