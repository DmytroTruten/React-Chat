import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import "../styles/Navbar/Navbar.css";

const Navbar = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="Navbar d-flex">
      <img
        className={`UserAvatar ${
          data.user?.displayName === "Saved Messages"
            ? "SavedMessagesUserAvatar"
            : ""
        }`}
        src={data.user?.photoURL}
        alt=""
      />
      <p className="NavbarUsername">{data.user?.displayName}</p>
    </div>
  );
};

export default Navbar;
