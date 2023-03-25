import React, { useState } from "react";
import { auth, db} from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import sendIcon from "../../assets/send-icon.svg";
import attachIcon from "../../assets/attach-icon.svg";
import "./SendMessageForm.css";

function SendMessageForm({ scroll, setImage }) {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter non-empty message...");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      className="SendMessageForm"
      onSubmit={(e) => {
        sendMessage(e);
      }}
    >
      <input
        className="SendMessageInput"
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <label htmlFor="FileUpload">
        <img src={attachIcon} alt="" />
      </label>
      <input
        type="file"
        id="FileUpload"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />

      <button className="SendMessageButton" type="submit">
        <img src={sendIcon} alt="" />
      </button>
    </form>
  );
}

export default SendMessageForm;
