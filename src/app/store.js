import { configureStore } from "@reduxjs/toolkit";
import sidebar from "../features/sidebar/sidebarSlice.js"

export const store = configureStore({
  reducer: {
    sidebar: sidebar,
  },
});
