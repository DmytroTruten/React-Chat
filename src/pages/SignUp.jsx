import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/SignUp/SignUp.css";

const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName,
        email,
        password,
      });
      navigate("/Home");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="SignUpContainer row justify-content-center align-items-center h-100 mx-0 my-0">
      <Form
        className="SignUpForm col-4 d-flex flex-column align-items-center py-5"
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
        <div className="d-flex justify-content-center w-100">
          <p className="mb-0 me-2">You already have an account? </p>
          <Link to="/">Log in</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
