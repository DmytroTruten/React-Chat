import React from "react";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./ChatPage.css";
import Message from "../Message/Message";

function ChatPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);
  return (
    <div className="ChatPage">
      {messages?.map((message) => {
        <Message key={message.id} message={message} />;
      })}
      <SendMessageForm />
    </div>
  );
}

export default ChatPage;
