import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";
import { message } from "antd";

export const postLogin = createAsyncThunk(
  "userReducer/loginThunk",
  async (payload) => {
    try {
      const data = await userService.postLogin(payload);

      return data.data.content;
    } catch (error) {
      message.success(error);
    }
  }
);

export const getMenuThunk = createAsyncThunk(
  "userReducer/getMenu",
  async () => {
    try {
      const data = await userService.showMenu();
      return data.data.content;
    } catch (error) {
      message.success(error);
    }
  }
);

export const registerTable = createAsyncThunk(
  "userReducer/registerTable",
  async (payload) => {
    try {
      const data = await userService.registerTable(
        payload.tableID,
        payload.customer
      );
      return data.data.content.customerID;
    } catch (error) {
      message.success(error);
    }
  }
);

export const chooseListItem = createAsyncThunk(
  "userReducer/chooseListItem",
  async (payload) => {
    const items = {
      items: payload.items,
    };
    try {
      const data = await userService.postchooseListItem(
        items,
        payload.customerID
      );
      return data.data.content;
    } catch (error) {
      message.success(error);
    }
  }
);
