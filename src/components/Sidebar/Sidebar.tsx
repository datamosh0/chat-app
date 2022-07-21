import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import {
  onSnapshot,
  query,
  collection,
  DocumentData,
  Query,
} from "firebase/firestore";
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
  const [contacts, setContacts] = useState<Room[]>();
  const currentUser: User = useAuth();
  const roomStart = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createChat = (): void => {
    const roomName: string | null = prompt(
      "Please enter name of new chat room"
    );
    if (roomName === "") return;
    if (roomName!.length >= 20) {
      alert("Please enter a roomname with less than 20 characters");
      return;
    }
    if (roomName && roomName.length <= 20) {
      const roomRef = doc(db, "rooms", roomName);
      setDoc(roomRef, { roomID: uuidv4() });
    }
  };

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const subscribeGlobal = () => {
    const q: Query<DocumentData> = query(collection(db, "rooms"));
    const unsubscribeRooms = onSnapshot(q, (querySnapshot: DocumentData) => {
      const rooms: Room[] = [];
      querySnapshot.forEach((doc: { data: () => DocumentData; id: string }) => {
        const data = doc.data();
        const temp: Room = {
          roomID: data.roomID,
          roomName: data.roomName,
          messageHistory: data.messageHistory,
        };
        rooms.push(temp);
      });
      console.log(rooms);
      setContacts(rooms);
      setLoading(false);
    });
    return () => unsubscribeRooms();
  };

  useEffect(() => {
    setContacts([]);
    subscribeGlobal();
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

      <div ref={roomStart}></div>
      {!loading && (
        <SidebarChat>
          {contacts!.length >= 1
            ? contacts!.map((room: Room) => (
                <SideChat
                  key={room.roomID}
                  id={room.roomID}
                  name={room.roomName}
                  messageHistory={room.messageHistory}
                  link={"/rooms/" + room.roomID}
                />
              ))
            : "There is no rooms yet"}
        </SidebarChat>
      )}
      <SidebarMenu>
        <Link to={`/`}>
          <SidebarMenuItem style={{ background: "#ccc" }}>
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
