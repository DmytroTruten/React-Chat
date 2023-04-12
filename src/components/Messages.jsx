import React, { useContext, useState } from "react";
import Message from "./Message";
import "../styles/Messages/Messages.css";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Messages = ({ sidebarChatState }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

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
      className={`Messages ${
        sidebarChatState === "closed" ? "h-100" : ""
      }d-flex flex-column justify-content-end align-items-end`}
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
