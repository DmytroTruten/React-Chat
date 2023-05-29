import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import "../styles/Messages/Messages.css";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { selectSidebarChatState } from "../features/sidebar/sidebarSlice.js";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const sidebarChatState = useSelector(selectSidebarChatState);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatID]);

  return (
    <div
      className={`Messages d-flex flex-column`}
    >
      {sidebarChatState === "closed" && (
        <div className="IntroTextContainer align-self-center my-auto">
          <p className="IntroText text-center ">
            Choose who you would like to write to
          </p>
        </div>
      )}
      {sidebarChatState === "opened" &&
        messages?.map((message) => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  );
};

export default Messages;
