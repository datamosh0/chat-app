import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../Hooks/useAuth";

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

const Direct = () => {
  const currentUser = useAuth();
  const [messages, setMessages] = useState([]);
  const { uid } = useParams<{ uid: any }>();
  const { to } = useParams<{ to: any }>();
  const [roomName, setRoomName] = useState<string>("");
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [toData, setToData] = useState<any>([]);
  const [lastMessageDate, setLastMessageDate] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messageHistory, setMessageHistory] = useState<any>();
  const randomNum: number = Math.random() * 2000;
  const UsersAvatars = `https://avatars.dicebear.com/api/human/${randomNum}.svg`;

  const getToData = async () => {
    const docRef = doc(db, "direct", to);
    const docSnap: any = await getDoc(docRef);

    const q = query(collection(db, "direct"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        if (docSnap.exists()) {
          let toData = docSnap.data();
          let data = doc.data();
          let tempDate;
          if (data.messageHistory.length > 0) {
            tempDate =
              data.messageHistory[data.messageHistory.length - 1].timestamp;
          } else {
            tempDate = "";
          }

          let thisConversation: any = [];
          data.messageHistory.forEach((message: any) => {
            if (message.to === toData.uid || message.from === toData.uid) {
              thisConversation.push(message);
            }
          });
          setMessageHistory(data.messageHistory);
          setLastMessageDate(tempDate);
          setToData(toData);
          setMessages(thisConversation);
          setLoading(false);
        }
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    setMessages([]);
    getToData();
  }, [to]);

  const scrollToBottom = () => {
    if (messageEndRef) {
      messageEndRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else return;
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <MainWrapper>
      <MainHeader>
        <Avatar src={UsersAvatars} />
        <MainHeaderInfo>
          {!loading && (
            <>
              <h1>{toData.displayName}</h1>
              <p>{lastMessageDate}</p>
            </>
          )}
        </MainHeaderInfo>
      </MainHeader>

      <MainContent>
        {!loading && (
          <>
            {messages.map((msg: any) => {
              let { message, timestamp, from } = msg;
              if (timestamp === undefined) timestamp = "";
              if (from === currentUser.uid) {
                return (
                  <OwnMessage key={from + message + timestamp}>
                    <MessageContent>{message}</MessageContent>
                    <Avatar src={`${currentUser.photoURL}`} />
                  </OwnMessage>
                );
              } else {
                return (
                  <Message key={from + message + timestamp}>
                    <Avatar src={UsersAvatars} />
                    <MessageContent>{message}</MessageContent>
                  </Message>
                );
              }
            })}
          </>
        )}
        <div ref={messageEndRef}></div>
      </MainContent>
      <Footer roomName={roomName} messages={messageHistory} toData={toData} />
    </MainWrapper>
  );
};

export default Direct;
