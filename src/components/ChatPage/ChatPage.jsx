import React from "react";
import SendMessage from "../SendMessageForm/SendMessageForm";
import "./ChatPage.css";

function ChatPage () {
  return(
    <div className="ChatPage">
        <SendMessage />
    </div>
  )
}

export default ChatPage;