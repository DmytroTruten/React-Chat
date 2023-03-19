import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import sendIcon from "../../assets/send-icon.svg";

function SendMessage() {
  const [message, setMessage] = useState("");
  return (
    <form className="SendMessageForm">
      <input
        className="SendMessageInput"
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button className="SendMessageButton" type="button">
        <img src={sendIcon} alt="" />
      </button>
    </form>
  );
}

export default SendMessage;
