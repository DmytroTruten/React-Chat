import React from "react";
import SendMessage from "../SendMessage/SendMessage";
import "./ChatPage.css";

function ChatPage () {
  return(
    <div className="ChatPage">
        <SendMessage />
    </div>
  )
}

export default ChatPage;