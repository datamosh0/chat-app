import { useEffect } from "react";
import { useAuth } from "./Hooks/useAuth";
import { useParams } from "react-router-dom";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import "./index.css";
import { db } from "./firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import Direct from "./components/Main/Direct";
import DirectSidebar from "./components/Sidebar/DirectSidebar";
const App = () => {
  const currentUser: any = useAuth();
  const { to } = useParams<{ to: string }>();
  const { uid } = useParams<{ uid: string }>();
  const { URLRoomID } = useParams<{ URLRoomID: string }>();

  useEffect(() => {
    const checkHasAccount = async () => {
      const docRef = doc(db, "direct", currentUser.uid);
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

  return (
    <div className="App">
      <div className="App__wrapper">
        {URLRoomID && <Main></Main>}
        {to && <Direct></Direct>}
        {!uid ? <Sidebar></Sidebar> : <DirectSidebar></DirectSidebar>}
      </div>
    </div>
  );
};

export default App;
