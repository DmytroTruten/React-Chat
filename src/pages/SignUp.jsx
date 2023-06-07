import React, { useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/SignUp/SignUp.css";
import { v4 } from "uuid";

const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const storageRef = ref(storage, "images/default-avatar.jpg");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "usersChats", response.user.uid), {});

      getDownloadURL(storageRef).then(async (downloadURL) => {
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName,
          email,
          password,
          photoURL: downloadURL,
        });

        await updateProfile(response.user, {
          displayName,
          photoURL: downloadURL,
        });
        const savedMessagesID = response.user.uid + v4();
        await setDoc(doc(db, "chats", savedMessagesID), {
          messages: [],
        });
        await setDoc(doc(db, "usersChats", savedMessagesID), {});

        await updateDoc(doc(db, "usersChats", response.user.uid), {
          [savedMessagesID + ".userInfo"]: {
            uid: savedMessagesID,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/react-chat-84633.appspot.com/o/images%2Fsaved-icon.svg?alt=media&token=70145a71-2e21-45cd-9123-ec3eed28fedd",
            displayName: "Saved Messages"
          },
          [savedMessagesID + ".date"]: Timestamp.now(),
        });
      });
      navigate("/React-Chat/Home");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="SignUpContainer row justify-content-center align-items-center h-100 mx-0 my-0">
      <Form
        className="SignUpForm col-12 col-sm-6 d-flex flex-column align-items-center px-0"
        onSubmit={handleSubmit}
      >
        <h1 className="SignUpHeader">React Chat</h1>
        <h5 className="SignUpSubheader">Sign Up</h5>
        <Form.Group>
          <Form.Control
            className="SignUpDisplayNameControl my-3"
            type="text"
            placeholder="Display Name"
          ></Form.Control>
          <Form.Control
            className="SignUpEmailControl my-3"
            type="email"
            placeholder="Email"
          ></Form.Control>
          <Form.Control
            className="SignUpPasswordControl my-3"
            type="password"
            placeholder="Password"
          ></Form.Control>
        </Form.Group>
        {error && <p className="ErrorMsg">Something went wrong...</p>}
        <Button className="my-3" type="submit">
          Sign up
        </Button>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center w-100">
          <p className="mb-0">You already have an account? </p>
          <Link className="LogInLink" to="/React-Chat">
            Log in
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
