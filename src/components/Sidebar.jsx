import React from "react";
import Search from "./Search";
import SidebarChatList from "./SidebarChatList";
import SidebarSettings from "./SidebarSettings";

const Sidebar = ({state, handleToggleSidebarSettings}) => {
  return (
    <div className="Sidebar d-flex flex-column">
      <Search handleToggleSidebarSettings={handleToggleSidebarSettings} />
      <SidebarChatList />
      <SidebarSettings state={state}/>
    </div>
  );
};

export default Sidebar;
