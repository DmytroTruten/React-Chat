import { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import SendMessageForm from "../SendMessageForm/SendMessageForm";

function ChatBox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const query = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(query, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);
  return (
    <div className="ChatBox">
      {messages?.map((message) => {
        // <Message key={message.id} message={message} />;
      })}
      <SendMessageForm />
    </div>
  );
}

export default ChatBox;
