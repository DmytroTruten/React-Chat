import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import moment from "moment";
import settingsIcon from "../assets/settings-icon.svg";
import savedIcon from "../assets/saved-icon.svg";
import moonIcon from "../assets/moon-icon.svg";
import "../styles/SidebarChatList/SidebarChatList.css";
import {
  selectDarkModeSwitchState,
  selectSidebarMenuState,
  setDarkModeSwitchState,
  setSidebarChatState,
  setSidebarMenuState,
  setSidebarSettingsState,
} from "../features/sidebar/sidebarSlice.js";
import { v4 } from "uuid";

const SidebarChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const sidebarMenuRef = useRef(null);
  const sidebarChatListRef = useRef(null);
  const chatRefs = useRef([]);
  const sidebarMenuState = useSelector(selectSidebarMenuState);
  const darkModeSwitchState = useSelector(selectDarkModeSwitchState);
  const storeDispatch = useDispatch();

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

  useEffect(() => {
    if (sidebarMenuRef.current) {
      sidebarMenuRef.current.style.animation =
        "show-menu .2s ease-in-out forwards";
      if (sidebarMenuState === "closed") {
        sidebarMenuRef.current.style.animation =
          "hide-menu .2s ease-in-out forwards";
      }
    }
  }, [sidebarMenuState]);

  useEffect(() => {
    if (sidebarChatListRef.current) {
      const { scrollHeight, clientHeight } = sidebarChatListRef.current;
      if (scrollHeight > clientHeight) {
        sidebarChatListRef.current.style.padding = "0px 1px 0px 8px";
      } else {
        sidebarChatListRef.current.style.padding = "0px 8px 0px 8px";
      }
    }
  }, [sidebarChatListRef.current]);

  const handleSelect = (userInfo, index) => {
    storeDispatch(setSidebarChatState());
    dispatch({ type: "CHANGE_USER", payload: userInfo });
    setSelectedChatIndex(index);
  };

  const createSavedMessagesChat = async () => {
    const savedMessagesChatID = v4();
    const chatsDocSnap = await getDoc(doc(db, "chats", currentUser.uid));
    const combinedID =
      currentUser.uid > savedMessagesChatID
        ? currentUser.uid + savedMessagesChatID
        : savedMessagesChatID + currentUser.uid;
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [combinedID + ".userInfo"]: {
        uid: savedMessagesChatID,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/react-chat-84633.appspot.com/o/images%2Fsaved-icon.svg?alt=media&token=70145a71-2e21-45cd-9123-ec3eed28fedd",
        displayName: "Saved Messages",
      },
      [combinedID + ".date"]: Timestamp.now(),
    });
    if (!chatsDocSnap.exists()) {
      await setDoc(doc(db, "chats", combinedID), {
        messages: [],
      });
    }
  };

  return (
    <div className="SidebarChatList" ref={sidebarChatListRef}>
      <div className={`SidebarMenu ${sidebarMenuState}`} ref={sidebarMenuRef}>
        <div
          className="SidebarMenuOption d-flex align-items-center"
          onClick={() => {
            storeDispatch(setSidebarMenuState());
            createSavedMessagesChat();
          }}
        >
          <img className="SidebarMenuOptionIcon" src={savedIcon} alt="" />
          <p className="SidebarMenuOptionText">Saved Messages</p>
        </div>
        <div
          className="SidebarMenuOption d-flex align-items-center"
          onClick={() => {
            storeDispatch(setSidebarMenuState());
            storeDispatch(setSidebarSettingsState());
          }}
        >
          <img className="SidebarMenuOptionIcon" src={settingsIcon} alt="" />
          <p className="SidebarMenuOptionText">Settings</p>
        </div>
        <div
          className="SidebarMenuOption d-flex align-items-center justify-content-between"
          onClick={() => {
            storeDispatch(setDarkModeSwitchState());
          }}
        >
          <div className="d-flex align-items-center">
            <img className="SidebarMenuOptionIcon" src={moonIcon} alt="" />
            <p className="SidebarMenuOptionText">Dark Mode</p>
          </div>
          <div className="DarkModeSwitch d-flex align-items-center">
            <div
              className={`DarkModeSwitchToggle d-flex align-items-center ${darkModeSwitchState}`}
            ></div>
          </div>
        </div>
      </div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, index) => (
          <div
            className={`SidebarChat d-flex ${
              selectedChatIndex === index ? "selected" : ""
            }`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo, index)}
            ref={(el) => (chatRefs.current[index] = el)}
          >
            <div className="SidebarChatImgContainer d-flex justify-content-center align-items-center">
              <img
                className="UserAvatar"
                src={chat[1].userInfo?.photoURL}
                alt=""
              />
            </div>
            <div className="SidebarChatInfo d-flex flex-column w-100">
              <div className="SidebarChatUsernameContainer d-flex justify-content-between">
                <p className="SidebarChatUsername">
                  {chat[1].userInfo?.displayName}
                </p>
                <p className="SidebarChatTime">
                  {moment.unix(chat[1].date?.seconds).format("HH:mm")}
                </p>
                {console.log(chat[1])}
              </div>
              <div className="d-flex align-items-center">
                {chat[1].lastImageURL?.downloadURL && (
                  <img
                    className="SidebarChatLastImg me-1"
                    src={chat[1].lastImageURL?.downloadURL}
                    alt=""
                  />
                )}
                <p className="SidebarChatLastMsg">
                  {chat[1].lastMessage?.lastMessage.length > 30
                    ? chat[1].lastMessage?.lastMessage.slice(0, 30) + "..."
                    : chat[1].lastMessage?.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarChatList;
