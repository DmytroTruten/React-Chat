import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import "../styles/Messages/Messages.css";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { selectSidebarChatState } from "../features/sidebar/sidebarSlice.js";
import { Container } from "react-bootstrap";

const Messages = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const { data } = useContext(ChatContext); // Chat context
  const sidebarChatState = useSelector(selectSidebarChatState); // Sidebar chat state

  useEffect(() => {
    // Effect triggered when chat ID changes
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages); // Get and set messages from the database
    });

    return () => {
      unsub(); // Unsubscribe from document snapshot
    };
  }, [data.chatID]);

  return (
    <Container className="Messages d-flex flex-column mx-0 px-0">
      {sidebarChatState === "closed" && (
        <div className="IntroTextContainer align-self-center my-auto">
          <p className="IntroText text-center ">
            Choose who you would like to write to
          </p>
        </div>
      )}
      {sidebarChatState === "opened" &&
        messages?.map((message) => (
          <Message message={message} key={message.id} /> // Render each message
        ))}
    </Container>
  );
};

export default Messages;
