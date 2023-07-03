import React, { Fragment, useRef, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import "../styles/Message/Message.css";

const Message = ({ message }) => {
  // Accessing the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);
  
  // Creating a reference to the message container element
  const messageRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to the latest message when it changes
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Fragment>
      <div
        ref={messageRef}
        className={`${
          message.image
            ? `ImageContainer ${
                message.text ? "WithCaption" : "WithoutCaption"
              } flex-column`
            : "MessageContainer"
        } ${
          message.senderID === currentUser.uid
            ? "current align-self-end"
            : "other align-self-start"
        } d-flex`}
      >
        {message.image && (
          // Display the image if it exists in the message
          <img className="MessageImage" src={message.image} alt="" />
        )}
        <div className="MessageTextContainer d-flex justify-content-between">
          {message.text && <p className="Message">{message.text}</p>}

          <p className="MessageTime d-flex">
            {/* Display the formatted timestamp of the message */}
            {moment.unix(message.date.seconds).format("HH:mm")}
          </p>
        </div>
        {console.log(message)}
      </div>
    </Fragment>
  );
};

export default Message;
