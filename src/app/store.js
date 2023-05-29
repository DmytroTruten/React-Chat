import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../features/sidebar/sidebarSlice.js"

export const store = configureStore({
  reducer: {
    sidebarSlice: sidebarSlice,
  },
});
