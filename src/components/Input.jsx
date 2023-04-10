import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import "../styles/Input/Input.css";
import attachIcon from "../assets/attach-icon.svg";
import sendIcon from "../assets/send-icon.svg";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, v4());
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
              id: v4(),
              text,
              senderID: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="InputContainer d-flex justify-content-center align-items-center">
      <div className="InputButtonsContainer d-flex justify-content-center align-items-center">
        <label
          className="AttachButton d-flex justify-content-center align-items-center"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        >
          <Form.Control
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />
          <img className="AttachIcon" src={attachIcon} alt="attach" />
        </label>
      </div>
      <Form.Control
        className="Input ps-1"
        type="text"
        placeholder="Write a message..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="InputButtonsContainer d-flex justify-content-center align-items-center">
        <div
          className="SendButton d-flex justify-content-center align-items-center"
          onClick={handleSend}
        >
          <img className="SendIcon" src={sendIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Input;
