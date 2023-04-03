import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";
import logo from "../assets/react.svg";

const SidebarSettings = ({ state }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={`SidebarSettings ${state} d-flex flex-column`}>
      <div className="SidebarSettingsInnerContainer p-3">
        <div className="UserAvatarContainer my-2">
          <img src={logo} alt="" />
        </div>
        <p>{currentUser.displayName}</p>
        <Button
          className="LogoutButton my-2"
          size="sm"
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidebarSettings;
