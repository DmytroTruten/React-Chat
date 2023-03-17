import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./NavBar.css"

function NavBar() {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="NavBar">
      <p>React Chat</p>
      {user ? (
        <button className="sign-out" onClick={signOut}>Sign Out</button>
      ) : null}
    </nav>
  )
}

export default NavBar;
