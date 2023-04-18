import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoutIcon from "../assets/logout-icon.svg";

const SidebarSettings = ({ state }) => {
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
    <div className={`SidebarSettings ${state} d-flex flex-column`}>
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
            <Button type="submit" size="sm">
              Upload Image
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
