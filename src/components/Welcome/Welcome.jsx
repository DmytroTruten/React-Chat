import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import signInImg from "../../assets/google-sign-in.png";
import logo from "../../logo.svg";
import "./Welcome.css";

function Welcome() {
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="Welcome">
      <img src={logo} className="Welcome-logo" alt="logo" />
      <p className="Welcome-text">Welcome to React Chat!</p>
      <p className="Sign-text">
        Sign in with Google to chat with your friends.
      </p>
      <button className="Sign-button" onClick={googleSignIn}>
        <img src={signInImg} alt="" />
      </button>
    </div>
  );
}

export default Welcome;
