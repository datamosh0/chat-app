import { KeyboardEvent, useState, FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../Hooks/useAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { MainFooter, MainFooterInput } from "./main.style";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const IconBtn: any = IconButton;
const MainInput: any = MainFooterInput;

const Footer = ({ roomName, messages, toData }: any) => {
  const currentUser = useAuth();
  const [input, setInputValue] = useState("");
  const { URLRoomID } = useParams<{ URLRoomID: string }>();
  const { to } = useParams<{ to: any }>();
  const { uid } = useParams<{ uid: any }>();

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (to) sendDirect();
      if (URLRoomID) sendGlobal();
    }
  };

  const sendGlobal = async () => {
    let newDate =
      new Date().toTimeString().split("G")[0] + new Date().toDateString();
    let tempMessages = messages;
    const { email, displayName, photoURL, uid } = currentUser;
    let newMessage = {
      email: email,
      displayName: displayName,
      photoUrl: photoURL,
      uid: uid,
      message: input,
      timestamp: newDate,
    };
    tempMessages.push(newMessage);

    await setDoc(doc(db, "rooms", roomName), {
      roomID: URLRoomID,
      messageHistory: tempMessages,
    });

    setInputValue("");
  };

  const sendDirect = async () => {
    const newDate =
      new Date().toTimeString().split("G")[0] + new Date().toDateString();

    const newMessage = {
      to: to,
      from: uid,
      message: input,
      timestamp: newDate,
    };

    const userInfo = {
      email: currentUser.email,
      displayName: currentUser.displayName,
      uid: currentUser.uid,
      messageHistory: [...messages, newMessage],
    };
    const recipientInfo = {
      email: toData.email,
      displayName: toData.displayName,
      uid: toData.uid,
      messageHistory: [...toData.messageHistory, newMessage],
    };
    console.log(recipientInfo);
    await setDoc(doc(db, "direct", uid), {
      ...userInfo,
    });
    await setDoc(doc(db, "direct", to), {
      ...recipientInfo,
    });

    setInputValue("");
  };

  return (
    <div>
      {to ? (
        <MainFooter onSubmit={sendDirect} onKeyPress={handleKeyPress}>
          <MainInput
            className="message-input my-textarea"
            name="newMessage"
            value={input}
            loadingComponent={() => <span>Loading</span>}
            onChange={(e: any) => setInputValue(e.target.value)}
          />

          <IconBtn onClick={sendDirect} label="Send Message">
            <SendIcon />
          </IconBtn>
        </MainFooter>
      ) : (
        <MainFooter onSubmit={sendGlobal} onKeyPress={handleKeyPress}>
          <MainInput
            className="message-input my-textarea"
            name="newMessage"
            value={input}
            loadingComponent={() => <span>Loading</span>}
            onChange={(e: any) => setInputValue(e.target.value)}
          />

          <IconBtn onClick={sendGlobal} label="Send Message">
            <SendIcon />
          </IconBtn>
        </MainFooter>
      )}
    </div>
  );
};

export default Footer;
