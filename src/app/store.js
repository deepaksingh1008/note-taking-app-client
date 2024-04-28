import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../features/notes/noteSlice";
import userSlice from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    notes: noteSlice,
    user: userSlice,
  },
});
