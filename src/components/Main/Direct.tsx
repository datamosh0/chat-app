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
  QueryDocumentSnapshot,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
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

const Direct = () => {
  const currentUser = useAuth();
  const [messages, setMessages] = useState([]);
  const { uid } = useParams<{ uid: string | undefined }>();
  const { to } = useParams<{ to: any }>();
  const [roomName, setRoomName] = useState<string>("");
  const [toData, setToData] = useState<any>([]);
  const [lastMessageDate, setLastMessageDate] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messageHistory, setMessageHistory] = useState<any>();
  const [changeFlag, setChangeFlag] = useState<boolean>();
  const [avatarURL, setAvatarURL] = useState<string>("");
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const getToData = async () => {
    const docRef = doc(db, "direct", to);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    const q = query(collection(db, "direct"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        if (docSnap.exists()) {
          let toData = docSnap.data();
          let data = doc.data();
          let tempDate;
          for (let i = messageHistory.length - 1; i >= 0; i--) {
            if (
              messageHistory[i].from === currentUser.uid ||
              messageHistory[i].to === currentUser.uid
            ) {
              tempDate = messageHistory[i].timestamp;
              break;
            }
          }
          if (!tempDate) tempDate = "";

          let thisConversation: any = [];
          data.messageHistory.forEach((message: { to: any; from: any }) => {
            if (message.to === toData.uid || message.from === toData.uid) {
              thisConversation.push(message);
            }
          });
          const temp: string | null = localStorage.getItem(toData.displayName);
          const temp2 =
            temp !== null
              ? temp
              : `https://avatars.dicebear.com/api/human/${Math.floor(
                  Math.random() * 5000
                )}.svg`;

          setAvatarURL(JSON.parse(temp2));
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
  }, [to, changeFlag]);

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
        <Avatar src={avatarURL} />
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
                    <LinkChecker message={message} />
                    <Avatar src={`${currentUser.photoURL}`} />
                  </OwnMessage>
                );
              } else {
                return (
                  <Message key={from + message + timestamp}>
                    <Avatar src={avatarURL} />
                    <LinkChecker message={message} />
                  </Message>
                );
              }
            })}
          </>
        )}
        <div ref={messageEndRef}></div>
      </MainContent>
      <Footer
        roomName={roomName}
        messages={messageHistory}
        toData={toData}
        setChangeFlag={setChangeFlag}
        changeFlag={changeFlag}
      />
    </MainWrapper>
  );
};

export default Direct;
