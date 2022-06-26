import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { onSnapshot, query, collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../Hooks/useAuth";
import DirectSearch from "./DirectSearch";

import {
  SidebarWrapper,
  SidebarHeader,
  SidebarHeaderIcons,
  SidebarChat,
  SidebarHeaderName,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSearch,
  SidebarSearchInput,
} from "./sidebar.style";
import { Avatar, IconButton } from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import SideChat from "./SideChat";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import { SettingsInputSvideoRounded } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const IconBtn: any = IconButton;

const DirectSidebar = (): JSX.Element => {
  const [contactsObj, setContactsObj] = useState<any[]>([]);
  const [searchObj, setSearchObj] = useState<any[]>([]);
  const currentUser = useAuth();
  const inputElement = useRef<null | HTMLInputElement>(null);
  const roomStart = useRef<HTMLDivElement>(null);
  const { uid }: any = useParams<{ uid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [initUsers, setInitUsers] = useState<any[]>([]);
  const [searchingAccounts, setSearchingAccounts] = useState<any>(false);
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [latestMessages, setLatestMessages] = useState<any>();

  const createChat = (): void => {
    setSearchingAccounts(true);
  };

  const searchFunction = async (e: any) => {
    let input = inputElement.current?.value;

    let tempUsers: any[] = [];
    let usersToSearch = users;
    if (e.key === "Backspace") {
      usersToSearch = initUsers;
    }
    usersToSearch.forEach((user) => {
      if (user.displayName.includes(input) || user.email.includes(input)) {
        tempUsers.push(user);
      }
    });

    setUsers(tempUsers);
  };

  useEffect(() => {
    const subscribeDirect = async () => {
      let result: any = [];
      const q = query(collection(db, "direct"));
      const users: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (data.uid === uid) result = data;
        users.push({
          displayName: data.displayName,
          email: data.email,
          id: data.uid,
          messageHistory: data.messageHistory,
        });
      });

      const conversations: any = [];
      users.forEach((user) => {
        let thisID = user.id;
        if (uid === thisID) return;
        let arr = result.messageHistory.filter(
          (message: any) => message.to === thisID || message.from === thisID
        );
        conversations.push(arr);
      });
      let latestMessagePerConversation: any = [];
      conversations.forEach((conversation: any, index: any) => {
        if (conversation[conversation.length - 1] === undefined) return;
        latestMessagePerConversation.push(
          conversation[conversation.length - 1]
        );
      });

      setLatestMessages(latestMessagePerConversation);
      setUsers(users);
      setInitUsers(users);
      setUserData(result);
      setLoading(false);
    };

    subscribeDirect();
  }, [userData]);

  const scrollToBottom = (): void => {
    roomStart?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const logOut = (): void => {
    dispatch(logout());
    navigate("/");
  };

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
      {!searchingAccounts ? (
        <IconBtn onClick={createChat} className="addButton" label="Create room">
          <AddCircleIcon />
        </IconBtn>
      ) : (
        <IconBtn
          onClick={() => setSearchingAccounts(false)}
          className="addButton"
          label="Create room"
        >
          <CancelIcon />
        </IconBtn>
      )}
      {searchingAccounts && (
        <>
          <SidebarSearch>
            <IconButton htmlFor="searchChat" component="label">
              <SearchIcon />
            </IconButton>
            <SidebarSearchInput
              placeholder="Search for someone to chat"
              id="searchChat"
              ref={inputElement}
              onKeyUp={searchFunction}
            />
          </SidebarSearch>
          <SidebarChat>
            <div onClick={() => setSearchingAccounts(false)}>
              {users.map((user) => {
                if (user.id === currentUser.uid) return <></>;
                let lastMessage =
                  user.messageHistory[user.messageHistory.length - 1];
                if (!lastMessage) lastMessage = "";
                return (
                  <DirectSearch
                    key={user.email}
                    id={user.email}
                    name={user.displayName}
                    lastMessage={lastMessage}
                    link={"/direct/" + currentUser.uid + "/" + user.id}
                  ></DirectSearch>
                );
              })}
            </div>
          </SidebarChat>
        </>
      )}
      {!loading ? (
        <SidebarChat>
          <div ref={roomStart}></div>
          {latestMessages.map((message: any) => {
            let toInfo = initUsers.filter((user) => user.id === message.to)[0];
            return (
              <DirectSearch
                key={message.email}
                id={message.id}
                lastMessage={message}
                name={toInfo.displayName}
                link={"/direct/" + currentUser.uid + "/" + message.to}
              ></DirectSearch>
            );
          })}{" "}
        </SidebarChat>
      ) : (
        <SidebarChat>There is no messages yet</SidebarChat>
      )}
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

export default DirectSidebar;