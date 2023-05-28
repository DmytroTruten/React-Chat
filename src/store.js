import { createStore } from "redux";

const initialState = {
  sidebarSettingsState: "closed",
  sidebarChatState: "closed",
  sidebarMenuState: "closed",
  kebabMenuState: "closed",
  darkModeSwitchState: "dark",
};

export const setSidebarSettingsState = () => {
  return {
    type: "sidebarSettingsState/setSidebarSettingsState",
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

export const setKebabMenuState = () => {
  return {
    type: "kebabMenuState/setkebabMenuState",
  };
};

export const setDarkModeSwitchState = () => {
  return {
    type: "darkModeSwitchState/setDarkModeSwitchState",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "sidebarSettingsState/setSidebarSettingsState":
      return {
        ...state,
        sidebarSettingsState:
          state.sidebarSettingsState === "closed" ? "opened" : "closed",
      };
    case "sidebarChatState/setSidebarChatState":
      return {
        ...state,
        sidebarChatState: "opened",
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
    case "darkModeSwitchState/setDarkModeSwitchState":
      return {
        ...state,
        darkModeSwitchState:
          state.darkModeSwitchState === "dark" ? "light" : "dark",
      };
    default:
      return state;
  }
};

export const selectSidebarSettingsState = (state) => state.sidebarSettingsState;
export const selectSidebarChatState = (state) => state.sidebarChatState;
export const selectSidebarMenuState = (state) => state.sidebarMenuState;
export const selectKebabMenuState = (state) => state.kebabMenuState;
export const selectDarkModeSwitchState = state => state.darkModeSwitchState;

export const store = createStore(reducer);
