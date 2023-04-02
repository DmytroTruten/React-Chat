import React from "react";
import { useState } from "react";
import Search from "./Search";
import SidebarChatList from "./SidebarChatList";
import SidebarSettings from "./SidebarSettings";

const Sidebar = () => {
  const [sidebarSettingsOpened, setSidebarSettings] = useState("closed");
  const handleToggleSidebarSettings = () => {
    sidebarSettingsOpened === "closed"
      ? setSidebarSettings("opened")
      : setSidebarSettings("closed");
  };

  return (
    <div className="Sidebar d-flex flex-column">
      <Search handleToggleSidebarSettings={handleToggleSidebarSettings} />
      <SidebarChatList />
      <SidebarSettings state={sidebarSettingsOpened}/>
    </div>
  );
};

export default Sidebar;
