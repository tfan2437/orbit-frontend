import Markdown from "react-markdown";
import type { Content } from "@/types";
import ModelImageBase64 from "@/components/message/ModelImageBase64";
import ModelImageUrl from "@/components/message/ModelImageUrl";
import ModelMessageAction from "@/components/message/ModelMessageAction";

interface ModelMessageProps {
  message: Content;
}

const ModelMessage = ({ message }: ModelMessageProps) => {
  return (
    <div className="w-full chat scrollbar pb-8 group">
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
      <ModelMessageAction
        textResponse={
          message.parts[0] && "text" in message.parts[0]
            ? message.parts[0].text
            : ""
        }
        className="pt-3 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
};
export default ModelMessage;
