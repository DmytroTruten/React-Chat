import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LogIn/LogIn.css";

const LogIn = () => {
  return (
    <div className="LogInContainer row justify-content-center align-items-center h-100 mx-0 my-0">
      <Form className="LogInForm col-4 d-flex flex-column align-items-center py-5">
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
        </Form.Group>
        <Button className="my-3" type="submit">
          Sign in
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
