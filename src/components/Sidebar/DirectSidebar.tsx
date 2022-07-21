import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { query, collection, getDocs } from "firebase/firestore";
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
  SidebarRemoveUser,
  SidebarCenter,
} from "./sidebar.style";
import { Avatar, IconButton } from "@mui/material";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const IconBtn: any = IconButton;

const DirectSidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser: User = useAuth();
  const inputElement = useRef<null | HTMLInputElement>(null);
  const roomStart = useRef<HTMLDivElement>(null);
  const { uid } = useParams<{ uid: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [initUsers, setInitUsers] = useState<User[]>([]);
  const [searchingAccounts, setSearchingAccounts] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [latestMessages, setLatestMessages] = useState<any>();

  const searchFunction = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    let input = inputElement.current?.value;

    let tempUsers: User[] = [];
    let usersToSearch = users;
    if (e.key === "Backspace") {
      usersToSearch = initUsers;
    }
    usersToSearch.forEach((user) => {
      if (user.displayName!.includes(input!) || user.email!.includes(input!)) {
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
          uid: data.uid,
          messageHistory: data.messageHistory,
        });
      });

      const conversations: Message[] = [];
      users.forEach((user) => {
        let thisID = user.uid;
        if (uid === thisID) return;
        let arr = result.messageHistory.filter(
          (message: Message) => message.to === thisID || message.from === thisID
        );
        conversations.push(arr);
      });
      let latestMessagePerConversation: Message[] = [];
      conversations.forEach((conversation: any) => {
        if (conversation[conversation.length - 1] === undefined) return;
        latestMessagePerConversation.push(
          conversation[conversation.length - 1]
        );
      });

      setLatestMessages(latestMessagePerConversation);
      setUsers(users);
      setInitUsers(users);
      setLoading(false);
    };

    subscribeDirect();
  }, [uid]);

  const logOut = () => {
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
        <IconBtn
          onClick={() => setSearchingAccounts(true)}
          className="addButton"
          label="Create room"
        >
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
              {users.map((user: User) => {
                let lastMessage: Message;
                let { email, displayName, messageHistory, uid } = user;
                if (uid === currentUser.uid) return <></>;
                for (let i = messageHistory!.length - 1; i >= 0; i--) {
                  if (
                    messageHistory![i].from === currentUser.uid ||
                    messageHistory![i].to === currentUser.uid
                  ) {
                    lastMessage = messageHistory![i];
                    break;
                  }
                }
                return (
                  <DirectSearch
                    key={email}
                    name={displayName}
                    lastMessage={lastMessage!}
                    link={"/direct/" + currentUser.uid + "/" + uid}
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
          {latestMessages.length === 0 ? (
            <SidebarChat>You have no messages</SidebarChat>
          ) : (
            latestMessages.map((message: Message) => {
              let messageFlag: string | null;
              if (message.to === currentUser.uid) messageFlag = message.from;
              else messageFlag = message.to;

              let toInfo = initUsers.filter(
                (user) => user.uid === messageFlag
              )[0];

              return (
                <DirectSearch
                  key={message.email}
                  lastMessage={message}
                  name={toInfo.displayName}
                  link={"/direct/" + currentUser.uid + "/" + messageFlag}
                ></DirectSearch>
              );
            })
          )}
        </SidebarChat>
      ) : (
        <SidebarChat>Loading...</SidebarChat>
      )}

      <SidebarMenu>
        <Link to={`/`}>
          <SidebarMenuItem>
            <PublicIcon />
          </SidebarMenuItem>
        </Link>
        <Link to={`/direct/${currentUser.uid}`}>
          <SidebarMenuItem style={{ background: "#ccc" }}>
            <EmailIcon />
          </SidebarMenuItem>
        </Link>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default DirectSidebar;
