import React from 'react';
import Form from "react-bootstrap/Form";
import "../styles/Input/Input.css"
import attachIcon from "../assets/attach-icon.svg";

const Input = () => {
  return (
    <div className='InputContainer d-flex justify-content-center align-items-center'>
      <div className='AttachButton d-flex justify-content-center align-items-center'>
        <img className='AttachIcon' src={attachIcon} alt="attach" />
      </div>
      <Form.Control className='Input ps-1' type='text' placeholder='Write a message...' />
    </div>
  )
}

export default Input;