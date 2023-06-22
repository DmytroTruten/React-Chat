import React, { useState, useContext, useRef } from "react";
import Form from "react-bootstrap/Form";
import "../styles/Input/Input.css";
import attachIcon from "../assets/attach-icon.svg";
import sendIcon from "../assets/send-icon.svg";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const inputRef = useRef(null);

  const sendImage = async (storageRef, lastMessage) => {
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
          [data.chatID + ".lastMessage"]: {
            lastMessage,
          },
        });
        await updateDoc(doc(db, "usersChats", data.user.uid), {
          [data.chatID + ".lastImageURL"]: {
            downloadURL,
          },
          [data.chatID + ".lastMessage"]: {
            lastMessage,
          },
        });
      });
    });
  };

  const sendText = async (lastMessage) => {
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatID + ".lastImageURL"]: {
        downloadURL: null,
      },
      [data.chatID + ".lastMessage"]: {
        lastMessage,
      },
      [data.chatID + ".date"]: Timestamp.now(),
    });
    if (!data.user.displayName === "Saved Messages") {
      await updateDoc(doc(db, "usersChats", data.user.uid), {
        [data.chatID + ".lastImageURL"]: {
          downloadURL: null,
        },
        [data.chatID + ".lastMessage"]: {
          lastMessage,
        },
        [data.chatID + ".date"]: Timestamp.now(),
      });
    }

    await updateDoc(doc(db, "chats", data.chatID), {
      messages: arrayUnion({
        id: v4(),
        text,
        senderID: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  };

  const handleSend = () => {
    inputRef.current.value = "";
    const storageRef = ref(storage, "chatsImages/" + v4());
    const lastMessage = text === "" ? "Image" : text;

    if (image) {
      sendImage(storageRef, lastMessage);
    } else {
      sendText(lastMessage);
    }

    setText("");
    setImage(null);
  };

  const handleKeyDown = (e) => {
    if (!image && text === "") {
      return;
    }
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="InputContainer d-flex justify-content-center align-items-center">
      <div className="InputElementsWrapper d-flex justify-content-center align-items-center">
        <Form.Control
          className="Input"
          type="text"
          placeholder="Message"
          ref={inputRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
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
      </div>
      <div className="InputButtonsContainer SendContainer d-flex justify-content-center align-items-center">
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
