import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Navbar from "react-bootstrap/Navbar";
import useWindowWidth from "../hooks/useWindowWidth";
import { Image } from "react-bootstrap";
import backIcon from "../assets/back-icon.svg";
import "../styles/Navbar/Navbar.css";

const NavBar = () => {
  const { data } = useContext(ChatContext); // Accessing data from ChatContext
  const width = useWindowWidth();

  return (
    <Navbar className="Navbar">
      {width < 576 && (
        <button
          className="NavbarBackButton d-flex justify-content-center align-items-center px-0"
          onClick={() =>
            document
              .querySelector(".Sidebar")
              .scrollIntoView({ inline: "start", behavior: "smooth" })
          }
        >
          <Image src={backIcon} />
        </button>
      )}
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
    </Navbar>
  );
};

export default NavBar;
