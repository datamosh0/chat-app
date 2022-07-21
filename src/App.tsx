import { useEffect } from "react";
import { useAuth } from "./Hooks/useAuth";
import { useParams } from "react-router-dom";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import "./index.css";
import { db } from "./firebase";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import Direct from "./components/Main/Direct";
import DirectSidebar from "./components/Sidebar/DirectSidebar";

import {
  SidebarRemoveUser,
  SidebarCenter,
} from "./components/Sidebar/sidebar.style";
const App = () => {
  const currentUser: User = useAuth();
  const { to } = useParams<{ to: string }>();
  const { uid } = useParams<{ uid: string }>();
  const { URLRoomID } = useParams<{ URLRoomID: string }>();

  useEffect(() => {
    const checkHasAccount = async () => {
      const docRef = doc(db, "direct", `${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          messageHistory: [],
        });
      }
    };
    checkHasAccount();
  }, [currentUser]);
  const removeUser = async () => {
    await deleteDoc(doc(db, "direct", `${currentUser.uid}`));
    alert("User Removed");
  };
  return (
    <div className="App">
      <SidebarCenter onClick={removeUser}>
        <SidebarRemoveUser>
          Remove My Name from the Direct Messages
        </SidebarRemoveUser>
      </SidebarCenter>
      <div className="App__wrapper">
        {URLRoomID! && <Main></Main>}
        {to! && <Direct></Direct>}
        {!uid ? <Sidebar></Sidebar> : <DirectSidebar></DirectSidebar>}
      </div>
    </div>
  );
};

export default App;
