import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { onSnapshot, query, collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../Hooks/useAuth";

import {
  SidebarWrapper,
  SidebarHeader,
  SidebarChat,
  SidebarHeaderName,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSearch,
  SidebarSearchInput,
  SidebarHeaderIcons,
} from "./sidebar.style";
import { Avatar, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import SideChat from "./SideChat";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";

const IconBtn: any = IconButton;

const Sidebar = (): JSX.Element => {
  const [contactsObj, setContactsObj] = useState<any[]>([]);
  const currentUser = useAuth();
  const roomStart = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createChat = (): void => {
    const roomName = prompt("Please enter name of new chat room");
    if (roomName && roomName.length <= 15) {
      const roomRef = doc(db, "rooms", roomName);
      setDoc(roomRef, { roomID: uuidv4() });
    } else if (typeof roomName === "string") {
      if (roomName.trim().length === 0) {
        alert("Please provide room name");
        return;
      }
    } else {
      alert(
        "Room name is too long, you can provide maximum 15 characters. Try again"
      );
    }
  };

  const scrollToBottom = (): void => {
    roomStart?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(scrollToBottom, [contactsObj]);

  const logOut = (): void => {
    dispatch(logout());
    navigate("/");
  };

  const subscribeGlobal = (q: any) => {
    const unsubscribeRooms = onSnapshot(q, (querySnapshot: any) => {
      const rooms: any[] = [];
      querySnapshot.forEach((doc: { data: () => any; id: any }) => {
        const data = doc.data();
        const temp = { ...data, roomName: doc.id };
        rooms.push(temp);
      });
      setContactsObj(
        rooms.map((doc) => ({
          id: doc.roomID,
          name: doc.roomName,
          messageHistory: doc.messageHistory,
        }))
      );
    });
    return () => unsubscribeRooms();
  };

  useEffect(() => {
    setContactsObj([]);
    const q = query(collection(db, "rooms"));
    subscribeGlobal(q);
  }, []);

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <Avatar src={`${currentUser.photoURL}`} />
        <SidebarHeaderName>{currentUser.displayName}</SidebarHeaderName>
        <SidebarHeaderIcons>
          <IconBtn onClick={logOut} label="logout">
            <ExitToAppTwoToneIcon />
          </IconBtn>
        </SidebarHeaderIcons>
      </SidebarHeader>
      <IconBtn onClick={createChat} className="addButton" label="Create room">
        <AddCircleIcon />
      </IconBtn>

      <SidebarChat>
        <div ref={roomStart}></div>
        {contactsObj.length >= 1
          ? contactsObj.map((room) => (
              <SideChat
                key={room.id}
                id={room.id}
                name={room.name}
                messageHistory={room.messageHistory}
                link={"/rooms/" + room.id}
                timestamp={new Date()}
              />
            ))
          : "There is no rooms yet"}
      </SidebarChat>
      <SidebarMenu>
        <Link to={`/`}>
          <SidebarMenuItem>
            <PublicIcon />
          </SidebarMenuItem>
        </Link>
        <Link to={`/direct/${currentUser.uid}`}>
          <SidebarMenuItem>
            <EmailIcon />
          </SidebarMenuItem>
        </Link>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default Sidebar;
