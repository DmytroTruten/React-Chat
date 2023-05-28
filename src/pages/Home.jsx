import React, { useRef, useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import SidebarChatList from "../components/SidebarChatList";
import SidebarSettings from "../components/SidebarSettings";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import Input from "../components/Input";
import "../styles/Home/Home.css";
import {
  setSidebarMenuState,
  selectSidebarMenuState,
  selectSidebarChatState,
  selectKebabMenuState,
  setKebabMenuState,
} from "../store";

const Home = () => {
  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);
  const sidebarMenuState = useSelector(selectSidebarMenuState);
  const sidebarChatState = useSelector(selectSidebarChatState);
  const kebabMenuState = useSelector(selectKebabMenuState);
  const storeDispatch = useDispatch();

  const handleMouseMove = (e) => {
    if (!chatContainerRef.current) return;

    const rect = chatContainerRef.current.getBoundingClientRect();
    const cursorPositionX = e.clientX - rect.left;
    const cursorPositionY = e.clientY - rect.top;
    const { innerWidth, innerHeight } = window;

    if (
      sidebarMenuState === "opened" &&
      (cursorPositionX > innerWidth / 3 ||
        cursorPositionY > (innerHeight * 2) / 3)
    ) {
      storeDispatch(setSidebarMenuState());
    }

    if (
      kebabMenuState === "opened" &&
      (cursorPositionX < innerWidth / 12 ||
        cursorPositionX > innerWidth / 3 ||
        cursorPositionY > innerHeight / 3)
    ) {
      storeDispatch(setKebabMenuState());
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
            <Search />
            <SidebarChatList />
            <SidebarSettings />
          </div>
          <div className="Chat d-flex flex-column justify-content-center">
            {sidebarChatState === "closed" && <Messages />}
            {sidebarChatState === "opened" && (
              <Fragment>
                <Navbar />
                <Messages />
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
