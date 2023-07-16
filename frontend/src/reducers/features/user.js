import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "links",
  initialState: {
    userId: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser } = cardsSlice.actions;

export default cardsSlice.reducer;
