import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { adminService } from "./adminService";

export const getOnGoingTable = createAsyncThunk(
  "adminThunk/getAllGoingTable",
  async () => {
    try {
      const data = await adminService.getOnGoingTable();

      return data.data.content;
    } catch (error) {
      message.error(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminThunk/getAllGoingTable",
  async (payload) => {
    try {
      const data = await adminService.updateOrderStatus({
        items: payload.items,
        adminId: payload.adminId,
      });

      return data.data.content;
    } catch (error) {
      message.error(error);
    }
  }
);

export const putEditMenuItem = createAsyncThunk(
  "adminThunk/putEditMenuItem",
  async (payload) => {
    try {
      const data = await adminService.updateMenuItem(payload);

      return data.data.content;
    } catch (error) {
      message.error(error);
    }
  }
);
