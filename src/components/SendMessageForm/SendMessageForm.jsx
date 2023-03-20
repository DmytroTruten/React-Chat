import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import sendIcon from "../../assets/send-icon.svg";
import "./SendMessageForm.css"

function SendMessageForm() {
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
      <button className="SendMessageButton" type="submit">
        <img src={sendIcon} alt="" />
      </button>
    </form>
  );
}

export default SendMessageForm;
