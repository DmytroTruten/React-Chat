import React, { useContext, useState } from "react";
import Message from "./Message";
import "../styles/Messages/Messages.css";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Messages = () => {
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
    <div className="Messages d-flex flex-column align-items-end">
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
