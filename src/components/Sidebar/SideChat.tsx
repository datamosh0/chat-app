import { useEffect, useState } from "react";
import { ChatItem, ChatItemInfo } from "./sidebar.style";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const SideChat = ({ id, name, messageHistory, link }: any): JSX.Element => {
  const [lastMessage, setLastMessage] = useState<any>([]);
  const [lastDate, setLastDate] = useState<any>([]);
  const avatarURL = `https://avatars.dicebear.com/api/human/${id}.svg`;
  useEffect(() => {
    if (messageHistory) {
      let lastMessage = messageHistory[messageHistory.length - 1];
      let tempMessage = lastMessage.message;
      setLastMessage(tempMessage);
      setLastDate(lastMessage.timestamp);
    }
  }, [messageHistory]);

  return (
    <Link to={`${link}`}>
      <ChatItem id={id}>
        <Avatar src={avatarURL} />
        <ChatItemInfo>
          <h2>{name}</h2>
          <div>
            {lastMessage ? (
              <div>
                <p>{lastMessage}</p>
                <p>{lastDate}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </ChatItemInfo>
      </ChatItem>
    </Link>
  );
};

export default SideChat;
