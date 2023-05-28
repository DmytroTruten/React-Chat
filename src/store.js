import { createStore } from "redux";

const initialState = {
  sidebarSettingState: "closed",
  sidebarChatState: "closed",
  sidebarMenuState: "closed",
  kebabMenuState: "closed",
};

export const setSidebarSettingState = () => {
  return {
    type: "sidebarSettingState/setSidebarSettingState",
  };
};

export const setSidebarChatState = () => {
  return {
    type: "sidebarChatState/setSidebarChatState",
  };
};

export const setSidebarMenuState = () => {
  return {
    type: "sidebarMenuState/setSidebarMenuState",
  };
};

export const setkebabMenuState = () => {
  return {
    type: "kebabMenuState/setkebabMenuState",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "sidebarSettingState/setSidebarSettingState":
      return {
        ...state,
        sidebarSettingState:
          state.sidebarSettingState === "closed" ? "opened" : "closed",
      };
    case "sidebarChatState/setSidebarChatState":
      return {
        ...state,
        sidebarChatState:
          state.sidebarChatState === "closed" ? "opened" : "closed",
      };
    case "sidebarMenuState/setSidebarMenuState":
      return {
        ...state,
        sidebarMenuState:
          state.sidebarMenuState === "closed" ? "opened" : "closed",
      };
    case "kebabMenuState/setkebabMenuState":
      return {
        ...state,
        kebabMenuState: state.kebabMenuState === "closed" ? "opened" : "closed",
      };
    default:
      return state;
  }
};

export const selectSidebarSettingState = (state) => state.sidebarSettingState;
export const selectSidebarChatState = (state) => state.sidebarChatState;
export const selectSidebarMenuState = (state) => state.sidebarMenuState;
export const selectkebabMenuState = (state) => state.kebabMenuState;

export const store = createStore(reducer);
