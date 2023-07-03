import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarSettingsState: "closed",
    sidebarChatState: "closed",
    sidebarMenuState: "closed",
    kebabMenuState: "closed",
    darkModeSwitchState: "dark",
  },
  reducers: {
    setSidebarSettingsState: (state) => {
      state.sidebarSettingsState =
        state.sidebarSettingsState === "closed" ? "opened" : "closed";
    },
    setSidebarChatState: (state) => {
      if (state.sidebarChatState !== "opened") {
        state.sidebarChatState = "opened";
      }
    },
    setSidebarMenuState: (state) => {
      state.sidebarMenuState =
        state.sidebarMenuState === "closed" ? "opened" : "closed";
    },
    setKebabMenuState: (state) => {
      state.kebabMenuState =
        state.kebabMenuState === "closed" ? "opened" : "closed";
    },
    setDarkModeSwitchState: (state) => {
      state.darkModeSwitchState =
        state.darkModeSwitchState === "dark" ? "light" : "dark";
    },
  },
});

export const selectSidebarSettingsState = (state) =>
  state.sidebar.sidebarSettingsState;
export const selectSidebarMenuState = (state) => state.sidebar.sidebarMenuState;
export const selectSidebarChatState = (state) => state.sidebar.sidebarChatState;
export const selectKebabMenuState = (state) => state.sidebar.kebabMenuState;
export const selectDarkModeSwitchState = (state) =>
  state.sidebar.darkModeSwitchState;

export const {
  setSidebarSettingsState,
  setSidebarChatState,
  setSidebarMenuState,
  setKebabMenuState,
  setDarkModeSwitchState,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
