import React from 'react';
import Message from './Message';
import "../styles/Messages/Messages.css"

const Messages = () => {
  return (
    <div className="Messages d-flex flex-column ">
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

export default Messages;