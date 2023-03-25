import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import Message from "../Message/Message";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import Modal from "../Modal/Modal";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const scroll = useRef();

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

  const handleImageUpload = () => {
    if (image === null) return;

    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      setImage(null);
    });
  };

  return (
    <div className="ChatPage">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <span ref={scroll}></span>
      <SendMessageForm scroll={scroll} setImage={setImage} />
      {image === null && <Modal image={image} visibility={"hidden"} />}
      {image !== null && <Modal image={image} visibility={""} />}
    </div>
  );
};
export default ChatPage;
