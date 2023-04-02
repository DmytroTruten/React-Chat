import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LogIn/LogIn.css";

const LogIn = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <div className="LogInContainer row justify-content-center align-items-center h-100 mx-0 my-0">
      <Form
        className="LogInForm col-4 d-flex flex-column align-items-center py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="LogInHeader">React Chat</h1>
        <h5 className="LogInSubheader">Log In</h5>
        <Form.Group>
          <Form.Control
            className="LogInControl my-3"
            type="text"
            placeholder="Login"
          ></Form.Control>
          <Form.Control
            className="LogInPasswordControl my-3"
            type="password"
            placeholder="Password"
          ></Form.Control>
          {error && <p className="ErrorMsg">Something went wrong...</p>}
        </Form.Group>
        <Button className="my-3" type="submit">
          Sign In
        </Button>
        <div className="d-flex justify-content-center w-100">
          <p className="mb-0 me-2">You don't have an account? </p>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      </Form>
    </div>
  );
};

export default LogIn;
