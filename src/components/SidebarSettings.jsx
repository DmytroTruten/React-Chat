import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";
import { auth, storage } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../assets/react.svg";

const SidebarSettings = ({ state }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storageRef = ref(storage, 'images/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
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
          <div className="UserAvatarContainer my-2">
            <img src={logo} alt="" />
          </div>
        </label>
        <p>{currentUser.displayName}</p>
        <Button type="submit" size="sm">
          Upload
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
      </form>
    </div>
  );
};

export default SidebarSettings;
