import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import "../styles/SidebarChatList/SidebarChatList.css";

const SidebarChatList = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };
  return (
    <div className="SidebarChatList">
      {Object.entries(chats)?.map((chat) => (
        <div
          className="SidebarChat d-flex"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <div className="SidebarChatImgContainer d-flex justify-content-center align-items-center">
            <img
              className="UserAvatar"
              src={chat[1].userInfo.photoURL}
              alt=""
            />
          </div>
          <div className="SidebarChatInfo d-flex flex-column w-100">
            <div className="SidebarChatUsernameContainer d-flex justify-content-between">
              <p className="SidebarChatUsername">
                {chat[1].userInfo.displayName}
              </p>
              <p className="SidebarChatTime">12:34</p>
            </div>
            <p className="SidebarChatLastMsg">
              {chat[1].userInfo.lastMessage?.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarChatList;
