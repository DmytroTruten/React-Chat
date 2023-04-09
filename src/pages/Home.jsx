import React, { useRef, useState, useEffect } from "react";
import Search from "../components/Search";
import SidebarChatList from "../components/SidebarChatList";
import SidebarSettings from "../components/SidebarSettings";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import Input from "../components/Input";
import interact from "interactjs";
import "../styles/Home/Home.css";

const Home = () => {
  const [sidebarSettingsOpened, setSidebarSettings] = useState("closed");
  const topPanelRef = useRef(null);
  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);

  const Sidebar = React.forwardRef((props, ref) => {
    return (
      <div className="Sidebar d-flex flex-column" ref={ref}>
        <Search handleToggleSidebarSettings={handleToggleSidebarSettings} />
        <SidebarChatList />
        <SidebarSettings state={sidebarSettingsOpened} />
      </div>
    );
  });

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
        ref={ref}
        onClick={handleClick}
        className="Overlay"
        style={{ display: "none" }}
        onAnimationEnd={handleAnimationEnd}
      ></div>
    );
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      interact(chatContainerRef.current)
        .resizable({
          margin: 5,
          edges: { top: true, right: true, bottom: true, left: true },
          restrictEdges: {
            outer: ".Home",
            endOnly: true,
          },
          listeners: {
            move: function (event) {
              let { x, y } = event.target.dataset;

              x = (parseFloat(x) || 0) + event.deltaRect.left;
              y = (parseFloat(y) || 0) + event.deltaRect.top;

              Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`,
              });

              Object.assign(event.target.dataset, { x, y });
            },
          },
          modifiers: [
            interact.modifiers.restrictSize({
              min: { width: 400, height: 480 },
            }),
          ],
        })
        .draggable({
          allowFrom: ".TopPanel",
          restrict: {
            restriction: ".Home",
          },
          listeners: {
            move(event) {
              const target = event.target;
              const x =
                (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
              const y =
                (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
              target.style.webkitTransform = target.style.transform =
                "translate(" + x + "px, " + y + "px)";
              target.setAttribute("data-x", x);
              target.setAttribute("data-y", y);
            },
          },
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: ".Home",
              endOnly: true,
            }),
          ],
        });
    }
  }, [chatContainerRef]);

  useEffect(() => {
    if (sidebarRef.current) {
      interact(sidebarRef.current).resizable({
        margin: 5,
        edges: { top: false, left: false, bottom: false, right: true },
        listeners: {
          move: function (event) {
            let { x } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              transform: `translate(${x}px)`,
            });

            Object.assign(event.target.dataset, { x });
          },
        },
      });
    }
  }, [sidebarRef]);

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
    <div className="Home h-100 mx-0 my-0">
      <div
        className="ChatContainer d-flex flex-column px-0"
        ref={chatContainerRef}
      >
        <div className="TopPanel" ref={topPanelRef}></div>
        <div className="d-flex h-100">
          <Sidebar ref={sidebarRef} />
          <div className="Chat">
            <Navbar />
            <Messages />
            <Input />
          </div>
          <Overlay
            handleToggleSidebarSettings={handleToggleSidebarSettings}
            ref={overlayRef}
            z
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
