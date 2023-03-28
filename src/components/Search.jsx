import React from "react";
import Form from "react-bootstrap/Form";

const Search = () => {
  return (
    <div className="SidebarHeader d-flex pt-3 pe-3 pb-3">
      <div className="Settings d-flex flex-column justify-content-center align-items-center">
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
