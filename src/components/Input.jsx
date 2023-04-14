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
import { useRef } from "react";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const inputRef = useRef(null);

  const handleSend = async () => {
    inputRef.current.value = "";

    const storageRef = ref(storage, "chatsImages/" + v4());
    if (image) {
      uploadBytes(storageRef, image).then((snapshot) => {
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
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "usersChats", currentUser.uid), {
            [data.chatID + ".lastImageURL"]: {
              downloadURL,
            },
          });
        });
      });
    } else {
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [data.chatID + ".lastImageURL"]: {
          downloadURL: null,
        },
      });
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    const lastMessage = text === "" ? "Image" : text;

    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        lastMessage,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        lastMessage,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="InputContainer d-flex justify-content-center align-items-center">
      <div className="InputButtonsContainer AttachContainer d-flex justify-content-center align-items-center">
        <label className="AttachButton d-flex justify-content-center align-items-center">
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
        ref={inputRef}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={handleKeyDown}
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
