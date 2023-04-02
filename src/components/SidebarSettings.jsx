import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";

const SidebarSettings = ({ state }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className={`SidebarSettings ${state}`}>
      <p>{currentUser.displayName}</p>
      <Button
        className="LogoutButton"
        size="sm"
        onClick={() => {
          signOut(auth);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default SidebarSettings;
