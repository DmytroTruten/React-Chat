import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import SidebarChatList from "../components/SidebarChatList";
import SidebarSettings from "../components/SidebarSettings";
import Input from "../components/Input";
import NavBar from "../components/Navbar";
import Messages from "../components/Messages";
import "../styles/Home/Home.css";
import {
  setSidebarMenuState,
  selectSidebarMenuState,
  selectSidebarChatState,
  selectKebabMenuState,
  selectDarkModeSwitchState,
  setKebabMenuState,
} from "../features/sidebar/sidebarSlice.js";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);
  const sidebarMenuState = useSelector(selectSidebarMenuState);
  const sidebarChatState = useSelector(selectSidebarChatState);
  const kebabMenuState = useSelector(selectKebabMenuState);
  const darkModeSwitchState = useSelector(selectDarkModeSwitchState);
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
    <Row
      className={`ChatContainer d-flex mx-0 px-0 ${darkModeSwitchState}`}
      ref={chatContainerRef}
      onMouseMove={handleMouseMove}
    >
      <Col className="SidebarContainer px-0">
        <Container
          className="Sidebar d-flex flex-column mx-0 px-0"
          ref={sidebarRef}
        >
          <Search />
          <SidebarChatList />
          <SidebarSettings />
        </Container>
      </Col>
      <Col className="MessagesContainer px-0">
        {sidebarChatState === "opened" && (
          <>
            <NavBar />
            <Messages />
            <Input />
          </>
        )}
        {sidebarChatState === "closed" && <Messages />}
      </Col>
    </Row>
  );
};

export default Home;
