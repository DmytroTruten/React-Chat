import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import Input from "../components/Input";

import "../styles/Home/Home.css";

const Home = () => {
  const [sidebarSettingsOpened, setSidebarSettings] = useState("closed");
  const overlayRef = useRef(null);

  const Overlay = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
      setIsVisible(!isVisible);
      props.handleToggleSidebarSettings();
    };

    const handleAnimationEnd = () => {
      if (overlayRef.current && sidebarSettingsOpened === "closed") {
        overlayRef.current.style.display = "none";
      }
    };

    return (
      <div
        ref={overlayRef}
        onClick={handleClick}
        className="Overlay"
        style={{ display: "none" }}
        onAnimationEnd={handleAnimationEnd}
      ></div>
    );
  });

  useEffect(() => {
    if (overlayRef.current) {
      if (sidebarSettingsOpened === "opened") {
        overlayRef.current.style.display = "block";
        overlayRef.current.style.animation = "reveal .2s ease-in-out forwards";
      } else {
        overlayRef.current.style.animation = "hide .2s ease-in-out forwards";
        setTimeout(() => {
          overlayRef.current.style.display = "none";
        }, 200);
      }
    }
  }, [sidebarSettingsOpened]);

  const handleToggleSidebarSettings = () => {
    sidebarSettingsOpened === "closed"
      ? setSidebarSettings("opened")
      : setSidebarSettings("closed");
  };
  return (
    <div className="Home row justify-content-center align-items-center h-100 mx-0 my-0">
      <div className="ChatContainer col-8 d-flex px-0">
        <Sidebar
          handleToggleSidebarSettings={handleToggleSidebarSettings}
          state={sidebarSettingsOpened}
        />
        <div className="Chat">
          <Navbar />
          <Messages />
          <Input />
        </div>
        <Overlay
          ref={overlayRef}
          handleToggleSidebarSettings={handleToggleSidebarSettings}
        />
      </div>
    </div>
  );
};

export default Home;
