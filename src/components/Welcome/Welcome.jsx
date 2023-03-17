import React, { useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import logo from "../../logo.svg";
import signInImg from "../../assets/google-sign-in.png";
import "./Welcome.css";

function App() {
  const [user, setUser] = useState(false);

  const googleSignIn = () => {
    setUser(true);
  };

  const signOut = () => {
    setUser(false);
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="Welcome-text">Welcome to React-Chat!</p>
      <p className="Sign-text">
        Sign in with Google to chat with your friends.
      </p>
      <button className="Sign-button" onClick={googleSignIn}>
        <img src={signInImg} alt="" />
      </button>
    </div>
  );
}

export default App;
