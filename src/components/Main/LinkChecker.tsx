import { https, http } from "../../Helpers/linksDetectors";
import { MessageContent } from "./main.style";
const LinkChecker = ({ message }: any) => {
  const handleLinks = (message: string): boolean => {
    if (message.includes(https) || message.includes(http)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <MessageContent>
      {handleLinks(message) ? (
        <a href={message} target="_blank" rel="noopener noreferrer">
          {message}
        </a>
      ) : (
        message
      )}
    </MessageContent>
  );
};

export default LinkChecker;
