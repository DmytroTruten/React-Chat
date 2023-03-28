import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Home/Home.css";

const Home = () => {
  return (
    <div className="Home row justify-content-center align-items-center h-100 mx-0 my-0">
      <div className="ChatContainer col-8 d-flex px-0">
        <Sidebar />
        <div className="Chat">
        <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
