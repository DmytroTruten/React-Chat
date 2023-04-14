import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import moment from "moment";
import "../styles/SidebarChatList/SidebarChatList.css";

const SidebarChatList = ({ handleSidebarState }) => {
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
    handleSidebarState("chat");
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
              <p className="SidebarChatTime">
                {moment.unix(chat[1]?.date?.seconds).format("HH:mm")}
              </p>
              {console.log(chat[1])}
            </div>
            <div className="d-flex align-items-center">
              <img
                className="SidebarChatLastImg me-1"
                src={chat[1].lastImageURL?.downloadURL}
                alt=""
              />
              <p className="SidebarChatLastMsg">
                {chat[1].lastMessage.lastMessage.length > 30
                  ? chat[1].lastMessage.lastMessage.slice(0, 30) + "..."
                  : chat[1].lastMessage.lastMessage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarChatList;
