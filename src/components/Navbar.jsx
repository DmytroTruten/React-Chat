import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import "../styles/Navbar/Navbar.css";

const Navbar = () => {
  const { data } = useContext(ChatContext); // Accessing data from ChatContext

  return (
    <div className="Navbar d-flex">
      <div
        className={`NavbarUserAvatarContainer ${
          data.user?.displayName === "Saved Messages"
            ? "SavedMessagesImgContainer"
            : ""
        } d-flex justify-content-center align-items-center`}
      >
        <img className="UserAvatar" src={data.user?.photoURL} alt="" />
      </div>
      <p className="NavbarUsername">{data.user?.displayName}</p>
    </div>
  );
};

export default Navbar;
