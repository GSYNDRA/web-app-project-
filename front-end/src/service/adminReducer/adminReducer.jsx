import { createSlice } from "@reduxjs/toolkit";
import { getOnGoingTable } from "./adminThunk";
import { tableLocal } from "../tableLocal";

const initialState = {
  onGoingTable: [],
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOnGoingTable.fulfilled, (state, action) => {
      state.onGoingTable = [...action.payload];

      // add to local storage
      tableLocal.setOnGoingTable(action.payload);
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = adminReducer.actions;

export default adminReducer.reducer;
