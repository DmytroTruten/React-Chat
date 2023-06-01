import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import { setSidebarMenuState } from "../features/sidebar/sidebarSlice";
import "../styles/Search/Search.css";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const storeDispatch = useDispatch();

  const handleKeyDown = (e) => {
    e.code == "Enter" && handleUserSearch();
  };

  const handleUserSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleUserChatSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedID));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedID), { message: [] });

        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "usersChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
      setUser(null);
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SidebarHeader d-flex flex-column">
      <div className="SearchInputContainer d-flex">
        <div
          className="SidebarMenuButton d-flex flex-column justify-content-center align-items-center"
          onClick={() => {
            storeDispatch(setSidebarMenuState());
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="d-flex flex-column w-100">
          <Form.Control
            className="SearchInput"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={username}
          />
          {error && <p>User not found...</p>}
        </div>
      </div>
      {user && (
        <div className="SidebarChat d-flex" onClick={handleUserChatSelect}>
          <div className="SidebarChatImgContainer d-flex justify-content-center align-items-center">
            <img className="UserAvatar" src={user.photoURL} alt="" />
          </div>
          <div className="SidebarChatInfo d-flex flex-column w-100">
            <div className="SidebarChatUsernameContainer d-flex justify-content-between">
              <p className="SidebarChatUsername">{user.displayName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
