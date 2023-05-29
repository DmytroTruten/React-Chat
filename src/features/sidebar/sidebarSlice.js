import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    sidebarSettingsState: "closed",
    sidebarChatState: "closed",
    sidebarMenuState: "closed",
    kebabMenuState: "closed",
    darkModeSwitchState: "dark",
  },
  reducers: {
    setSidebarSettingsState: (state, action) => {
      state.sidebarSettingsState === "closed" ? "opened" : "closed";
    },
    setSidebarChatState: (state, action) => {
      state.sidebarChatState = "opened";
    },
    setSidebarMenuState: (state, action) => {
      state.sidebarMenuState === "closed" ? "opened" : "closed";
    },
    setKebabMenuState: (state, action) => {
      state.kebabMenuState === "closed" ? "opened" : "closed";
    },
    setDarkModeSwitchState: (state, action) => {
      state.darkModeSwitchState === "dark" ? "light" : "dark";
    },
  },
});

export const selectSidebarSettingsState = (state) =>
  state.sidebarSlice.sidebarSettingsState;

export const selectSidebarMenuState = (state) =>
  state.sidebarSlice.sidebarMenuState;

export const selectSidebarChatState = (state) =>
  state.sidebarSlice.sidebarChatState;

export const selectKebabMenuState = (state) =>
  state.sidebarSlice.kebabMenuState;

export const selectDarkModeSwitchState = (state) =>
  state.sidebarSlice.darkModeSwitchState;

export const {
  setSidebarSettingsState,
  setSidebarChatState,
  setSidebarMenuState,
  setKebabMenuState,
  setDarkModeSwitchState,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;

