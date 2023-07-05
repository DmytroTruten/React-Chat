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
import addPhotoIcon from "../assets/add-photo-icon.svg";
import "../styles/SidebarSettings/SidebarSettings.css";

const SidebarSettings = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [error, setError] = useState(false); // State for error handling
  const logoutButtonContainerRef = useRef(null); // Ref to the logout button container
  const { currentUser } = useContext(AuthContext); // Access the current user from the AuthContext
  const sidebarSettingsState = useSelector(selectSidebarSettingsState); // Retrieve sidebar settings state from Redux store
  const kebabMenuState = useSelector(selectKebabMenuState); // Retrieve kebab menu state from Redux store
  const storeDispatch = useDispatch(); // Dispatch actions to the Redux store

  // Event handler for selecting a file
  const handleInputFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storageRef = ref(storage, "images/" + file.name);
    const photoRef = doc(db, "users", currentUser.uid);

    try {
      // Upload the file to Firebase Storage
      uploadBytes(storageRef, file).then((snapshot) => {
        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          // Update the photoURL field in the user document in Firestore
          await updateDoc(photoRef, {
            photoURL: downloadURL,
          });
          // Update the user's profile in Firebase Auth
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          console.log("Image uploaded");
          window.location.reload(); // Reload the page
        });
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  // Effect hook to handle the animation of the logout button container
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
          onClick={() => {
            storeDispatch(setKebabMenuState());
          }}
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
              storeDispatch(setSidebarSettingsState());
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
          <div className="UserAvatarContainer">
            <label
              className="ChangeAvatarButton d-flex justify-content-center align-items-center"
              htmlFor="file"
            >
              <img className="ChangeAvatarIcon" src={addPhotoIcon} alt="" />
            </label>
            <img className="UserAvatar" src={currentUser.photoURL} alt="" />
          </div>
          <p className="SidebarSettingsDisplayName">
            {currentUser.displayName}
          </p>
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
