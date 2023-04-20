import React, { useRef, useState, useEffect, Fragment } from "react";
import Search from "../components/Search";
import SidebarChatList from "../components/SidebarChatList";
import SidebarSettings from "../components/SidebarSettings";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import Input from "../components/Input";
import "../styles/Home/Home.css";

const Home = () => {
  const [chatContainerState, setChatContainerState] = useState("desktop");
  const [sidebarSettingsState, setSidebarSettingsState] = useState("closed");
  const [sidebarChatState, setSidebarChatState] = useState("closed");
  const topPanelRef = useRef(null);
  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);

  const Overlay = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
      setIsVisible(!isVisible);
      props.handleSidebarState("settings");
    };

    const handleAnimationEnd = () => {
      if (overlayRef.current && sidebarSettingsState === "closed") {
        overlayRef.current.style.display = "none";
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className="Overlay"
        style={{ display: "none" }}
        onAnimationEnd={handleAnimationEnd}
      ></div>
    );
  });

  useEffect(() => {
    function handleResize() {
      let chatContainerWidth = chatContainerRef.current.offsetWidth;
      if (chatContainerWidth < 650) {
        setChatContainerState("mobile");
      } else {
        setChatContainerState("desktop");
      }
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("resize", handleResize);
      return () => {
        if (chatContainerRef.current) {
          chatContainerRef.current.removeEventListener("resize", handleResize);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (overlayRef.current) {
      if (sidebarSettingsState === "opened") {
        overlayRef.current.style.display = "block";
        overlayRef.current.style.animation = "reveal .2s ease-in-out forwards";
      } else {
        overlayRef.current.style.animation = "hide .2s ease-in-out forwards";
        setTimeout(() => {
          overlayRef.current.style.display = "none";
        }, 200);
      }
    }
  }, [sidebarSettingsState]);

  const handleSidebarState = (sidebarType) => {
    if (sidebarType === "chat") {
      sidebarChatState === "closed" ? setSidebarChatState("opened") : null;
    } else {
      sidebarSettingsState === "closed"
        ? setSidebarSettingsState("opened")
        : setSidebarSettingsState("closed");
    }
  };

  return (
    <div className="Home h-100 mx-0 my-0">
      <div
        className="ChatContainer d-flex flex-column px-0"
        ref={chatContainerRef}
      >
        <div className="d-flex h-100">
          <div className="Sidebar d-flex flex-column" ref={sidebarRef}>
            <Search handleSidebarState={handleSidebarState} />
            <SidebarChatList handleSidebarState={handleSidebarState} />
            <SidebarSettings state={sidebarSettingsState} />
          </div>
          <div className="Chat row justify-content-center">
            <div className="ChatInnerContainer col-8 d-flex flex-column h-100 px-0">
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
          <Overlay handleSidebarState={handleSidebarState} ref={overlayRef} />
        </div>
      </div>
    </div>
  );
};

export default Home;
