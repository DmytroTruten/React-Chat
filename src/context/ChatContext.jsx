import { createContext, useReducer } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

// ChatContextProvider component
export const ChatContextProvider = ({ children }) => {
  // Access the currentUser from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Initial state for the chat context
  const INITIAL_STATE = {
    chatID: "null",
    user: {},
  };

  // Reducer function to handle chat state updates
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        // Update the user and chatID based on the action payload
        return {
          user: action.payload,
          chatID:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  // UseReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    // Provide the chat context value to the components
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
