import React, { useContext, useState } from "react";
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

const SidebarSettings = ({ sidebarSettingsState, handleSidebarState }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

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

  return (
    <div
      className={`SidebarSettings ${sidebarSettingsState} d-flex flex-column`}
    >
      <header className="SidebarSettingsHeader d-flex align-items-center">
        <Button
          className="SidebarSettingsHeaderButton d-flex justify-content-center align-items-center"
          onClick={() => handleSidebarState("settings")}
        >
          <img src={leftArrowIcon} alt="" />
        </Button>
        <p className="SettingsText w-100">Settings</p>
        <Button className="SidebarSettingsHeaderButton d-flex justify-content-center align-items-center">
          <img src={pencilIcon} alt="" />
        </Button>
        <Button className="SidebarSettingsHeaderButton d-flex justify-content-center align-items-center ms-2">
          <img src={kebabMenuIcon} alt="" />
        </Button>
      </header>
      <form className="SidebarSettingsInnerContainer" onSubmit={handleSubmit}>
        <Form.Control
          accept="image/*"
          className="ImagePicker"
          type="file"
          id="file"
          onChange={handleInputFile}
        />
        <div className="p-3">
          <label htmlFor="file">
            <div className="UserAvatarContainer mt-2">
              <img className="UserAvatar" src={currentUser.photoURL} alt="" />
            </div>
          </label>
          {error && <p className="ErrorMsg">Something went wrong...</p>}
          <p className="my-2">{currentUser.displayName}</p>
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
          <Button
            className="LogoutButton d-flex align-items-center"
            onClick={() => {
              signOut(auth);
            }}
          >
            <img className="LogoutIcon" src={logoutIcon} alt="" />
            <p>Logout</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SidebarSettings;
