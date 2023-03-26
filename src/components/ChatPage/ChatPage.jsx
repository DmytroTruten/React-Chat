import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";
import Message from "../Message/Message";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import Modal from "../Modal/Modal";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [image, setImage] = useState(null);
  const scroll = useRef();
  const imageListRef = ref(storage, "/images");

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

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            setImageList((prev) => [...prev, url]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }, []);

  const handleImageUpload = () => {
    if (image === null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
      setImage(null);
    });
  };

  return (
    <div className="ChatPage">
      {messages?.map((message) => (
        <Message key={message.id} message={message} imageList={imageList} />
      ))}
      <span ref={scroll}></span>
      <SendMessageForm scroll={scroll} setImage={setImage} />
      <Modal
        image={image}
        onImageUpload={handleImageUpload}
        onImageCancel={() => {
          setImage(null);
        }}
        visibility={image === null ? "hidden" : ""}
      />
    </div>
  );
};
export default ChatPage;
