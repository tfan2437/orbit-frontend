import type { Content } from "@/types";
import UserMessage from "@/components/message/UserMessage";
import ModelMessage from "@/components/message/ModelMessage";
import ResponseAnimation from "@/components/message/ResponseAnimation";

interface MessagesContainerProps {
  messages: Content[];
  isHistory?: boolean;
}

const MessagesContainer = ({
  messages,
  isHistory = false,
}: MessagesContainerProps) => {
  return (
    <>
      {messages.map((message, index) =>
        message.role === "user" &&
        message.parts[0] &&
        "text" in message.parts[0] ? (
          <UserMessage key={index} message={message} />
        ) : message.role === "model" &&
          message.parts[0] &&
          !isHistory &&
          index === messages.length - 1 ? (
          <ResponseAnimation key={index}>
            <ModelMessage message={message} />
          </ResponseAnimation>
        ) : (
          <ModelMessage key={index} message={message} />
        )
      )}
    </>
  );
};
export default MessagesContainer;
