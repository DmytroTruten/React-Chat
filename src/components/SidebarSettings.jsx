import React, { useContext, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSidebarSettingsState,
  selectSidebarSettingsState,
  selectKebabMenuState,
  setKebabMenuState,
} from "../features/sidebar/sidebarSlice.js";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoutIcon from "../assets/logout-icon.svg";
import uploadIcon from "../assets/upload-icon.svg";
import leftArrowIcon from "../assets/left-arrow-icon.svg";
import pencilIcon from "../assets/pencil-icon.svg";
import kebabMenuIcon from "../assets/kebab-menu-icon.svg";

const SidebarSettings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const logoutButtonContainerRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const sidebarSettingsState = useSelector(selectSidebarSettingsState);
  const kebabMenuState = useSelector(selectKebabMenuState);
  const storeDispatch = useDispatch();

  const handleInputFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storageRef = ref(storage, "images/" + file.name);
    const photoRef = doc(db, "users", currentUser.uid);

    try {
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await updateDoc(photoRef, {
            photoURL: downloadURL,
          });
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          console.log("Image uploaded");
          window.location.reload();
        });
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (logoutButtonContainerRef.current) {
      logoutButtonContainerRef.current.style.animation =
        "show-menu .2s ease-in-out forwards";
      if (kebabMenuState === "closed") {
        logoutButtonContainerRef.current.style.animation =
          "hide-menu .2s ease-in-out forwards";
      }
    }
  }, [kebabMenuState]);

  return (
    <div
      className={`SidebarSettings ${sidebarSettingsState} d-flex flex-column`}
    >
      <header className="SidebarSettingsHeader d-flex align-items-center">
        <Button
          className="SidebarSettingsHeaderButton d-flex justify-content-center align-items-center"
          onClick={() => storeDispatch(setSidebarSettingsState())}
        >
          <img src={leftArrowIcon} alt="" />
        </Button>
        <p className="SettingsText w-100">Settings</p>
        <Button className="SidebarSettingsHeaderButton d-flex justify-content-center align-items-center">
          <img src={pencilIcon} alt="" />
        </Button>
        <Button
          className="SidebarSettingsHeaderButton  d-flex justify-content-center align-items-center ms-2"
          onClick={() => {storeDispatch(setKebabMenuState())}}
        >
          <img src={kebabMenuIcon} alt="" />
        </Button>
        <div
          className={`LogoutButtonContainer ${kebabMenuState} d-flex`}
          ref={logoutButtonContainerRef}
        >
          <Button
            className="LogoutButton d-flex align-items-center"
            onClick={() => {
              signOut(auth);
            }}
          >
            <img className="LogoutIcon" src={logoutIcon} alt="" />
            <p>Log Out</p>
          </Button>
        </div>
      </header>
      <form className="SidebarSettingsInnerContainer" onSubmit={handleSubmit}>
        <Form.Control
          accept="image/*"
          className="ImagePicker"
          type="file"
          id="file"
          onChange={handleInputFile}
        />
        <div className="SidebarSettingsUserInfo">
          <label className="w-100" htmlFor="file">
            <div className="UserAvatarContainer">
              <img className="UserAvatar" src={currentUser.photoURL} alt="" />
            </div>
            <p className="SidebarSettingsDisplayName">
              {currentUser.displayName}
            </p>
          </label>
          {error && <p className="ErrorMsg">Something went wrong...</p>}
        </div>
        <div className="d-flex flex-column">
          {selectedFile && (
            <Button
              className="UploadImageButton d-flex align-items-center"
              type="submit"
            >
              <img className="UploadIcon" src={uploadIcon} alt="" />
              <p>Upload image</p>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SidebarSettings;
