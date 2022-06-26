import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import Policy from "../Policy/Policy";
import { LogoWrapper, LogoHeader, LogoImage, LogoButton } from "./login.style";
import "../../index.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { email, displayName, photoURL, uid } = user!;
      const newuser: User = { email, displayName, photoURL, uid };
      dispatch(login(newuser));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <div className="App__wrapper" style={{ display: "flex" }}>
        <LogoWrapper>
          <LogoImage />
          <LogoHeader>Log into Chatter</LogoHeader>
          <LogoButton onClick={handleClick}>Log in with Google</LogoButton>
          <Policy></Policy>
        </LogoWrapper>
      </div>
    </div>
  );
}

export default Login;
