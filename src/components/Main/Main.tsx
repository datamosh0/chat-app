import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../Hooks/useAuth";
import LinkChecker from "./LinkChecker";

import {
  MainWrapper,
  MainHeader,
  MainHeaderInfo,
  MainContent,
  Message,
  MessageContent,
  OwnMessage,
} from "./main.style";
import { Avatar } from "@mui/material";
import Footer from "./Footer";

const Main = () => {
  const currentUser = useAuth();
  const [random, setRandom] = useState(0);
  const { URLRoomID } = useParams<{ URLRoomID: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [randomChat, setRandomChat] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>("");
  const [lastMessageDate, setLastMessageDate] = useState<string>("");
  const [changeFlag, setChangeFlag] = useState<boolean>();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const RandomAvatar = 3000;
  const RoomAvatar = `https://avatars.dicebear.com/api/human/${random}.svg`;
  const UsersAvatars = `https://avatars.dicebear.com/api/human/${randomChat}.svg`;

  useEffect(() => {
    setRandom(Math.floor(Math.random() * RandomAvatar));
    setRandomChat(Math.floor(Math.random() * RandomAvatar));
    if (URLRoomID) {
      setMessages([]);
      const q = query(collection(db, "rooms"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let data: any = {};
        querySnapshot.forEach((doc) => {
          let thisData = doc.data();
          if (thisData.roomID === URLRoomID) data = thisData;
          setRoomName(doc.id);
        });
        let tempDate =
          data.messageHistory[data.messageHistory.length - 1].timestamp;

        setLastMessageDate(tempDate);
        setMessages(data.messageHistory);
      });
      return unsubscribe;
    }
  }, [URLRoomID]);

  const scrollToBottom = () => {
    if (messageEndRef) {
      messageEndRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else return;
  };
  useEffect(scrollToBottom, []);

  return (
    <MainWrapper>
      <MainHeader>
        <Avatar src={RoomAvatar} />
        <MainHeaderInfo>
          <h1>{roomName}</h1>
          <p>
            {messages[messages.length - 1] ? (
              <span>{lastMessageDate}</span>
            ) : (
              <span>Empty room</span>
            )}
          </p>
        </MainHeaderInfo>
      </MainHeader>
      <MainContent>
        <>
          {messages.map((msg) => {
            const { email, message, timestamp } = msg;
            if (email === currentUser.email) {
              return (
                <OwnMessage key={message! + timestamp}>
                  <LinkChecker message={message} />
                  <Avatar src={`${currentUser.photoURL}`} />
                </OwnMessage>
              );
            } else {
              return (
                <Message key={message! + timestamp}>
                  <Avatar src={UsersAvatars} />
                  <LinkChecker message={message} />
                </Message>
              );
            }
          })}
        </>
        <div ref={messageEndRef}></div>
      </MainContent>
      <Footer
        roomName={roomName}
        messages={messages}
        toData={undefined}
        setChangeFlag={setChangeFlag}
        changeFlag={changeFlag}
      />
    </MainWrapper>
  );
};

export default Main;
