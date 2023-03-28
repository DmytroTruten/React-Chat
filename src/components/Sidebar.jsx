import React from "react";
import Search from "./Search";
import SidebarChatList from "./SidebarChatList";

const Sidebar = () => {
  return (
    <div className="Sidebar d-flex flex-column">
      <Search />
      <SidebarChatList />
    </div>
  );
};

export default Sidebar;
