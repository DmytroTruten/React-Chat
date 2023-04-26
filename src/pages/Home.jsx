import React, { useRef, useState, useEffect, Fragment } from "react";
import Search from "../components/Search";
import SidebarChatList from "../components/SidebarChatList";
import SidebarSettings from "../components/SidebarSettings";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import Input from "../components/Input";
import "../styles/Home/Home.css";

const Home = () => {
  const [sidebarSettingsState, setSidebarSettingsState] = useState("closed");
  const [sidebarChatState, setSidebarChatState] = useState("closed");
  const [sidebarMenuState, setSidebarMenuState] = useState("closed");
  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleSidebarState = (sidebarType) => {
    if (sidebarType === "chat") {
      sidebarChatState === "closed" ? setSidebarChatState("opened") : null;
    } else if (sidebarType === "settings") {
      sidebarSettingsState === "closed"
        ? setSidebarSettingsState("opened")
        : setSidebarSettingsState("closed");
    } else {
      sidebarMenuState === "closed"
        ? setSidebarMenuState("opened")
        : setSidebarMenuState("closed");
    }
  };

  const handleMouseMove = (e) => {
    if (!chatContainerRef.current) return;

    const rect = chatContainerRef.current.getBoundingClientRect();
    const cursorPositionX = e.clientX - rect.left;
    const cursorPositionY = e.clientY - rect.top;
    const { innerWidth, innerHeight } = window;

    if (
      sidebarMenuState === "opened" &&
      (cursorPositionX > innerWidth / 3 || cursorPositionY > (innerHeight * 2) / 3)
    ) {
      handleSidebarState("menu");
    }
  };

  return (
    <div className="Home h-100 mx-0 my-0">
      <div
        className="ChatContainer d-flex flex-column px-0"
        ref={chatContainerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="d-flex h-100">
          <div className="Sidebar d-flex flex-column" ref={sidebarRef}>
            <Search handleSidebarState={handleSidebarState} />
            <SidebarChatList
              handleSidebarState={handleSidebarState}
              sidebarMenuState={sidebarMenuState}
            />
            <SidebarSettings
              handleSidebarState={handleSidebarState}
              sidebarSettingsState={sidebarSettingsState}
            />
          </div>
          <div className="Chat d-flex flex-column justify-content-center">
            {sidebarChatState === "closed" && (
              <Messages sidebarChatState={sidebarChatState} />
            )}
            {sidebarChatState === "opened" && (
              <Fragment>
                <Navbar />
                <Messages sidebarChatState={sidebarChatState} />
                <Input />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
