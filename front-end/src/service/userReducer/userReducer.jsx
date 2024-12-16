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
    logoutAction: (state) => {
      state.userID = 0;
      state.tableID = 0;
      userLocal.delete();
      cartLocal.deleteAll();
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
        state.tableID = action.payload.tableID;
        state.roleID = action.payload.roleID;

        userLocal.setUserID(action.payload.userID);
        userLocal.setTableID(action.payload.tableID);
        userLocal.setRoleName(action.payload.roleID);
      })
      .addCase(registerTable.fulfilled, (state, action) => {
        userLocal.setCustomerID(action.payload);
        state.customerID = action.payload;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const { logoutAction, updateCart, updateCheckout } = userReducer.actions;

export default userReducer.reducer;
