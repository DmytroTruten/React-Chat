import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";

const SidebarSettings = ({ state }) => {
  return (
    <div className={`SidebarSettings ${state}`}>
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
