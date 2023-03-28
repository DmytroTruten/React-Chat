import React from "react";
import Form from "react-bootstrap/Form";
import "../styles/Home/Home.css";

const Home = () => {
  return (
    <div className="Home row justify-content-center align-items-center h-100 mx-0 my-0">
      <div className="ChatContainer col-8 d-flex px-0">
        <div className="Sidebar d-flex flex-column">
          <div className="SidebarHeader d-flex pt-2 pe-2 pb-2">
            <div className="Settings d-flex flex-column justify-content-center align-items-center">
              <span className="mb-1"></span>
              <span></span>
              <span className="mt-1"></span>
            </div>
            <Form.Control
              className="SidebarSearchControl"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="Chat">Chat</div>
      </div>
    </div>
  );
};

export default Home;
