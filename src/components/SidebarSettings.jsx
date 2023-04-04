import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SidebarSettings = ({ state }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storageRef = ref(storage, "images/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        });
        console.log("Image uploaded");
        window.location.reload()
      });
    });
  };

  return (
    <div className={`SidebarSettings ${state} d-flex flex-column`}>
      <form
        className="SidebarSettingsInnerContainer p-3"
        onSubmit={handleSubmit}
      >
        <Form.Control className="ImagePicker" type="file" id="file" />
        <label htmlFor="file">
          <div className="UserAvatarContainer mt-2">
            <img className="UserAvatar" src={currentUser.photoURL} alt="" />
          </div>
        </label>
        <p className="my-2">{currentUser.displayName}</p>
        <div className="d-flex flex-column">
          <Button type="submit" size="sm">
            Upload Image
          </Button>
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
