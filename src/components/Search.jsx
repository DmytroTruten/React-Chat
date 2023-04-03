import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Form from "react-bootstrap/Form";

const Search = (props) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleKeyDown = (e) => {
    e.code == "Enter" && handleUserSearch();
  };

  const handleUserSearch = async () => {
    console.log("enter");
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
      setError(error);
    }
  };

  return (
    <div className="SidebarHeader d-flex">
      <div
        className="Settings d-flex flex-column justify-content-center align-items-center"
        onClick={props.handleToggleSidebarSettings}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Form.Control
        className="SidebarSearchControl"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {error && <p>User not found...</p>}
      {user && <p>{user.displayName}</p>}
    </div>
  );
};
export default Search;
