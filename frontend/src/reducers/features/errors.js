import { createSlice } from "@reduxjs/toolkit";

/**
 * A slice for errors that affect multiple components
 */

export const errorsSlice = createSlice({
  name: "errors",
  initialState: { value: [] },
  reducers: {
    /**
     * Add a new error to the error list
     * @param {number[]} state.value -previous errors
     * @param {number} action.payload.code -new error detected
     */
    addErrorList: (state, action) => {
      return [...state.value, action.payload];
    },
  },
});

export const { addErrorList } = errorsSlice.actions;
export default errorsSlice.reducer;
