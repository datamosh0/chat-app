import React, { useEffect, useState } from "react";
import { ChatItem, ChatItemInfo } from "./sidebar.style";
import { Avatar } from "@mui/material";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";

const DirectSearch = ({ name, lastMessage, link }: any): JSX.Element => {
  const avatarURL = `https://avatars.dicebear.com/api/human/${Math.floor(
    Math.random() * 5000
  )}.svg`;
  localStorage.setItem(`${name}`, JSON.stringify(avatarURL));

  return (
    <Link to={`${link}`}>
      <ChatItem>
        <Avatar src={avatarURL} />
        <ChatItemInfo>
          <h2>{name}</h2>
          <div>
            <p>{lastMessage.message}</p>
            <p>{lastMessage.timestamp}</p>
          </div>
        </ChatItemInfo>
      </ChatItem>
    </Link>
  );
};

export default DirectSearch;
