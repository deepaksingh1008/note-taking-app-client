import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: [],
  isLoading: true,
  isError: false,
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    getNotes: (state, action) => {
      state.isLoading = false;
      state.note = action.payload;
      state.isError = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getNotes } = noteSlice.actions;

export default noteSlice.reducer;
