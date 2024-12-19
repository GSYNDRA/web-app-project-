import { createSlice } from "@reduxjs/toolkit";
import { getMenuThunk, postLogin, registerTable } from "./userThunk";
import { userLocal } from "../userLocal";
import { cartLocal } from "../cartLocal";

const initialState = {
  menu: [],
  userID: userLocal.getUserId(),
  tableID: userLocal.getTableID(),
  roleID: 0,
  customerID: userLocal.getCustomerID(),
  cart: [],
  checkout: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    logoutAction: (state) => {
      // state.userID = 0;
      // state.tableID = 0;
      // userLocal.delete();
      // cartLocal.deleteAll();
    },
    updateCart: (state) => {
      state.cart = [...cartLocal.get()];
    },
    updateCheckout: (state) => {
      state.checkout = [...cartLocal.getCheckout()];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuThunk.fulfilled, (state, action) => {
        state.menu = action.payload;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.userID = action.payload.userID;
        state.tableID =
          action.payload.tableID !== null ? action.payload.tableID : 1;
        state.roleID = action.payload.roleID;

        if (
          action.payload.customerID !== null &&
          action.payload.customerID !== undefined
        ) {
          state.customerID = action.payload.customerID;
        }

        userLocal.setUserID(action.payload.userID);
        userLocal.setTableID(action.payload.tableID || 1);
        userLocal.setRoleName(action.payload.roleID);
      })
      .addCase(registerTable.fulfilled, (state, action) => {
        userLocal.setCustomerID(action.payload !== null ? action.payload : 1);
        state.customerID = action.payload !== null ? action.payload : 1;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const { logoutAction, updateCart, updateCheckout } = userReducer.actions;

export default userReducer.reducer;
