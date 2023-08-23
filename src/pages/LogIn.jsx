import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Image } from "react-bootstrap";
import reactIcon from "../assets/react-icon.svg";
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
      setError(true);
      console.log(error);
    }
  };
  return (
    <Container
      fluid
      className="LogInContainer d-flex justify-content-center align-items-center mx-0 px-0 h-100"
    >
      <Form
        className="LogInForm col-12 col-sm-6 d-flex flex-column align-items-center px-0"
        onSubmit={handleSubmit}
      >
        <Image className="ReactLogo" src={reactIcon} />
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
          Log In
        </Button>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center w-100">
          <p className="mb-0">You don't have an account?</p>
          <Link className="SignUpLink" to="/SignUp">
            Sign Up
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default LogIn;
