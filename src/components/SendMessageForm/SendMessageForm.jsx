import React, { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import sendIcon from "../../assets/send-icon.svg";
import "./SendMessageForm.css";
import { ref, uploadBytes } from "firebase/storage";

function SendMessageForm({ scroll }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

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

  const handleImageUpload = () => {
    if(image === null) return;

    const imageRef = ref(storage, `images/${image.name}`)
    uploadBytes(imageRef, image).then(() => {
      alert("Img uploaded")
    })
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
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <button type="button" onClick={handleImageUpload}>
        Upload
      </button>
      <button className="SendMessageButton" type="submit">
        <img src={sendIcon} alt="" />
      </button>
      {image ? image.name : null}
    </form>
  );
}

export default SendMessageForm;
