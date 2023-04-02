import React from "react";
import Form from "react-bootstrap/Form";

const Search = (props) => {
  return (
    <div className="SidebarHeader d-flex">
      <div className="Settings d-flex flex-column justify-content-center align-items-center" onClick={props.handleToggleSidebarSettings}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Form.Control
        className="SidebarSearchControl"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
export default Search;
