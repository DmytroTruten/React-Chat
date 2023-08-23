import React, { useState, useEffect, useContext, useRef } from "react";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { v4 } from "uuid";
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

const SidebarChatList = () => {
  const [chats, setChats] = useState([]); // State to store the chat data
  const [savedMessagesChatID, setSavedMessagesChatID] = useState(""); // State to store the ID of the saved messages chat
  const [selectedChatIndex, setSelectedChatIndex] = useState(null); // State to store the index of the selected chat
  const { currentUser } = useContext(AuthContext); // Accessing current user from AuthContext
  const { dispatch } = useContext(ChatContext); // Accessing dispatch function from ChatContext
  const sidebarMenuRef = useRef(null); // Ref for the sidebar menu container
  const sidebarChatListRef = useRef(null); // Ref for the sidebar chat list container
  const chatRefs = useRef([]); // Ref for individual chat containers
  const sidebarMenuState = useSelector(selectSidebarMenuState); // Selecting sidebar menu state from Redux store
  const darkModeSwitchState = useSelector(selectDarkModeSwitchState); // Selecting dark mode switch state from Redux store
  const storeDispatch = useDispatch(); // Dispatch function from Redux store

  useEffect(() => {
    const getChats = () => {
      // Function to fetch chat data from the database
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser.uid),
        (doc) => {
          setChats(doc.data()); // Update the chat data in state
        }
      );
      return () => {
        unsub();
      };
    };

    // Fetch chat data only if the current user ID is available
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    // Animate the sidebar menu based on the sidebar menu state
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
    // Adjust the padding of the sidebar chat list based on its content height
    if (sidebarChatListRef.current) {
      const { scrollHeight, clientHeight } = sidebarChatListRef.current;
      if (scrollHeight > clientHeight) {
        sidebarChatListRef.current.style.padding = "0px 1px 0px 8px";
      } else {
        sidebarChatListRef.current.style.padding = "0px 8px 0px 8px";
      }
    }
  }, [sidebarChatListRef.current]);

  const handleSelect = async (userInfo, index) => {
    // Handle the selection of a chat
    storeDispatch(setSidebarChatState()); // Update the sidebar chat state in Redux store
    dispatch({ type: "CHANGE_USER", payload: userInfo }); // Dispatch the selected user information to ChatContext
    setSelectedChatIndex(index); // Update the selected chat index state
    await new Promise((resolve) => setTimeout(resolve, 200));
    document
      .querySelector(".MessagesContainer")
      .scrollIntoView({ block: "end", behavior: "smooth" });
  };

  const createSavedMessagesChat = async () => {
    // Create a chat for saved messages if it doesn't exist
    if (savedMessagesChatID === "") {
      const newChatID = v4(); // Generate a unique chat ID using UUID
      setSavedMessagesChatID(newChatID); // Update the saved messages chat ID state
      await createChat(newChatID); // Create the chat in the database
    }
  };

  const createChat = async (chatID) => {
    // Create a new chat in the database
    const chatsDocSnap = await getDoc(doc(db, "chats", currentUser.uid));
    const savedMessagesDocSnap = await getDoc(
      doc(db, "usersChats", currentUser.uid)
    );
    const combinedID =
      currentUser.uid > chatID
        ? currentUser.uid + chatID
        : chatID + currentUser.uid;

    // Check if the saved messages chat doesn't exist and create it
    if (Object.entries(savedMessagesDocSnap.data()).length === 0) {
      console.log(`savedMessagesChatID: ${chatID}`);
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [combinedID + ".userInfo"]: {
          uid: chatID,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/react-chat-84633.appspot.com/o/images%2Fwhite-bookmark-icon.svg?alt=media&token=4bed4cd2-4413-4d6f-8e7a-8ec702034bac",
          displayName: "Saved Messages",
        },
      });
    }

    // Check if the chat doesn't exist in the chats collection and create it
    if (!chatsDocSnap.exists()) {
      await setDoc(doc(db, "chats", combinedID), {
        messages: [],
      });
    }
  };

  return (
    <div className="SidebarChatList" ref={sidebarChatListRef}>
      <div className={`SidebarMenu ${sidebarMenuState}`} ref={sidebarMenuRef}>
        {/* Option to access saved messages */}
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
        {/* Option to access settings */}
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
        {/* Option to toggle dark mode */}
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
      {/* Display the list of chats */}
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
            <div
              className={`SidebarChatImgContainer ${
                chat[1].userInfo?.displayName === "Saved Messages"
                  ? "SavedMessagesImgContainer"
                  : ""
              } d-flex justify-content-center align-items-center`}
            >
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
                  {chat[1].date?.seconds &&
                    moment.unix(chat[1].date?.seconds).format("HH:mm")}
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
