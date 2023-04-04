import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    try {
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
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
      <form
        className="SidebarSettingsInnerContainer p-3"
        onSubmit={handleSubmit}
      >
        <Form.Control
          className="ImagePicker"
          type="file"
          id="file"
          onChange={handleInputFile}
        />
        <label htmlFor="file">
          <div className="UserAvatarContainer mt-2">
            <img className="UserAvatar" src={currentUser.photoURL} alt="" />
          </div>
        </label>
        {error && (<p className="ErrorMsg">Something went wrong...</p>)}
        <p className="my-2">{currentUser.displayName}</p>
        <div className="d-flex flex-column">
          {selectedFile && (
            <Button type="submit" size="sm">
              Upload Image
            </Button>
          )}
          <Button
            className="LogoutButton my-2"
            size="sm"
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SidebarSettings;
